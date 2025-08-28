import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput, Modal, Dimensions, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, Filter, Users, UserPlus, Mail, Phone, Calendar, MoveVertical as MoreVertical, Check, X, Star, MessageCircle, Award, TrendingUp } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export default function StudentsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [refreshing, setRefreshing] = useState(false);

  const students = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@student.edu',
      studentId: 'STU001',
      phone: '+1234567892',
      department: 'Computer Science',
      year: '3rd Year',
      gpa: 3.8,
      attendance: 92,
      coursesEnrolled: 6,
      lastActive: '2 hours ago',
      status: 'active',
      joinDate: '2022-08-20',
      assignments: { completed: 24, pending: 3, overdue: 1 },
      performance: 'excellent',
      avatar: null,
    },
    {
      id: 2,
      name: 'Emma Wilson',
      email: 'emma.wilson@student.edu',
      studentId: 'STU002',
      phone: '+1234567893',
      department: 'Information Technology',
      year: '2nd Year',
      gpa: 3.6,
      attendance: 88,
      coursesEnrolled: 5,
      lastActive: '5 hours ago',
      status: 'active',
      joinDate: '2022-08-20',
      assignments: { completed: 18, pending: 4, overdue: 2 },
      performance: 'good',
      avatar: null,
    },
    {
      id: 3,
      name: 'Michael Chen',
      email: 'michael.chen@student.edu',
      studentId: 'STU003',
      phone: '+1234567894',
      department: 'Computer Science',
      year: '4th Year',
      gpa: 3.9,
      attendance: 95,
      coursesEnrolled: 4,
      lastActive: '1 day ago',
      status: 'active',
      joinDate: '2021-08-15',
      assignments: { completed: 32, pending: 2, overdue: 0 },
      performance: 'excellent',
      avatar: null,
    },
    {
      id: 4,
      name: 'Sarah Johnson',
      email: 'sarah.johnson@student.edu',
      studentId: 'STU004',
      phone: '+1234567895',
      department: 'Data Science',
      year: '1st Year',
      gpa: 3.4,
      attendance: 78,
      coursesEnrolled: 7,
      lastActive: '3 days ago',
      status: 'inactive',
      joinDate: '2023-08-25',
      assignments: { completed: 12, pending: 6, overdue: 3 },
      performance: 'needs_attention',
      avatar: null,
    },
  ];

  const connectionRequests = [
    { id: 1, name: 'Alex Rodriguez', studentId: 'STU005', course: 'Advanced Algorithms', requestDate: '2024-01-15' },
    { id: 2, name: 'Lisa Wang', studentId: 'STU006', course: 'Machine Learning', requestDate: '2024-01-14' },
    { id: 3, name: 'David Brown', studentId: 'STU007', course: 'Database Systems', requestDate: '2024-01-13' },
  ];

  const filters = [
    { id: 'all', label: 'All Students', count: students.length },
    { id: 'active', label: 'Active', count: students.filter(s => s.status === 'active').length },
    { id: 'excellent', label: 'Excellent', count: students.filter(s => s.performance === 'excellent').length },
    { id: 'needs_attention', label: 'Needs Attention', count: students.filter(s => s.performance === 'needs_attention').length },
  ];

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         student.studentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || 
                         student.status === selectedFilter || 
                         student.performance === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  };

  const handleConnectionRequest = (requestId: number, action: 'approve' | 'deny') => {
    // Handle connection request approval/denial
    console.log(`${action} request ${requestId}`);
  };

  const getPerformanceColor = (performance: string) => {
    switch (performance) {
      case 'excellent': return '#10b981';
      case 'good': return '#3b82f6';
      case 'needs_attention': return '#f59e0b';
      default: return '#64748b';
    }
  };

  const getStatusColor = (status: string) => {
    return status === 'active' ? '#10b981' : '#ef4444';
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#667eea" />
        }
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>My Students</Text>
          <Text style={styles.headerSubtitle}>Manage your student connections and track progress</Text>
          
          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <View style={styles.searchBar}>
              <Search size={20} color="#64748b" />
              <TextInput
                style={styles.searchInput}
                placeholder="Search students..."
                placeholderTextColor="#94a3b8"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>
            <TouchableOpacity style={styles.filterButton}>
              <Filter size={20} color="#667eea" />
            </TouchableOpacity>
          </View>

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

        {/* Connection Requests */}
        {connectionRequests.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Connection Requests ({connectionRequests.length})</Text>
            {connectionRequests.map((request) => (
              <View key={request.id} style={styles.requestCard}>
                <View style={styles.requestInfo}>
                  <View style={styles.avatarPlaceholder}>
                    <Text style={styles.avatarText}>{request.name.charAt(0)}</Text>
                  </View>
                  <View style={styles.requestDetails}>
                    <Text style={styles.requestName}>{request.name}</Text>
                    <Text style={styles.requestMeta}>{request.studentId} • {request.course}</Text>
                    <Text style={styles.requestDate}>Requested {request.requestDate}</Text>
                  </View>
                </View>
                <View style={styles.requestActions}>
                  <TouchableOpacity
                    style={[styles.requestButton, styles.approveButton]}
                    onPress={() => handleConnectionRequest(request.id, 'approve')}
                  >
                    <Check size={16} color="white" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.requestButton, styles.denyButton]}
                    onPress={() => handleConnectionRequest(request.id, 'deny')}
                  >
                    <X size={16} color="white" />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Students List */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Students ({filteredStudents.length})</Text>
          {filteredStudents.map((student) => (
            <TouchableOpacity
              key={student.id}
              style={styles.studentCard}
              onPress={() => {
                setSelectedStudent(student);
                setShowStudentModal(true);
              }}
            >
              <View style={styles.studentHeader}>
                <View style={styles.studentInfo}>
                  <View style={styles.avatarPlaceholder}>
                    <Text style={styles.avatarText}>{student.name.charAt(0)}</Text>
                  </View>
                  <View style={styles.studentDetails}>
                    <Text style={styles.studentName}>{student.name}</Text>
                    <Text style={styles.studentId}>{student.studentId}</Text>
                    <Text style={styles.studentMeta}>{student.department} • {student.year}</Text>
                  </View>
                </View>
                <View style={styles.statusContainer}>
                  <View style={[styles.statusDot, { backgroundColor: getStatusColor(student.status) }]} />
                  <Text style={styles.lastActive}>{student.lastActive}</Text>
                </View>
              </View>

              <View style={styles.studentStats}>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>{student.gpa}</Text>
                  <Text style={styles.statLabel}>GPA</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>{student.attendance}%</Text>
                  <Text style={styles.statLabel}>Attendance</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>{student.coursesEnrolled}</Text>
                  <Text style={styles.statLabel}>Courses</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                  <View style={[styles.performanceIndicator, { backgroundColor: getPerformanceColor(student.performance) }]} />
                  <Text style={styles.statLabel}>Performance</Text>
                </View>
              </View>

              <View style={styles.assignmentProgress}>
                <View style={styles.assignmentItem}>
                  <Text style={styles.assignmentCount}>{student.assignments.completed}</Text>
                  <Text style={styles.assignmentLabel}>Completed</Text>
                </View>
                <View style={styles.assignmentItem}>
                  <Text style={styles.assignmentCount}>{student.assignments.pending}</Text>
                  <Text style={styles.assignmentLabel}>Pending</Text>
                </View>
                <View style={styles.assignmentItem}>
                  <Text style={[styles.assignmentCount, { color: '#ef4444' }]}>{student.assignments.overdue}</Text>
                  <Text style={styles.assignmentLabel}>Overdue</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>

      {/* Student Detail Modal */}
      <Modal
        visible={showStudentModal}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <SafeAreaView style={styles.modalContainer}>
          {selectedStudent && (
            <>
              <View style={styles.modalHeader}>
                <TouchableOpacity onPress={() => setShowStudentModal(false)}>
                  <X size={24} color="#64748b" />
                </TouchableOpacity>
                <Text style={styles.modalTitle}>{selectedStudent.name}</Text>
                <TouchableOpacity style={styles.moreButton}>
                  <MoreVertical size={24} color="#64748b" />
                </TouchableOpacity>
              </View>

              <ScrollView style={styles.modalContent}>
                {/* Student Profile */}
                <View style={styles.profileSection}>
                  <View style={styles.profileHeader}>
                    <View style={styles.avatarLarge}>
                      <Text style={styles.avatarLargeText}>{selectedStudent.name.charAt(0)}</Text>
                    </View>
                    <View style={styles.profileInfo}>
                      <Text style={styles.profileName}>{selectedStudent.name}</Text>
                      <Text style={styles.profileId}>{selectedStudent.studentId}</Text>
                      <Text style={styles.profileDepartment}>{selectedStudent.department}</Text>
                      <View style={styles.contactInfo}>
                        <Mail size={16} color="#64748b" />
                        <Text style={styles.contactText}>{selectedStudent.email}</Text>
                      </View>
                      <View style={styles.contactInfo}>
                        <Phone size={16} color="#64748b" />
                        <Text style={styles.contactText}>{selectedStudent.phone}</Text>
                      </View>
                    </View>
                  </View>
                </View>

                {/* Quick Actions */}
                <View style={styles.quickActions}>
                  <TouchableOpacity style={styles.actionButton}>
                    <MessageCircle size={20} color="#667eea" />
                    <Text style={styles.actionButtonText}>Message</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.actionButton}>
                    <Mail size={20} color="#667eea" />
                    <Text style={styles.actionButtonText}>Email</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.actionButton}>
                    <Calendar size={20} color="#667eea" />
                    <Text style={styles.actionButtonText}>Schedule</Text>
                  </TouchableOpacity>
                </View>

                {/* Performance Overview */}
                <View style={styles.performanceSection}>
                  <Text style={styles.performanceTitle}>Performance Overview</Text>
                  <View style={styles.performanceCards}>
                    <LinearGradient
                      colors={['#667eea15', '#667eea05']}
                      style={styles.performanceCard}
                    >
                      <TrendingUp size={24} color="#667eea" />
                      <Text style={styles.performanceCardValue}>{selectedStudent.gpa}</Text>
                      <Text style={styles.performanceCardLabel}>Current GPA</Text>
                    </LinearGradient>
                    <LinearGradient
                      colors={['#10b98115', '#10b98105']}
                      style={styles.performanceCard}
                    >
                      <Users size={24} color="#10b981" />
                      <Text style={styles.performanceCardValue}>{selectedStudent.attendance}%</Text>
                      <Text style={styles.performanceCardLabel}>Attendance</Text>
                    </LinearGradient>
                    <LinearGradient
                      colors={['#f59e0b15', '#f59e0b05']}
                      style={styles.performanceCard}
                    >
                      <Award size={24} color="#f59e0b" />
                      <Text style={styles.performanceCardValue}>{selectedStudent.assignments.completed}</Text>
                      <Text style={styles.performanceCardLabel}>Assignments</Text>
                    </LinearGradient>
                  </View>
                </View>

                {/* Assignment Details */}
                <View style={styles.assignmentDetails}>
                  <Text style={styles.assignmentDetailsTitle}>Assignment Status</Text>
                  <View style={styles.assignmentDetailsList}>
                    <View style={styles.assignmentDetailItem}>
                      <View style={[styles.assignmentDetailIcon, { backgroundColor: '#10b981' }]}>
                        <Check size={16} color="white" />
                      </View>
                      <View style={styles.assignmentDetailContent}>
                        <Text style={styles.assignmentDetailLabel}>Completed</Text>
                        <Text style={styles.assignmentDetailValue}>{selectedStudent.assignments.completed} assignments</Text>
                      </View>
                    </View>
                    <View style={styles.assignmentDetailItem}>
                      <View style={[styles.assignmentDetailIcon, { backgroundColor: '#3b82f6' }]}>
                        <Clock size={16} color="white" />
                      </View>
                      <View style={styles.assignmentDetailContent}>
                        <Text style={styles.assignmentDetailLabel}>Pending</Text>
                        <Text style={styles.assignmentDetailValue}>{selectedStudent.assignments.pending} assignments</Text>
                      </View>
                    </View>
                    <View style={styles.assignmentDetailItem}>
                      <View style={[styles.assignmentDetailIcon, { backgroundColor: '#ef4444' }]}>
                        <X size={16} color="white" />
                      </View>
                      <View style={styles.assignmentDetailContent}>
                        <Text style={styles.assignmentDetailLabel}>Overdue</Text>
                        <Text style={styles.assignmentDetailValue}>{selectedStudent.assignments.overdue} assignments</Text>
                      </View>
                    </View>
                  </View>
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f5f9',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1e293b',
    marginLeft: 8,
  },
  filterButton: {
    backgroundColor: '#f1f5f9',
    borderRadius: 12,
    padding: 12,
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
  section: {
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 16,
  },
  requestCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  requestInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatarPlaceholder: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#667eea',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  requestDetails: {
    flex: 1,
  },
  requestName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 2,
  },
  requestMeta: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 2,
  },
  requestDate: {
    fontSize: 12,
    color: '#94a3b8',
  },
  requestActions: {
    flexDirection: 'row',
    gap: 8,
  },
  requestButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  approveButton: {
    backgroundColor: '#10b981',
  },
  denyButton: {
    backgroundColor: '#ef4444',
  },
  studentCard: {
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
  studentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  studentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  studentDetails: {
    flex: 1,
  },
  studentName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 2,
  },
  studentId: {
    fontSize: 14,
    color: '#667eea',
    fontWeight: '600',
    marginBottom: 4,
  },
  studentMeta: {
    fontSize: 14,
    color: '#64748b',
  },
  statusContainer: {
    alignItems: 'flex-end',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginBottom: 4,
  },
  lastActive: {
    fontSize: 12,
    color: '#94a3b8',
  },
  studentStats: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 16,
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    marginBottom: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#64748b',
    fontWeight: '500',
  },
  statDivider: {
    width: 1,
    height: 32,
    backgroundColor: '#e2e8f0',
  },
  performanceIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginBottom: 4,
  },
  assignmentProgress: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  assignmentItem: {
    alignItems: 'center',
  },
  assignmentCount: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 2,
  },
  assignmentLabel: {
    fontSize: 12,
    color: '#64748b',
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
  moreButton: {
    padding: 4,
  },
  modalContent: {
    flex: 1,
    paddingTop: 20,
  },
  profileSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  profileHeader: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  avatarLarge: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#667eea',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  avatarLargeText: {
    color: 'white',
    fontSize: 32,
    fontWeight: '600',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 4,
  },
  profileId: {
    fontSize: 16,
    color: '#667eea',
    fontWeight: '600',
    marginBottom: 8,
  },
  profileDepartment: {
    fontSize: 16,
    color: '#64748b',
    marginBottom: 16,
  },
  contactInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  contactText: {
    fontSize: 14,
    color: '#64748b',
    marginLeft: 8,
  },
  quickActions: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 24,
    gap: 12,
  },
  actionButton: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#667eea',
    marginTop: 8,
  },
  performanceSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  performanceTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 16,
  },
  performanceCards: {
    flexDirection: 'row',
    gap: 12,
  },
  performanceCard: {
    flex: 1,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
  },
  performanceCardValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1e293b',
    marginTop: 8,
    marginBottom: 4,
  },
  performanceCardLabel: {
    fontSize: 12,
    color: '#64748b',
    textAlign: 'center',
  },
  assignmentDetails: {
    paddingHorizontal: 20,
  },
  assignmentDetailsTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 16,
  },
  assignmentDetailsList: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
  },
  assignmentDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  assignmentDetailIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  assignmentDetailContent: {
    flex: 1,
  },
  assignmentDetailLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 2,
  },
  assignmentDetailValue: {
    fontSize: 14,
    color: '#64748b',
  },
});
