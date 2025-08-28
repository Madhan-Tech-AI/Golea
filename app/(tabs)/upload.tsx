import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput, Modal, Alert, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Upload, File, Video, Image, FileText, Plus, X, Calendar, Tag, Lock, Eye, Clock } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export default function UploadScreen() {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadType, setUploadType] = useState<string>('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [scheduledDate, setScheduledDate] = useState('');
  const [hasWatermark, setHasWatermark] = useState(false);
  const [isPrivate, setIsPrivate] = useState(false);

  const uploadTypes = [
    { id: 'document', title: 'Document', icon: FileText, color: '#3b82f6', description: 'PDF, DOC, PPT' },
    { id: 'video', title: 'Video', icon: Video, color: '#ef4444', description: 'MP4, AVI, MOV' },
    { id: 'image', title: 'Image', icon: Image, color: '#10b981', description: 'JPG, PNG, GIF' },
    { id: 'audio', title: 'Audio', icon: File, color: '#f59e0b', description: 'MP3, WAV, M4A' },
  ];

  const recentUploads = [
    { id: 1, title: 'Data Structures - Lecture 5', type: 'video', size: '234 MB', date: '2024-01-15', views: 45 },
    { id: 2, title: 'Algorithm Analysis Notes', type: 'document', size: '2.1 MB', date: '2024-01-14', views: 32 },
    { id: 3, title: 'Binary Tree Visualization', type: 'image', size: '890 KB', date: '2024-01-13', views: 28 },
    { id: 4, title: 'Sorting Algorithms Audio', type: 'audio', size: '45 MB', date: '2024-01-12', views: 19 },
  ];

  const handleUpload = () => {
    if (!title || !uploadType) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }
    
    // Simulate upload process
    Alert.alert('Success', 'Content uploaded successfully!');
    setShowUploadModal(false);
    resetForm();
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setTags('');
    setScheduledDate('');
    setHasWatermark(false);
    setIsPrivate(false);
    setUploadType('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Content Upload</Text>
          <Text style={styles.headerSubtitle}>Share learning materials with your students</Text>
        </View>

        {/* Upload Options */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Upload New Content</Text>
          <View style={styles.uploadGrid}>
            {uploadTypes.map((type) => (
              <TouchableOpacity
                key={type.id}
                style={styles.uploadCard}
                onPress={() => {
                  setUploadType(type.id);
                  setShowUploadModal(true);
                }}
              >
                <LinearGradient
                  colors={[type.color + '15', type.color + '05']}
                  style={styles.uploadIconContainer}
                >
                  <type.icon size={28} color={type.color} />
                </LinearGradient>
                <Text style={styles.uploadTitle}>{type.title}</Text>
                <Text style={styles.uploadDescription}>{type.description}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Recent Uploads */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Uploads</Text>
            <TouchableOpacity style={styles.viewAllButton}>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          {recentUploads.map((upload) => (
            <TouchableOpacity key={upload.id} style={styles.uploadItem}>
              <View style={styles.uploadItemIcon}>
                <View style={[styles.typeIndicator, { backgroundColor: getTypeColor(upload.type) }]} />
              </View>
              <View style={styles.uploadItemContent}>
                <Text style={styles.uploadItemTitle}>{upload.title}</Text>
                <View style={styles.uploadItemMeta}>
                  <Text style={styles.uploadItemSize}>{upload.size}</Text>
                  <Text style={styles.uploadItemDivider}>•</Text>
                  <Text style={styles.uploadItemDate}>{upload.date}</Text>
                  <Text style={styles.uploadItemDivider}>•</Text>
                  <View style={styles.viewsContainer}>
                    <Eye size={12} color="#64748b" />
                    <Text style={styles.uploadItemViews}>{upload.views}</Text>
                  </View>
                </View>
              </View>
              <TouchableOpacity style={styles.moreButton}>
                <Text style={styles.moreText}>⋯</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </View>

        {/* Quick Stats */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Upload Statistics</Text>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>156</Text>
              <Text style={styles.statLabel}>Total Files</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>2.4 GB</Text>
              <Text style={styles.statLabel}>Storage Used</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>1.2K</Text>
              <Text style={styles.statLabel}>Total Views</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Upload Modal */}
      <Modal
        visible={showUploadModal}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setShowUploadModal(false)}>
              <X size={24} color="#64748b" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Upload {uploadType}</Text>
            <TouchableOpacity onPress={handleUpload} style={styles.saveButton}>
              <Text style={styles.saveButtonText}>Upload</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.modalContent}>
            {/* Title */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Title *</Text>
              <TextInput
                style={styles.textInput}
                value={title}
                onChangeText={setTitle}
                placeholder="Enter content title"
                placeholderTextColor="#94a3b8"
              />
            </View>

            {/* Description */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Description</Text>
              <TextInput
                style={[styles.textInput, styles.textArea]}
                value={description}
                onChangeText={setDescription}
                placeholder="Enter content description"
                placeholderTextColor="#94a3b8"
                multiline
                numberOfLines={4}
              />
            </View>

            {/* Tags */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Tags</Text>
              <TextInput
                style={styles.textInput}
                value={tags}
                onChangeText={setTags}
                placeholder="Enter tags separated by commas"
                placeholderTextColor="#94a3b8"
              />
            </View>

            {/* Scheduled Date */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Schedule Publication</Text>
              <TouchableOpacity style={styles.dateInput}>
                <Calendar size={20} color="#64748b" />
                <Text style={styles.dateText}>
                  {scheduledDate || 'Select date (optional)'}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Options */}
            <View style={styles.optionsContainer}>
              <TouchableOpacity
                style={styles.optionRow}
                onPress={() => setIsPrivate(!isPrivate)}
              >
                <Lock size={20} color={isPrivate ? '#6366f1' : '#64748b'} />
                <View style={styles.optionContent}>
                  <Text style={styles.optionTitle}>Private Content</Text>
                  <Text style={styles.optionDescription}>Only visible to selected students</Text>
                </View>
                <View style={[styles.toggle, isPrivate && styles.toggleActive]} />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.optionRow}
                onPress={() => setHasWatermark(!hasWatermark)}
              >
                <Tag size={20} color={hasWatermark ? '#6366f1' : '#64748b'} />
                <View style={styles.optionContent}>
                  <Text style={styles.optionTitle}>Add Watermark</Text>
                  <Text style={styles.optionDescription}>Protect content with watermark</Text>
                </View>
                <View style={[styles.toggle, hasWatermark && styles.toggleActive]} />
              </TouchableOpacity>
            </View>

            {/* File Upload Area */}
            <View style={styles.uploadArea}>
              <Upload size={48} color="#94a3b8" />
              <Text style={styles.uploadAreaTitle}>Tap to select file</Text>
              <Text style={styles.uploadAreaSubtitle}>
                Maximum size: 500MB for videos, 50MB for other files
              </Text>
            </View>
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

const getTypeColor = (type: string) => {
  switch (type) {
    case 'video': return '#ef4444';
    case 'document': return '#3b82f6';
    case 'image': return '#10b981';
    case 'audio': return '#f59e0b';
    default: return '#64748b';
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  content: {
    flex: 1,
  },
  header: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#64748b',
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  viewAllButton: {
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  viewAllText: {
    color: '#6366f1',
    fontWeight: '600',
    fontSize: 14,
  },
  uploadGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  uploadCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    width: (width - 60) / 2,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  uploadIconContainer: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  uploadTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 4,
  },
  uploadDescription: {
    fontSize: 12,
    color: '#64748b',
    textAlign: 'center',
  },
  uploadItem: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  uploadItemIcon: {
    marginRight: 16,
  },
  typeIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  uploadItemContent: {
    flex: 1,
  },
  uploadItemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 4,
  },
  uploadItemMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  uploadItemSize: {
    fontSize: 14,
    color: '#64748b',
  },
  uploadItemDate: {
    fontSize: 14,
    color: '#64748b',
  },
  uploadItemDivider: {
    fontSize: 14,
    color: '#64748b',
    marginHorizontal: 8,
  },
  viewsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  uploadItemViews: {
    fontSize: 14,
    color: '#64748b',
    marginLeft: 4,
  },
  moreButton: {
    padding: 8,
  },
  moreText: {
    fontSize: 18,
    color: '#64748b',
    fontWeight: 'bold',
  },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#e2e8f0',
    marginHorizontal: 16,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#64748b',
    textAlign: 'center',
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
    color: '#0f172a',
    textTransform: 'capitalize',
  },
  saveButton: {
    backgroundColor: '#6366f1',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  saveButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
  modalContent: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#0f172a',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  dateInput: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  dateText: {
    fontSize: 16,
    color: '#64748b',
    marginLeft: 12,
  },
  optionsContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 20,
    overflow: 'hidden',
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  optionContent: {
    flex: 1,
    marginLeft: 12,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 2,
  },
  optionDescription: {
    fontSize: 14,
    color: '#64748b',
  },
  toggle: {
    width: 44,
    height: 24,
    backgroundColor: '#e2e8f0',
    borderRadius: 12,
    position: 'relative',
  },
  toggleActive: {
    backgroundColor: '#6366f1',
  },
  uploadArea: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 40,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#e2e8f0',
    borderStyle: 'dashed',
    marginBottom: 20,
  },
  uploadAreaTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0f172a',
    marginTop: 12,
    marginBottom: 4,
  },
  uploadAreaSubtitle: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
  },
});