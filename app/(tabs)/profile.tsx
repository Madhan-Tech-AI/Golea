import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Modal, TextInput, Alert, Switch, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthStore } from '@/stores/authStore';
import { User, Mail, Phone, Calendar, MapPin, Settings, Bell, Shield, CircleHelp as HelpCircle, LogOut, CreditCard as Edit, Camera, X, Save, Building } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export default function ProfileScreen() {
  const { user, logout, updateProfile } = useAuthStore();
  const [showEditModal, setShowEditModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [editForm, setEditForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    department: user?.department || '',
  });
  const [notifications, setNotifications] = useState({
    push: true,
    email: true,
    assignments: true,
    grades: true,
  });

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', style: 'destructive', onPress: logout }
      ]
    );
  };

  const handleSaveProfile = () => {
    if (!editForm.name || !editForm.email) {
      Alert.alert('Error', 'Name and email are required');
      return;
    }
    
    updateProfile(editForm);
    setShowEditModal(false);
    Alert.alert('Success', 'Profile updated successfully');
  };

  const menuItems = [
    { icon: Bell, title: 'Notifications', subtitle: 'Manage your notification preferences', action: () => setShowSettingsModal(true) },
    { icon: Shield, title: 'Privacy & Security', subtitle: 'Manage your account security', action: () => Alert.alert('Coming Soon', 'Privacy settings coming soon!') },
    { icon: HelpCircle, title: 'Help & Support', subtitle: 'Get help and contact support', action: () => Alert.alert('Coming Soon', 'Help center coming soon!') },
    { icon: Settings, title: 'App Settings', subtitle: 'Customize your app experience', action: () => Alert.alert('Coming Soon', 'App settings coming soon!') },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        {/* Profile Header */}
        <View style={styles.profileSection}>
          <LinearGradient
            colors={['#667eea', '#764ba2']}
            style={styles.profileBackground}
          >
            <View style={styles.profileHeader}>
              <View style={styles.avatarContainer}>
                <LinearGradient
                  colors={['rgba(255,255,255,0.3)', 'rgba(255,255,255,0.1)']}
                  style={styles.avatar}
                >
                  <Text style={styles.avatarText}>
                    {user?.name?.charAt(0) || 'U'}
                  </Text>
                </LinearGradient>
                <TouchableOpacity style={styles.cameraButton}>
                  <Camera size={16} color="white" />
                </TouchableOpacity>
              </View>
              <TouchableOpacity 
                style={styles.editButton}
                onPress={() => setShowEditModal(true)}
              >
                <Edit size={18} color="white" />
              </TouchableOpacity>
            </View>
            
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>{user?.name}</Text>
              <Text style={styles.profileRole}>
                {user?.role === 'faculty' ? 'Faculty Member' : 'Student'}
              </Text>
              <Text style={styles.profileDepartment}>{user?.department}</Text>
              {(user?.studentId || user?.facultyId) && (
                <Text style={styles.profileId}>
                  {user?.role === 'faculty' ? user?.facultyId : user?.studentId}
                </Text>
              )}
              <Text style={styles.joinDate}>
                Joined {user?.joinDate ? new Date(user.joinDate).toLocaleDateString('en-US', { 
                  month: 'long', 
                  year: 'numeric' 
                }) : 'Recently'}
              </Text>
            </View>
          </LinearGradient>
        </View>

        {/* Contact Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Information</Text>
          <View style={styles.contactCard}>
            <View style={styles.contactItem}>
              <Mail size={20} color="#667eea" />
              <View style={styles.contactContent}>
                <Text style={styles.contactLabel}>Email</Text>
                <Text style={styles.contactValue}>{user?.email}</Text>
              </View>
            </View>
            <View style={styles.contactItem}>
              <Phone size={20} color="#667eea" />
              <View style={styles.contactContent}>
                <Text style={styles.contactLabel}>Phone</Text>
                <Text style={styles.contactValue}>{user?.phone || 'Not provided'}</Text>
              </View>
            </View>
            <View style={styles.contactItem}>
              <Building size={20} color="#667eea" />
              <View style={styles.contactContent}>
                <Text style={styles.contactLabel}>Department</Text>
                <Text style={styles.contactValue}>{user?.department}</Text>
              </View>
            </View>
            <View style={styles.contactItem}>
              <Calendar size={20} color="#667eea" />
              <View style={styles.contactContent}>
                <Text style={styles.contactLabel}>Member Since</Text>
                <Text style={styles.contactValue}>
                  {user?.joinDate ? new Date(user.joinDate).toLocaleDateString() : 'Recently'}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>
          <View style={styles.menuContainer}>
            {menuItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.menuItem}
                onPress={item.action}
              >
                <View style={styles.menuItemIcon}>
                  <item.icon size={20} color="#667eea" />
                </View>
                <View style={styles.menuItemContent}>
                  <Text style={styles.menuItemTitle}>{item.title}</Text>
                  <Text style={styles.menuItemSubtitle}>{item.subtitle}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Logout */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <LogOut size={20} color="#ef4444" />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>

      {/* Edit Profile Modal */}
      <Modal
        visible={showEditModal}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setShowEditModal(false)}>
              <X size={24} color="#64748b" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Edit Profile</Text>
            <TouchableOpacity onPress={handleSaveProfile}>
              <Save size={24} color="#667eea" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalContent}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Name</Text>
              <TextInput
                style={styles.textInput}
                value={editForm.name}
                onChangeText={(text) => setEditForm(prev => ({ ...prev, name: text }))}
                placeholder="Enter your name"
                placeholderTextColor="#94a3b8"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Email</Text>
              <TextInput
                style={styles.textInput}
                value={editForm.email}
                onChangeText={(text) => setEditForm(prev => ({ ...prev, email: text }))}
                placeholder="Enter your email"
                placeholderTextColor="#94a3b8"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Phone</Text>
              <TextInput
                style={styles.textInput}
                value={editForm.phone}
                onChangeText={(text) => setEditForm(prev => ({ ...prev, phone: text }))}
                placeholder="Enter your phone number"
                placeholderTextColor="#94a3b8"
                keyboardType="phone-pad"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Department</Text>
              <TextInput
                style={styles.textInput}
                value={editForm.department}
                onChangeText={(text) => setEditForm(prev => ({ ...prev, department: text }))}
                placeholder="Enter your department"
                placeholderTextColor="#94a3b8"
              />
            </View>
          </ScrollView>
        </SafeAreaView>
      </Modal>

      {/* Settings Modal */}
      <Modal
        visible={showSettingsModal}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setShowSettingsModal(false)}>
              <X size={24} color="#64748b" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Notification Settings</Text>
            <View style={{ width: 24 }} />
          </View>

          <ScrollView style={styles.modalContent}>
            <View style={styles.settingsGroup}>
              <Text style={styles.settingsGroupTitle}>General</Text>
              
              <View style={styles.settingItem}>
                <View style={styles.settingContent}>
                  <Text style={styles.settingTitle}>Push Notifications</Text>
                  <Text style={styles.settingDescription}>Receive notifications on your device</Text>
                </View>
                <Switch
                  value={notifications.push}
                  onValueChange={(value) => setNotifications(prev => ({ ...prev, push: value }))}
                  trackColor={{ false: '#f1f5f9', true: '#667eea' }}
                  thumbColor={notifications.push ? 'white' : '#94a3b8'}
                />
              </View>

              <View style={styles.settingItem}>
                <View style={styles.settingContent}>
                  <Text style={styles.settingTitle}>Email Notifications</Text>
                  <Text style={styles.settingDescription}>Receive important updates via email</Text>
                </View>
                <Switch
                  value={notifications.email}
                  onValueChange={(value) => setNotifications(prev => ({ ...prev, email: value }))}
                  trackColor={{ false: '#f1f5f9', true: '#667eea' }}
                  thumbColor={notifications.email ? 'white' : '#94a3b8'}
                />
              </View>
            </View>

            <View style={styles.settingsGroup}>
              <Text style={styles.settingsGroupTitle}>Academic</Text>
              
              <View style={styles.settingItem}>
                <View style={styles.settingContent}>
                  <Text style={styles.settingTitle}>Assignment Notifications</Text>
                  <Text style={styles.settingDescription}>Get notified about new assignments and due dates</Text>
                </View>
                <Switch
                  value={notifications.assignments}
                  onValueChange={(value) => setNotifications(prev => ({ ...prev, assignments: value }))}
                  trackColor={{ false: '#f1f5f9', true: '#667eea' }}
                  thumbColor={notifications.assignments ? 'white' : '#94a3b8'}
                />
              </View>

              <View style={styles.settingItem}>
                <View style={styles.settingContent}>
                  <Text style={styles.settingTitle}>Grade Notifications</Text>
                  <Text style={styles.settingDescription}>Get notified when grades are posted</Text>
                </View>
                <Switch
                  value={notifications.grades}
                  onValueChange={(value) => setNotifications(prev => ({ ...prev, grades: value }))}
                  trackColor={{ false: '#f1f5f9', true: '#667eea' }}
                  thumbColor={notifications.grades ? 'white' : '#94a3b8'}
                />
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  content: {
    flex: 1,
  },
  profileSection: {
    marginBottom: 20,
  },
  profileBackground: {
    paddingTop: 40,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  profileHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  avatarText: {
    fontSize: 32,
    fontWeight: '700',
    color: 'white',
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 12,
    padding: 6,
  },
  editButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 20,
    padding: 8,
  },
  profileInfo: {
    alignItems: 'center',
  },
  profileName: {
    fontSize: 28,
    fontWeight: '700',
    color: 'white',
    marginBottom: 4,
    textAlign: 'center',
  },
  profileRole: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
    fontWeight: '600',
    marginBottom: 4,
  },
  profileDepartment: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 4,
  },
  profileId: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    fontFamily: 'monospace',
    marginBottom: 8,
  },
  joinDate: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 16,
  },
  contactCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  contactContent: {
    marginLeft: 16,
    flex: 1,
  },
  contactLabel: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '600',
    marginBottom: 2,
  },
  contactValue: {
    fontSize: 16,
    color: '#1e293b',
    fontWeight: '500',
  },
  menuContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  menuItemIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#667eea15',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuItemContent: {
    flex: 1,
  },
  menuItemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 2,
  },
  menuItemSubtitle: {
    fontSize: 14,
    color: '#64748b',
  },
  logoutButton: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
    gap: 8,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ef4444',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
  },
  modalContent: {
    flex: 1,
    paddingTop: 20,
  },
  inputGroup: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#1e293b',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  settingsGroup: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  settingsGroupTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 16,
  },
  settingItem: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 14,
    color: '#64748b',
  },
});
