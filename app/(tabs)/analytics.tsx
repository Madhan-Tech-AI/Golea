import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChartBar as BarChart3, Users, BookOpen, Clock, TrendingUp, TrendingDown, Calendar, Filter, Download, Eye, CircleCheck as CheckCircle, Circle as XCircle } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export default function AnalyticsScreen() {
  const [timeframe, setTimeframe] = useState('week');
  const [selectedMetric, setSelectedMetric] = useState('overview');

  const timeframes = [
    { id: 'week', label: 'This Week' },
    { id: 'month', label: 'This Month' },
    { id: 'semester', label: 'Semester' },
    { id: 'year', label: 'Academic Year' },
  ];

  const overviewStats = [
    {
      id: 'total_students',
      title: 'Total Students',
      value: '142',
      change: '+12%',
      trend: 'up',
      icon: Users,
      color: '#667eea',
      description: 'Active enrolled students',
    },
    {
      id: 'courses',
      title: 'Active Courses',
      value: '8',
      change: '+2',
      trend: 'up',
      icon: BookOpen,
      color: '#10b981',
      description: 'Currently running courses',
    },
    {
      id: 'assignments',
      title: 'Assignments',
      value: '45',
      change: '+8',
      trend: 'up',
      icon: CheckCircle,
      color: '#3b82f6',
      description: 'Active assignments',
    },
    {
      id: 'engagement',
      title: 'Avg. Engagement',
      value: '87%',
      change: '+5%',
      trend: 'up',
      icon: TrendingUp,
      color: '#f59e0b',
      description: 'Student engagement rate',
    },
  ];

  const performanceMetrics = [
    { label: 'Excellent (90-100%)', value: 45, percentage: 32, color: '#10b981' },
    { label: 'Good (80-89%)', value: 52, percentage: 37, color: '#3b82f6' },
    { label: 'Average (70-79%)', value: 28, percentage: 20, color: '#f59e0b' },
    { label: 'Below Average (<70%)', value: 17, percentage: 11, color: '#ef4444' },
  ];

  const attendanceData = [
    { course: 'Data Structures', attendance: 92, students: 35 },
    { course: 'Web Development', attendance: 88, students: 42 },
    { course: 'Database Systems', attendance: 95, students: 28 },
    { course: 'Mobile App Dev', attendance: 85, students: 37 },
  ];

  const recentActivity = [
    { type: 'submission', student: 'John Doe', course: 'Data Structures', time: '15 mins ago', status: 'completed' },
    { type: 'quiz', student: 'Emma Wilson', course: 'Web Development', time: '1 hour ago', status: 'completed' },
    { type: 'assignment', student: 'Mike Chen', course: 'Database Systems', time: '2 hours ago', status: 'submitted' },
    { type: 'late_submission', student: 'Sarah Johnson', course: 'Mobile App Dev', time: '3 hours ago', status: 'overdue' },
  ];

  const topPerformers = [
    { name: 'Michael Chen', id: 'STU003', gpa: 3.9, courses: 4, badges: 12 },
    { name: 'John Doe', id: 'STU001', gpa: 3.8, courses: 6, badges: 8 },
    { name: 'Emma Wilson', id: 'STU002', gpa: 3.6, courses: 5, badges: 6 },
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'submission': return CheckCircle;
      case 'quiz': return BookOpen;
      case 'assignment': return Clock;
      case 'late_submission': return XCircle;
      default: return Clock;
    }
  };

  const getActivityColor = (status: string) => {
    switch (status) {
      case 'completed': return '#10b981';
      case 'submitted': return '#3b82f6';
      case 'overdue': return '#ef4444';
      default: return '#64748b';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Analytics Dashboard</Text>
          <Text style={styles.headerSubtitle}>Track student performance and engagement</Text>
          
          {/* Timeframe Selector */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.timeframeContainer}
            contentContainerStyle={styles.timeframeContent}
          >
            {timeframes.map((tf) => (
              <TouchableOpacity
                key={tf.id}
                style={[
                  styles.timeframeButton,
                  timeframe === tf.id && styles.timeframeButtonActive
                ]}
                onPress={() => setTimeframe(tf.id)}
              >
                <Text
                  style={[
                    styles.timeframeText,
                    timeframe === tf.id && styles.timeframeTextActive
                  ]}
                >
                  {tf.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.actionButton}>
              <Filter size={18} color="#667eea" />
              <Text style={styles.actionButtonText}>Filter</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Download size={18} color="#667eea" />
              <Text style={styles.actionButtonText}>Export</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Overview Stats */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Overview</Text>
          <View style={styles.statsGrid}>
            {overviewStats.map((stat) => (
              <TouchableOpacity key={stat.id} style={styles.statCard}>
                <LinearGradient
                  colors={[stat.color + '15', stat.color + '05']}
                  style={styles.statCardGradient}
                >
                  <View style={styles.statHeader}>
                    <View style={[styles.statIcon, { backgroundColor: stat.color }]}>
                      <stat.icon size={20} color="white" />
                    </View>
                    <View style={styles.statTrend}>
                      {stat.trend === 'up' ? (
                        <TrendingUp size={16} color="#10b981" />
                      ) : (
                        <TrendingDown size={16} color="#ef4444" />
                      )}
                      <Text style={[styles.statChange, { color: stat.trend === 'up' ? '#10b981' : '#ef4444' }]}>
                        {stat.change}
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.statValue}>{stat.value}</Text>
                  <Text style={styles.statTitle}>{stat.title}</Text>
                  <Text style={styles.statDescription}>{stat.description}</Text>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Performance Distribution */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Performance Distribution</Text>
          <View style={styles.performanceChart}>
            {performanceMetrics.map((metric, index) => (
              <View key={index} style={styles.performanceItem}>
                <View style={styles.performanceInfo}>
                  <View style={styles.performanceLegend}>
                    <View style={[styles.performanceDot, { backgroundColor: metric.color }]} />
                    <Text style={styles.performanceLabel}>{metric.label}</Text>
                  </View>
                  <Text style={styles.performanceValue}>{metric.value} students</Text>
                </View>
                <View style={styles.performanceBarContainer}>
                  <View
                    style={[
                      styles.performanceBar,
                      {
                        width: `${metric.percentage}%`,
                        backgroundColor: metric.color,
                      }
                    ]}
                  />
                </View>
                <Text style={styles.performancePercentage}>{metric.percentage}%</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Attendance Overview */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Course Attendance</Text>
          <View style={styles.attendanceList}>
            {attendanceData.map((course, index) => (
              <View key={index} style={styles.attendanceItem}>
                <View style={styles.attendanceInfo}>
                  <Text style={styles.attendanceCourseName}>{course.course}</Text>
                  <Text style={styles.attendanceStudentCount}>{course.students} students</Text>
                </View>
                <View style={styles.attendanceMetrics}>
                  <View style={styles.attendanceBarContainer}>
                    <View
                      style={[
                        styles.attendanceBar,
                        {
                          width: `${course.attendance}%`,
                          backgroundColor: course.attendance >= 90 ? '#10b981' : course.attendance >= 80 ? '#3b82f6' : '#f59e0b',
                        }
                      ]}
                    />
                  </View>
                  <Text style={styles.attendancePercentage}>{course.attendance}%</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Top Performers */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Top Performers</Text>
          <View style={styles.performersList}>
            {topPerformers.map((student, index) => (
              <TouchableOpacity key={index} style={styles.performerCard}>
                <View style={styles.performerRank}>
                  <Text style={styles.performerRankText}>{index + 1}</Text>
                </View>
                <View style={styles.performerInfo}>
                  <Text style={styles.performerName}>{student.name}</Text>
                  <Text style={styles.performerId}>{student.id}</Text>
                </View>
                <View style={styles.performerStats}>
                  <View style={styles.performerStat}>
                    <Text style={styles.performerStatValue}>{student.gpa}</Text>
                    <Text style={styles.performerStatLabel}>GPA</Text>
                  </View>
                  <View style={styles.performerStat}>
                    <Text style={styles.performerStatValue}>{student.courses}</Text>
                    <Text style={styles.performerStatLabel}>Courses</Text>
                  </View>
                  <View style={styles.performerStat}>
                    <Text style={styles.performerStatValue}>{student.badges}</Text>
                    <Text style={styles.performerStatLabel}>Badges</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Recent Activity */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <View style={styles.activityList}>
            {recentActivity.map((activity, index) => {
              const IconComponent = getActivityIcon(activity.type);
              return (
                <TouchableOpacity key={index} style={styles.activityItem}>
                  <View style={[styles.activityIcon, { backgroundColor: getActivityColor(activity.status) + '15' }]}>
                    <IconComponent size={16} color={getActivityColor(activity.status)} />
                  </View>
                  <View style={styles.activityContent}>
                    <Text style={styles.activityText}>
                      <Text style={styles.activityStudent}>{activity.student}</Text>
                      {' '}
                      {activity.type === 'submission' ? 'submitted assignment in' :
                       activity.type === 'quiz' ? 'completed quiz in' :
                       activity.type === 'assignment' ? 'submitted assignment in' :
                       activity.type === 'late_submission' ? 'late submission in' : 'activity in'}
                      {' '}
                      <Text style={styles.activityCourse}>{activity.course}</Text>
                    </Text>
                    <Text style={styles.activityTime}>{activity.time}</Text>
                  </View>
                  <View style={[styles.activityStatus, { backgroundColor: getActivityColor(activity.status) }]} />
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>
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
    paddingBottom: 20,
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
  timeframeContainer: {
    marginHorizontal: -20,
    marginBottom: 20,
  },
  timeframeContent: {
    paddingHorizontal: 20,
  },
  timeframeButton: {
    backgroundColor: '#f1f5f9',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
  },
  timeframeButtonActive: {
    backgroundColor: '#667eea',
  },
  timeframeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748b',
  },
  timeframeTextActive: {
    color: 'white',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f5f9',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 6,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#667eea',
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
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
  },
  statCard: {
    width: (width - 60) / 2,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  statCardGradient: {
    padding: 20,
  },
  statHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  statIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statTrend: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statChange: {
    fontSize: 12,
    fontWeight: '600',
  },
  statValue: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1e293b',
    marginBottom: 4,
  },
  statTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 4,
  },
  statDescription: {
    fontSize: 12,
    color: '#64748b',
  },
  performanceChart: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  performanceItem: {
    marginBottom: 20,
  },
  performanceInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  performanceLegend: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  performanceDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  performanceLabel: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '500',
  },
  performanceValue: {
    fontSize: 14,
    color: '#1e293b',
    fontWeight: '600',
  },
  performanceBarContainer: {
    height: 8,
    backgroundColor: '#f1f5f9',
    borderRadius: 4,
    marginBottom: 4,
    overflow: 'hidden',
  },
  performanceBar: {
    height: '100%',
    borderRadius: 4,
  },
  performancePercentage: {
    fontSize: 12,
    color: '#64748b',
    textAlign: 'right',
  },
  attendanceList: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  attendanceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  attendanceInfo: {
    flex: 1,
  },
  attendanceCourseName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 2,
  },
  attendanceStudentCount: {
    fontSize: 12,
    color: '#64748b',
  },
  attendanceMetrics: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  attendanceBarContainer: {
    flex: 1,
    height: 6,
    backgroundColor: '#f1f5f9',
    borderRadius: 3,
    overflow: 'hidden',
  },
  attendanceBar: {
    height: '100%',
    borderRadius: 3,
  },
  attendancePercentage: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
    minWidth: 40,
    textAlign: 'right',
  },
  performersList: {
    gap: 12,
  },
  performerCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  performerRank: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#667eea',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  performerRankText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
  },
  performerInfo: {
    flex: 1,
  },
  performerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 2,
  },
  performerId: {
    fontSize: 14,
    color: '#64748b',
  },
  performerStats: {
    flexDirection: 'row',
    gap: 16,
  },
  performerStat: {
    alignItems: 'center',
  },
  performerStatValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 2,
  },
  performerStatLabel: {
    fontSize: 12,
    color: '#64748b',
  },
  activityList: {
    gap: 12,
  },
  activityItem: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  activityIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityText: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 2,
  },
  activityStudent: {
    fontWeight: '600',
    color: '#1e293b',
  },
  activityCourse: {
    fontWeight: '600',
    color: '#667eea',
  },
  activityTime: {
    fontSize: 12,
    color: '#94a3b8',
  },
  activityStatus: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});

