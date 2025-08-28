import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuthStore } from '@/stores/authStore';
import { GraduationCap, Mail, Phone, Hash, Eye, EyeOff, Shield } from 'lucide-react-native';

export default function AuthScreen() {
  const [loginMethod, setLoginMethod] = useState<'email' | 'otp' | 'id'>('email');
  const [role, setRole] = useState<'faculty' | 'student'>('student');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    phone: '',
    otp: '',
    id: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const { login, loginWithOTP, loginWithId } = useAuthStore();

  const handleLogin = async () => {
    setLoading(true);
    try {
      switch (loginMethod) {
        case 'email':
          if (!formData.email || !formData.password) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
          }
          await login(formData.email, formData.password, role);
          break;
        case 'otp':
          if (!otpSent) {
            if (!formData.phone) {
              Alert.alert('Error', 'Please enter phone number');
              return;
            }
            // Simulate OTP sending
            setOtpSent(true);
            Alert.alert('OTP Sent', 'Enter 123456 to login');
            return;
          } else {
            if (!formData.otp) {
              Alert.alert('Error', 'Please enter OTP');
              return;
            }
            await loginWithOTP(formData.phone, formData.otp, role);
          }
          break;
        case 'id':
          if (!formData.id) {
            Alert.alert('Error', 'Please enter your ID');
            return;
          }
          await loginWithId(formData.id, role);
          break;
      }
    } catch (error: any) {
      Alert.alert('Login Failed', error.message);
    } finally {
      setLoading(false);
    }
  };

  const resetOTP = () => {
    setOtpSent(false);
    setFormData(prev => ({ ...prev, otp: '' }));
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

          {/* Login Method Selection */}
          <View style={styles.methodSection}>
            <Text style={styles.sectionTitle}>Login Method</Text>
            <View style={styles.methodButtons}>
              <TouchableOpacity
                style={[styles.methodButton, loginMethod === 'email' && styles.methodButtonActive]}
                onPress={() => {
                  setLoginMethod('email');
                  resetOTP();
                }}
              >
                <Mail size={20} color={loginMethod === 'email' ? '#667eea' : '#64748b'} />
                <Text style={[styles.methodButtonText, loginMethod === 'email' && styles.methodButtonTextActive]}>
                  Email
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.methodButton, loginMethod === 'otp' && styles.methodButtonActive]}
                onPress={() => {
                  setLoginMethod('otp');
                  resetOTP();
                }}
              >
                <Phone size={20} color={loginMethod === 'otp' ? '#667eea' : '#64748b'} />
                <Text style={[styles.methodButtonText, loginMethod === 'otp' && styles.methodButtonTextActive]}>
                  OTP
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.methodButton, loginMethod === 'id' && styles.methodButtonActive]}
                onPress={() => {
                  setLoginMethod('id');
                  resetOTP();
                }}
              >
                <Hash size={20} color={loginMethod === 'id' ? '#667eea' : '#64748b'} />
                <Text style={[styles.methodButtonText, loginMethod === 'id' && styles.methodButtonTextActive]}>
                  ID
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Login Form */}
          <View style={styles.formSection}>
            {loginMethod === 'email' && (
              <>
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
              </>
            )}

            {loginMethod === 'otp' && (
              <>
                <View style={styles.inputContainer}>
                  <Phone size={20} color="#64748b" style={styles.inputIcon} />
                  <TextInput
                    style={styles.textInput}
                    placeholder="Phone Number"
                    placeholderTextColor="#94a3b8"
                    value={formData.phone}
                    onChangeText={(text) => setFormData(prev => ({ ...prev, phone: text }))}
                    keyboardType="phone-pad"
                    editable={!otpSent}
                  />
                </View>
                {otpSent && (
                  <View style={styles.inputContainer}>
                    <Hash size={20} color="#64748b" style={styles.inputIcon} />
                    <TextInput
                      style={styles.textInput}
                      placeholder="Enter OTP"
                      placeholderTextColor="#94a3b8"
                      value={formData.otp}
                      onChangeText={(text) => setFormData(prev => ({ ...prev, otp: text }))}
                      keyboardType="numeric"
                      maxLength={6}
                    />
                  </View>
                )}
              </>
            )}

            {loginMethod === 'id' && (
              <View style={styles.inputContainer}>
                <Hash size={20} color="#64748b" style={styles.inputIcon} />
                <TextInput
                  style={styles.textInput}
                  placeholder={role === 'faculty' ? "Faculty ID (e.g., FAC001)" : "Student ID (e.g., STU001)"}
                  placeholderTextColor="#94a3b8"
                  value={formData.id}
                  onChangeText={(text) => setFormData(prev => ({ ...prev, id: text }))}
                  autoCapitalize="characters"
                />
              </View>
            )}

            {/* Login Button */}
            <TouchableOpacity
              style={styles.loginButton}
              onPress={handleLogin}
              disabled={loading}
            >
              <LinearGradient
                colors={['#667eea', '#764ba2']}
                style={styles.loginButtonGradient}
              >
                <Text style={styles.loginButtonText}>
                  {loading ? 'Please Wait...' : 
                   loginMethod === 'otp' && !otpSent ? 'Send OTP' : 'Login'}
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            {otpSent && (
              <TouchableOpacity onPress={resetOTP} style={styles.linkButton}>
                <Text style={styles.linkButtonText}>Change Phone Number</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Demo Credentials */}
          <View style={styles.demoSection}>
            <Text style={styles.demoTitle}>Demo Credentials</Text>
            <View style={styles.demoCredentials}>
              <View style={styles.demoRole}>
                <Text style={styles.demoRoleTitle}>Faculty:</Text>
                <Text style={styles.demoText}>Email: sarah.johnson@university.edu</Text>
                <Text style={styles.demoText}>Password: password123</Text>
                <Text style={styles.demoText}>ID: FAC001</Text>
                <Text style={styles.demoText}>Phone: +1234567890 (OTP: 123456)</Text>
              </View>
              <View style={styles.demoRole}>
                <Text style={styles.demoRoleTitle}>Student:</Text>
                <Text style={styles.demoText}>Email: john.doe@student.edu</Text>
                <Text style={styles.demoText}>Password: password123</Text>
                <Text style={styles.demoText}>ID: STU001</Text>
                <Text style={styles.demoText}>Phone: +1234567892 (OTP: 123456)</Text>
              </View>
            </View>
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
  methodSection: {
    marginBottom: 32,
  },
  methodButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  methodButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#e2e8f0',
    gap: 8,
  },
  methodButtonActive: {
    borderColor: '#667eea',
    backgroundColor: '#667eea10',
  },
  methodButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748b',
  },
  methodButtonTextActive: {
    color: '#667eea',
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
  loginButton: {
    borderRadius: 16,
    overflow: 'hidden',
    marginTop: 8,
  },
  loginButtonGradient: {
    paddingVertical: 18,
    alignItems: 'center',
  },
  loginButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: 'white',
  },
  linkButton: {
    alignItems: 'center',
    paddingVertical: 12,
    marginTop: 8,
  },
  linkButtonText: {
    fontSize: 14,
    color: '#667eea',
    fontWeight: '600',
  },
  demoSection: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  demoTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 16,
    textAlign: 'center',
  },
  demoCredentials: {
    gap: 16,
  },
  demoRole: {
    backgroundColor: '#f8fafc',
    padding: 16,
    borderRadius: 12,
  },
  demoRoleTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#667eea',
    marginBottom: 8,
  },
  demoText: {
    fontSize: 12,
    color: '#64748b',
    marginBottom: 4,
    fontFamily: 'monospace',
  },
});
