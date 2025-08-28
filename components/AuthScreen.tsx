import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuthStore } from '@/stores/authStore';
import { GraduationCap, Mail, User, Phone, Hash, Eye, EyeOff, Shield, Building } from 'lucide-react-native';

export default function AuthScreen() {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState<'faculty' | 'student'>('student');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    department: '',
    studentId: '',
    facultyId: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { login, signup } = useAuthStore();

  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (isLogin) {
        if (!formData.email || !formData.password) {
          Alert.alert('Error', 'Please fill in all fields');
          return;
        }
        await login(formData.email, formData.password);
      } else {
        // Signup validation
        if (!formData.name || !formData.email || !formData.password || !formData.department) {
          Alert.alert('Error', 'Please fill in all required fields');
          return;
        }
        
        if (formData.password !== formData.confirmPassword) {
          Alert.alert('Error', 'Passwords do not match');
          return;
        }
        
        if (formData.password.length < 6) {
          Alert.alert('Error', 'Password must be at least 6 characters');
          return;
        }

        const userData = {
          name: formData.name,
          email: formData.email,
          role,
          department: formData.department,
          phone: formData.phone || undefined,
          studentId: role === 'student' ? formData.studentId || undefined : undefined,
          facultyId: role === 'faculty' ? formData.facultyId || undefined : undefined,
        };

        await signup(userData);
        Alert.alert('Success', 'Account created successfully!');
      }
    } catch (error: any) {
      Alert.alert(isLogin ? 'Login Failed' : 'Signup Failed', error.message);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      phone: '',
      department: '',
      studentId: '',
      facultyId: '',
    });
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    resetForm();
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardContainer}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <LinearGradient
              colors={['#667eea', '#764ba2']}
              style={styles.logoContainer}
            >
              <GraduationCap size={48} color="white" />
            </LinearGradient>
            <Text style={styles.appName}>GOLEA</Text>
            <Text style={styles.appTagline}>Smart Learning Management System</Text>
          </View>

          {/* Auth Mode Toggle */}
          <View style={styles.modeSection}>
            <View style={styles.modeButtons}>
              <TouchableOpacity
                style={[styles.modeButton, isLogin && styles.modeButtonActive]}
                onPress={() => setIsLogin(true)}
              >
                <Text style={[styles.modeButtonText, isLogin && styles.modeButtonTextActive]}>
                  Login
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modeButton, !isLogin && styles.modeButtonActive]}
                onPress={() => setIsLogin(false)}
              >
                <Text style={[styles.modeButtonText, !isLogin && styles.modeButtonTextActive]}>
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Role Selection */}
          <View style={styles.roleSection}>
            <Text style={styles.sectionTitle}>Select Your Role</Text>
            <View style={styles.roleButtons}>
              <TouchableOpacity
                style={[styles.roleButton, role === 'student' && styles.roleButtonActive]}
                onPress={() => setRole('student')}
              >
                <LinearGradient
                  colors={role === 'student' ? ['#667eea', '#764ba2'] : ['transparent', 'transparent']}
                  style={styles.roleButtonGradient}
                >
                  <Text style={[styles.roleButtonText, role === 'student' && styles.roleButtonTextActive]}>
                    Student
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.roleButton, role === 'faculty' && styles.roleButtonActive]}
                onPress={() => setRole('faculty')}
              >
                <LinearGradient
                  colors={role === 'faculty' ? ['#667eea', '#764ba2'] : ['transparent', 'transparent']}
                  style={styles.roleButtonGradient}
                >
                  <Text style={[styles.roleButtonText, role === 'faculty' && styles.roleButtonTextActive]}>
                    Faculty
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>

          {/* Form */}
          <View style={styles.formSection}>
            {!isLogin && (
              <View style={styles.inputContainer}>
                <User size={20} color="#64748b" style={styles.inputIcon} />
                <TextInput
                  style={styles.textInput}
                  placeholder="Full Name"
                  placeholderTextColor="#94a3b8"
                  value={formData.name}
                  onChangeText={(text) => setFormData(prev => ({ ...prev, name: text }))}
                />
              </View>
            )}

            <View style={styles.inputContainer}>
              <Mail size={20} color="#64748b" style={styles.inputIcon} />
              <TextInput
                style={styles.textInput}
                placeholder="Email Address"
                placeholderTextColor="#94a3b8"
                value={formData.email}
                onChangeText={(text) => setFormData(prev => ({ ...prev, email: text }))}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputContainer}>
              <Shield size={20} color="#64748b" style={styles.inputIcon} />
              <TextInput
                style={[styles.textInput, { flex: 1 }]}
                placeholder="Password"
                placeholderTextColor="#94a3b8"
                value={formData.password}
                onChangeText={(text) => setFormData(prev => ({ ...prev, password: text }))}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeButton}
              >
                {showPassword ? (
                  <EyeOff size={20} color="#64748b" />
                ) : (
                  <Eye size={20} color="#64748b" />
                )}
              </TouchableOpacity>
            </View>

            {!isLogin && (
              <>
                <View style={styles.inputContainer}>
                  <Shield size={20} color="#64748b" style={styles.inputIcon} />
                  <TextInput
                    style={[styles.textInput, { flex: 1 }]}
                    placeholder="Confirm Password"
                    placeholderTextColor="#94a3b8"
                    value={formData.confirmPassword}
                    onChangeText={(text) => setFormData(prev => ({ ...prev, confirmPassword: text }))}
                    secureTextEntry={!showConfirmPassword}
                  />
                  <TouchableOpacity
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                    style={styles.eyeButton}
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={20} color="#64748b" />
                    ) : (
                      <Eye size={20} color="#64748b" />
                    )}
                  </TouchableOpacity>
                </View>

                <View style={styles.inputContainer}>
                  <Building size={20} color="#64748b" style={styles.inputIcon} />
                  <TextInput
                    style={styles.textInput}
                    placeholder="Department"
                    placeholderTextColor="#94a3b8"
                    value={formData.department}
                    onChangeText={(text) => setFormData(prev => ({ ...prev, department: text }))}
                  />
                </View>

                <View style={styles.inputContainer}>
                  <Phone size={20} color="#64748b" style={styles.inputIcon} />
                  <TextInput
                    style={styles.textInput}
                    placeholder="Phone Number (Optional)"
                    placeholderTextColor="#94a3b8"
                    value={formData.phone}
                    onChangeText={(text) => setFormData(prev => ({ ...prev, phone: text }))}
                    keyboardType="phone-pad"
                  />
                </View>

                <View style={styles.inputContainer}>
                  <Hash size={20} color="#64748b" style={styles.inputIcon} />
                  <TextInput
                    style={styles.textInput}
                    placeholder={role === 'faculty' ? "Faculty ID (Optional)" : "Student ID (Optional)"}
                    placeholderTextColor="#94a3b8"
                    value={role === 'faculty' ? formData.facultyId : formData.studentId}
                    onChangeText={(text) => setFormData(prev => ({ 
                      ...prev, 
                      [role === 'faculty' ? 'facultyId' : 'studentId']: text 
                    }))}
                    autoCapitalize="characters"
                  />
                </View>
              </>
            )}

            {/* Submit Button */}
            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSubmit}
              disabled={loading}
            >
              <LinearGradient
                colors={['#667eea', '#764ba2']}
                style={styles.submitButtonGradient}
              >
                <Text style={styles.submitButtonText}>
                  {loading ? 'Please Wait...' : isLogin ? 'Login' : 'Create Account'}
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            {/* Switch Mode */}
            <TouchableOpacity onPress={switchMode} style={styles.switchButton}>
              <Text style={styles.switchButtonText}>
                {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  keyboardContainer: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 40,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#667eea',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  appName: {
    fontSize: 32,
    fontWeight: '800',
    color: '#1e293b',
    marginBottom: 8,
    letterSpacing: -1,
  },
  appTagline: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
  },
  modeSection: {
    marginBottom: 32,
  },
  modeButtons: {
    flexDirection: 'row',
    backgroundColor: '#f1f5f9',
    borderRadius: 16,
    padding: 4,
  },
  modeButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 12,
  },
  modeButtonActive: {
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  modeButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#64748b',
  },
  modeButtonTextActive: {
    color: '#667eea',
  },
  roleSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 16,
    textAlign: 'center',
  },
  roleButtons: {
    flexDirection: 'row',
    gap: 16,
  },
  roleButton: {
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#e2e8f0',
  },
  roleButtonActive: {
    borderColor: '#667eea',
  },
  roleButtonGradient: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  roleButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#64748b',
  },
  roleButtonTextActive: {
    color: 'white',
  },
  formSection: {
    marginBottom: 32,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  inputIcon: {
    marginRight: 12,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: '#1e293b',
  },
  eyeButton: {
    padding: 4,
  },
  submitButton: {
    borderRadius: 16,
    overflow: 'hidden',
    marginTop: 8,
  },
  submitButtonGradient: {
    paddingVertical: 18,
    alignItems: 'center',
  },
  submitButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: 'white',
  },
  switchButton: {
    alignItems: 'center',
    paddingVertical: 16,
    marginTop: 8,
  },
  switchButtonText: {
    fontSize: 14,
    color: '#667eea',
    fontWeight: '600',
  },
});
