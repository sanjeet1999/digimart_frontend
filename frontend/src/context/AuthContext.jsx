import React, { createContext, useContext, useState, useEffect } from 'react';
import apiService from '../services/api';
import { toast } from 'react-toastify';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user is already logged in on app load
  useEffect(() => {
    const savedUser = localStorage.getItem('digimart_user');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error parsing saved user data:', error);
        localStorage.removeItem('digimart_user');
      }
    }
  }, []);

  const login = async (credentials) => {
    setLoading(true);
    try {
      // Map frontend fields to backend format
      const loginData = {
        loginEMail: credentials.email,
        Password: credentials.password
      };
      
      const result = await apiService.login(loginData);
      
      if (result.success) {
        console.log('Full API Response:', result);
        console.log('result.data:', result.data);
        console.log('result.data.data:', result.data.data);
        console.log('result.data.data.user:', result.data.data?.user);
        
        // The API service wraps the backend response, so we need to access result.data.data.user
        const userData = result.data.data?.user || result.data.user || result.data;
        console.log('Extracted user data:', userData);
        console.log('User Role from API:', userData?.UserRole);
        
        setUser(userData);
        setIsAuthenticated(true);
        localStorage.setItem('digimart_user', JSON.stringify(userData));
        toast.success('Login successful!');
        return { success: true, user: userData };
      } else {
        toast.error(result.error || 'Login failed');
        return { success: false, error: result.error };
      }
    } catch (error) {
      toast.error('An unexpected error occurred during login');
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const signup = async (userData) => {
    setLoading(true);
    try {
      // Map frontend fields to backend format
      const signupData = {
        UserName: `${userData.firstName} ${userData.lastName}`,
        UserEmail: userData.email,
        UserPassword: userData.password,
        UserRole: userData.userType === 'seller' ? 'Seller' : 'Buyer'
      };
      
      const result = await apiService.signup(signupData);
      
      if (result.success) {
        // Auto-login after successful signup
        const loginResult = await login({
          email: userData.email,
          password: userData.password
        });
        
        if (loginResult.success) {
          toast.success('Account created successfully!');
          return { success: true, user: loginResult.user };
        } else {
          toast.success('Account created! Please login.');
          return { success: true, user: null };
        }
      } else {
        toast.error(result.error || 'Signup failed');
        return { success: false, error: result.error };
      }
    } catch (error) {
      toast.error('An unexpected error occurred during signup');
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await apiService.logout();
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem('digimart_user');
      toast.success('Logged out successfully');
    } catch (error) {
      console.error('Logout error:', error);
      // Still clear local state even if API call fails
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem('digimart_user');
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (updateData) => {
    setLoading(true);
    try {
      // Map frontend fields to backend format
      const updatePayload = {};
      if (updateData.name) updatePayload.UserName = updateData.name;
      if (updateData.email) updatePayload.UserEmail = updateData.email;
      
      const result = await apiService.updateUser(updatePayload);
      
      if (result.success) {
        const updatedUser = result.data.data?.user || result.data.user || result.data;
        setUser(updatedUser);
        localStorage.setItem('digimart_user', JSON.stringify(updatedUser));
        toast.success('Profile updated successfully!');
        return { success: true, user: updatedUser };
      } else {
        toast.error(result.error || 'Update failed');
        return { success: false, error: result.error };
      }
    } catch (error) {
      toast.error('An unexpected error occurred during update');
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    signup,
    logout,
    updateUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 