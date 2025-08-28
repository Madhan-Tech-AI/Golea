import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Modal, Dimensions, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SquareCheck as CheckSquare, Clock, Calendar, FileText, Video, Upload, Eye, Download, CircleAlert as AlertCircle, CircleCheck as CheckCircle, X, Plus } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export default function AssignmentsScreen() {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showAssignmentModal, setShowAssignmentModal] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState<any>(null);

  const assignments = [
    {
      id: 1,
      title: 'Binary Search Tree Implementation',
      course: 'Data Structures',
      instructor: 'Dr. Sarah Johnson',
      dueDate: '2024-01-20',
      dueTime: '11:59 PM',
      type: 'coding',
      status: 'pending',
      priority: 'high',
      points: 50,
      description: 'Implement a binary search tree with insertion, deletion, and traversal methods.',
      submissions: 0,
      allowedAttempts: 3,
      submissionTypes: ['file', 'text'],
      estimatedTime: '4 hours',
      resources: ['BST Tutorial', 'Example Code'],
      graded: false,
      feedback: null,
      grade: null,
    },
    {
      id: 2,
      title: 'React Components Assignment',
      course: 'Web Development',
      instructor: 'Prof. Mike Chen',
      dueDate: '2024-01-18',
      dueTime: '11:59 PM',
      type: 'project',
      status: 'submitted',
      priority: 'medium',
      points: 75,
      description: 'Create a responsive React application with functional components.',
      submissions: 1,
      allowedAttempts: 2,
      submissionTypes: ['file', 'url'],
      estimatedTime: '6 hours',
      resources: ['React Docs', 'Component Examples'],
      graded: true,
      feedback: 'Good component structure. Consider adding more comments.',
      grade: 42,
      submittedAt: '2024-01-17 08:30 PM',
    },
    {
      id: 3,
      title: 'Database Query Optimization',
      course: 'Database Systems',
      instructor: 'Dr. Emma Davis',
      dueDate: '2024-01-15',
      dueTime: '11:59 PM',
      type: 'analysis',
      status: 'overdue',
      priority: 'high',
      points: 60,
      description: 'Analyze and optimize complex SQL queries for better performance.',
      submissions: 0,
      allowedAttempts: 1,
      submissionTypes: ['file', 'text'],
      estimatedTime: '3 hours',
      resources: ['SQL Performance Guide'],
      graded: false,
      feedback: null,
      grade: null,
    },
    {
      id: 4,
      title: 'UI/UX Case Study',
      course: 'Design Principles',
      instructor: 'Prof. Alex Wilson',
      dueDate: '2024-01-25',
      dueTime: '11:59 PM',
      type: 'presentation',
      status: 'pending',
      priority: 'medium',
      points: 80,
      description: 'Analyze a mobile app\'s user interface and propose improvements.',
      submissions: 0,
      allowedAttempts: 1,
      submissionTypes: ['file', 'video'],
      estimatedTime: '8 hours',
      resources: ['Design Guidelines', 'Case Study Template'],
      graded: false,
      feedback: null,
      grade: null,
    },
  ];

  const filters = [
    { id: 'all', label: 'All Tasks', count: assignments.length },
    { id: 'pending', label: 'Pending', count: assignments.filter(a => a.status === 'pending').length },
    { id: 'submitted', label: 'Submitted', count: assignments.filter(a => a.status === 'submitted').length },
    { id: 'overdue', label: 'Overdue', count: assignments.filter(a => a.status === 'overdue').length },
  ];

  const filteredAssignments = assignments.filter(assignment => {
    if (selectedFilter === 'all') return true;
    return assignment.status === selectedFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return '#3b82f6';
      case 'submitted': return '#10b981';
      case 'overdue': return '#ef4444';
      case 'graded': return '#8b5cf6';
      default: return '#64748b';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return '#ef4444';
      case 'medium': return '#f59e0b';
      case 'low': return '#10b981';
      default: return '#64748b';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'coding': return FileText;
      case 'project': return Upload;
      case 'analysis': return Eye;
      case 'presentation': return Video;
      default: return FileText;
    }
  };

  const getDaysUntilDue = (dueDate: string) => {
    const due = new Date(dueDate);
    const today = new Date();
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const handleSubmissionAction = (assignment: any, action: string) => {
    switch (action) {
      case 'submit':
        Alert.alert('Submit Assignment', `Submit ${assignment.title}?`, [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Submit', onPress: () => console.log('Submitting assignment') }
        ]);
        break;
      case 'view_submission':
        console.log('Viewing submission');
        break;
      case 'download':
        console.log('Downloading resources');
        break;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Assignments & Tasks</Text>
          <Text style={styles.headerSubtitle}>Stay on top of your coursework</Text>
          
          {/* Filter Tabs */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.filtersContainer}
            contentContainerStyle={styles.filtersContent}
          >
            {filters.map((filter) => (
              <TouchableOpacity
                key={filter.id}
                style={[
                  styles.filterTab,
                  selectedFilter === filter.id && styles.filterTabActive
                ]}
                onPress={() => setSelectedFilter(filter.id)}
              >
                <Text
                  style={[
                    styles.filterTabText,
                    selectedFilter === filter.id && styles.filterTabTextActive
                  ]}
                >
                  {filter.label} ({filter.count})
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Quick Stats */}
        <View style={styles.statsSection}>
          <View style={styles.statsGrid}>
            <LinearGradient
              colors={['#3b82f615', '#3b82f605']}
              style={styles.statCard}
            >
              <Clock size={24} color="#3b82f6" />
              <Text style={styles.statValue}>
                {assignments.filter(a => a.status === 'pending').length}
              </Text>
              <Text style={styles.statLabel}>Pending Tasks</Text>
            </LinearGradient>
            <LinearGradient
              colors={['#ef444415', '#ef444405']}
              style={styles.statCard}
            >
              <AlertCircle size={24} color="#ef4444" />
              <Text style={styles.statValue}>
                {assignments.filter(a => a.status === 'overdue').length}
              </Text>
              <Text style={styles.statLabel}>Overdue</Text>
            </LinearGradient>
            <LinearGradient
              colors={['#10b98115', '#10b98105']}
              style={styles.statCard}
            >
              <CheckCircle size={24} color="#10b981" />
              <Text style={styles.statValue}>
                {assignments.filter(a => a.status === 'submitted').length}
              </Text>
              <Text style={styles.statLabel}>Completed</Text>
            </LinearGradient>
          </View>
        </View>

        {/* Assignments List */}
        <View style={styles.assignmentsSection}>
          <Text style={styles.sectionTitle}>
            {selectedFilter === 'all' ? 'All Assignments' : filters.find(f => f.id === selectedFilter)?.label}
          </Text>
          {filteredAssignments.map((assignment) => {
            const TypeIcon = getTypeIcon(assignment.type);
            const daysUntilDue = getDaysUntilDue(assignment.dueDate);
            
            return (
              <TouchableOpacity
                key={assignment.id}
                style={[styles.assignmentCard, assignment.status === 'overdue' && styles.assignmentCardOverdue]}
                onPress={() => {
                  setSelectedAssignment(assignment);
                  setShowAssignmentModal(true);
                }}
              >
                <View style={styles.assignmentHeader}>
                  <View style={styles.assignmentInfo}>
                    <View style={[styles.typeIcon, { backgroundColor: getStatusColor(assignment.status) + '15' }]}>
                      <TypeIcon size={20} color={getStatusColor(assignment.status)} />
                    </View>
                    <View style={styles.assignmentDetails}>
                      <Text style={styles.assignmentTitle}>{assignment.title}</Text>
                      <Text style={styles.assignmentCourse}>{assignment.course}</Text>
                      <Text style={styles.assignmentInstructor}>{assignment.instructor}</Text>
                    </View>
                  </View>
                  <View style={styles.assignmentMeta}>
                    <View style={[styles.priorityBadge, { backgroundColor: getPriorityColor(assignment.priority) }]} />
                    <Text style={styles.assignmentPoints}>{assignment.points} pts</Text>
                  </View>
                </View>

                <View style={styles.assignmentContent}>
                  <Text style={styles.assignmentDescription} numberOfLines={2}>
                    {assignment.description}
                  </Text>
                </View>

                <View style={styles.assignmentFooter}>
                  <View style={styles.dueDateContainer}>
                    <Calendar size={16} color="#64748b" />
                    <Text style={styles.dueDate}>
                      Due {assignment.dueDate} at {assignment.dueTime}
                    </Text>
                    {daysUntilDue >= 0 && (
                      <Text style={[
                        styles.daysUntilDue,
                        { color: daysUntilDue <= 1 ? '#ef4444' : daysUntilDue <= 3 ? '#f59e0b' : '#10b981' }
                      ]}>
                        ({daysUntilDue === 0 ? 'Today' : daysUntilDue === 1 ? 'Tomorrow' : `${daysUntilDue} days left`})
                      </Text>
                    )}
                    {daysUntilDue < 0 && (
                      <Text style={[styles.daysUntilDue, { color: '#ef4444' }]}>
                        ({Math.abs(daysUntilDue)} days overdue)
                      </Text>
                    )}
                  </View>
                  
                  <View style={styles.assignmentActions}>
                    <View style={[styles.statusBadge, { backgroundColor: getStatusColor(assignment.status) }]}>
                      <Text style={styles.statusText}>{assignment.status.toUpperCase()}</Text>
                    </View>
                  </View>
                </View>

                {assignment.graded && assignment.grade !== null && (
                  <View style={styles.gradeSection}>
                    <View style={styles.gradeInfo}>
                      <Text style={styles.gradeLabel}>Grade:</Text>
                      <Text style={[
                        styles.gradeValue,
                        { color: (assignment.grade / assignment.points) >= 0.9 ? '#10b981' : 
                                (assignment.grade / assignment.points) >= 0.8 ? '#3b82f6' :
                                (assignment.grade / assignment.points) >= 0.7 ? '#f59e0b' : '#ef4444' }
                      ]}>
                        {assignment.grade}/{assignment.points} ({Math.round((assignment.grade / assignment.points) * 100)}%)
                      </Text>
                    </View>
                    {assignment.feedback && (
                      <Text style={styles.feedback} numberOfLines={2}>
                        {assignment.feedback}
                      </Text>
                    )}
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>

      {/* Assignment Detail Modal */}
      <Modal
        visible={showAssignmentModal}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <SafeAreaView style={styles.modalContainer}>
          {selectedAssignment && (
            <>
              <View style={styles.modalHeader}>
                <TouchableOpacity onPress={() => setShowAssignmentModal(false)}>
                  <X size={24} color="#64748b" />
                </TouchableOpacity>
                <Text style={styles.modalTitle} numberOfLines={1}>{selectedAssignment.title}</Text>
                <View style={{ width: 24 }} />
              </View>

              <ScrollView style={styles.modalContent}>
                {/* Assignment Overview */}
                <View style={styles.modalSection}>
                  <Text style={styles.modalSectionTitle}>Assignment Details</Text>
                  <View style={styles.detailCard}>
                    <Text style={styles.modalAssignmentTitle}>{selectedAssignment.title}</Text>
                    <Text style={styles.modalCourse}>{selectedAssignment.course}</Text>
                    <Text style={styles.modalInstructor}>by {selectedAssignment.instructor}</Text>
                    <Text style={styles.modalDescription}>{selectedAssignment.description}</Text>
                  </View>
                </View>

                {/* Assignment Info */}
                <View style={styles.modalSection}>
                  <Text style={styles.modalSectionTitle}>Information</Text>
                  <View style={styles.infoGrid}>
                    <View style={styles.infoItem}>
                      <Text style={styles.infoLabel}>Due Date</Text>
                      <Text style={styles.infoValue}>{selectedAssignment.dueDate}</Text>
                      <Text style={styles.infoSubValue}>{selectedAssignment.dueTime}</Text>
                    </View>
                    <View style={styles.infoItem}>
                      <Text style={styles.infoLabel}>Points</Text>
                      <Text style={styles.infoValue}>{selectedAssignment.points}</Text>
                      <Text style={styles.infoSubValue}>Total Points</Text>
                    </View>
                    <View style={styles.infoItem}>
                      <Text style={styles.infoLabel}>Attempts</Text>
                      <Text style={styles.infoValue}>{selectedAssignment.submissions}/{selectedAssignment.allowedAttempts}</Text>
                      <Text style={styles.infoSubValue}>Used/Allowed</Text>
                    </View>
                    <View style={styles.infoItem}>
                      <Text style={styles.infoLabel}>Est. Time</Text>
                      <Text style={styles.infoValue}>{selectedAssignment.estimatedTime}</Text>
                      <Text style={styles.infoSubValue}>Duration</Text>
                    </View>
                  </View>
                </View>

                {/* Submission Types */}
                <View style={styles.modalSection}>
                  <Text style={styles.modalSectionTitle}>Submission Types</Text>
                  <View style={styles.submissionTypes}>
                    {selectedAssignment.submissionTypes.map((type: string, index: number) => (
                      <View key={index} style={styles.submissionTypeChip}>
                        <Text style={styles.submissionTypeText}>{type.toUpperCase()}</Text>
                      </View>
                    ))}
                  </View>
                </View>

                {/* Resources */}
                {selectedAssignment.resources && selectedAssignment.resources.length > 0 && (
                  <View style={styles.modalSection}>
                    <Text style={styles.modalSectionTitle}>Resources</Text>
                    <View style={styles.resourcesList}>
                      {selectedAssignment.resources.map((resource: string, index: number) => (
                        <TouchableOpacity key={index} style={styles.resourceItem}>
                          <FileText size={16} color="#667eea" />
                          <Text style={styles.resourceText}>{resource}</Text>
                          <Download size={16} color="#64748b" />
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>
                )}

                {/* Grade & Feedback */}
                {selectedAssignment.graded && (
                  <View style={styles.modalSection}>
                    <Text style={styles.modalSectionTitle}>Grade & Feedback</Text>
                    <View style={styles.gradeCard}>
                      <View style={styles.gradeHeader}>
                        <Text style={styles.gradeCardLabel}>Your Grade</Text>
                        <Text style={[
                          styles.gradeCardValue,
                          { color: (selectedAssignment.grade / selectedAssignment.points) >= 0.9 ? '#10b981' : 
                                  (selectedAssignment.grade / selectedAssignment.points) >= 0.8 ? '#3b82f6' :
                                  (selectedAssignment.grade / selectedAssignment.points) >= 0.7 ? '#f59e0b' : '#ef4444' }
                        ]}>
                          {selectedAssignment.grade}/{selectedAssignment.points}
                        </Text>
                      </View>
                      {selectedAssignment.feedback && (
                        <View style={styles.feedbackContainer}>
                          <Text style={styles.feedbackLabel}>Instructor Feedback:</Text>
                          <Text style={styles.feedbackText}>{selectedAssignment.feedback}</Text>
                        </View>
                      )}
                    </View>
                  </View>
                )}

                {/* Action Buttons */}
                <View style={styles.modalActions}>
                  {selectedAssignment.status === 'pending' && (
                    <TouchableOpacity
                      style={styles.primaryButton}
                      onPress={() => handleSubmissionAction(selectedAssignment, 'submit')}
                    >
                      <LinearGradient
                        colors={['#667eea', '#764ba2']}
                        style={styles.buttonGradient}
                      >
                        <Upload size={20} color="white" />
                        <Text style={styles.primaryButtonText}>Submit Assignment</Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  )}
                  
                  {selectedAssignment.status === 'submitted' && (
                    <TouchableOpacity
                      style={styles.secondaryButton}
                      onPress={() => handleSubmissionAction(selectedAssignment, 'view_submission')}
                    >
                      <Eye size={20} color="#667eea" />
                      <Text style={styles.secondaryButtonText}>View Submission</Text>
                    </TouchableOpacity>
                  )}

                  <TouchableOpacity
                    style={styles.secondaryButton}
                    onPress={() => handleSubmissionAction(selectedAssignment, 'download')}
                  >
                    <Download size={20} color="#667eea" />
                    <Text style={styles.secondaryButtonText}>Download Resources</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </>
          )}
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
  header: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#64748b',
    marginBottom: 20,
  },
  filtersContainer: {
    marginHorizontal: -20,
  },
  filtersContent: {
    paddingHorizontal: 20,
  },
  filterTab: {
    backgroundColor: '#f1f5f9',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
  },
  filterTabActive: {
    backgroundColor: '#667eea',
  },
  filterTabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748b',
  },
  filterTabTextActive: {
    color: 'white',
  },
  statsSection: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1e293b',
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#64748b',
    textAlign: 'center',
  },
  assignmentsSection: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 16,
  },
  assignmentCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  assignmentCardOverdue: {
    borderLeftWidth: 4,
    borderLeftColor: '#ef4444',
  },
  assignmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  assignmentInfo: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
  },
  typeIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  assignmentDetails: {
    flex: 1,
  },
  assignmentTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 4,
  },
  assignmentCourse: {
    fontSize: 16,
    color: '#667eea',
    fontWeight: '600',
    marginBottom: 2,
  },
  assignmentInstructor: {
    fontSize: 14,
    color: '#64748b',
  },
  assignmentMeta: {
    alignItems: 'flex-end',
  },
  priorityBadge: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginBottom: 8,
  },
  assignmentPoints: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1e293b',
  },
  assignmentContent: {
    marginBottom: 16,
  },
  assignmentDescription: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
  },
  assignmentFooter: {
    marginBottom: 12,
  },
  dueDateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  dueDate: {
    fontSize: 14,
    color: '#64748b',
    marginLeft: 8,
    flex: 1,
  },
  daysUntilDue: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 8,
  },
  assignmentActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  statusBadge: {
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  statusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  gradeSection: {
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
    paddingTop: 16,
  },
  gradeInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  gradeLabel: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '600',
  },
  gradeValue: {
    fontSize: 16,
    fontWeight: '700',
  },
  feedback: {
    fontSize: 14,
    color: '#64748b',
    fontStyle: 'italic',
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
    flex: 1,
    textAlign: 'center',
  },
  modalContent: {
    flex: 1,
    paddingTop: 20,
  },
  modalSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  modalSectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 12,
  },
  detailCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  modalAssignmentTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 8,
  },
  modalCourse: {
    fontSize: 16,
    color: '#667eea',
    fontWeight: '600',
    marginBottom: 4,
  },
  modalInstructor: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 16,
  },
  modalDescription: {
    fontSize: 16,
    color: '#64748b',
    lineHeight: 24,
  },
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  infoItem: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    width: (width - 64) / 2,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  infoLabel: {
    fontSize: 12,
    color: '#64748b',
    fontWeight: '600',
    marginBottom: 8,
  },
  infoValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 4,
  },
  infoSubValue: {
    fontSize: 12,
    color: '#94a3b8',
  },
  submissionTypes: {
    flexDirection: 'row',
    gap: 8,
  },
  submissionTypeChip: {
    backgroundColor: '#667eea15',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  submissionTypeText: {
    fontSize: 12,
    color: '#667eea',
    fontWeight: '600',
  },
  resourcesList: {
    gap: 8,
  },
  resourceItem: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  resourceText: {
    fontSize: 14,
    color: '#1e293b',
    fontWeight: '500',
    flex: 1,
    marginLeft: 12,
  },
  gradeCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  gradeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  gradeCardLabel: {
    fontSize: 16,
    color: '#64748b',
    fontWeight: '600',
  },
  gradeCardValue: {
    fontSize: 24,
    fontWeight: '700',
  },
  feedbackContainer: {
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
    paddingTop: 16,
  },
  feedbackLabel: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '600',
    marginBottom: 8,
  },
  feedbackText: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
  },
  modalActions: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    gap: 12,
  },
  primaryButton: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  buttonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 8,
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: 'white',
  },
  secondaryButton: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 2,
    borderColor: '#e2e8f0',
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#667eea',
  },
});
