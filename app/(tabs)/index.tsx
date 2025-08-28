import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Dimensions, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthStore } from '@/stores/authStore';
import { Bell, Calendar, Clock, TrendingUp, Users, BookOpen, Award, Target } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const { user } = useAuthStore();
  const [refreshing, setRefreshing] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  };

  const facultyStats = [
    { label: 'Total Students', value: '142', icon: Users, color: '#3b82f6' },
    { label: 'Active Courses', value: '8', icon: BookOpen, color: '#10b981' },
    { label: 'Pending Reviews', value: '23', icon: Clock, color: '#f59e0b' },
    { label: 'This Month', value: '+12%', icon: TrendingUp, color: '#8b5cf6' },
  ];

  const studentStats = [
    { label: 'Courses Enrolled', value: '6', icon: BookOpen, color: '#3b82f6' },
    { label: 'Completed Tasks', value: '18', icon: Target, color: '#10b981' },
    { label: 'Pending Tasks', value: '4', icon: Clock, color: '#f59e0b' },
    { label: 'Achievement Score', value: '87%', icon: Award, color: '#8b5cf6' },
  ];

  const stats = user?.role === 'faculty' ? facultyStats : studentStats;

  const recentActivities = user?.role === 'faculty' ? [
    { id: 1, title: 'New assignment submitted', student: 'John Doe', time: '2 mins ago', type: 'submission' },
    { id: 2, title: 'Quiz completed', student: 'Sarah Wilson', time: '15 mins ago', type: 'quiz' },
    { id: 3, title: 'Question posted in forum', student: 'Mike Chen', time: '1 hour ago', type: 'forum' },
    { id: 4, title: 'Assignment graded', student: 'Emma Davis', time: '2 hours ago', type: 'grade' },
  ] : [
    { id: 1, title: 'New material uploaded', course: 'Data Structures', time: '30 mins ago', type: 'material' },
    { id: 2, title: 'Assignment due tomorrow', course: 'Web Development', time: '2 hours ago', type: 'deadline' },
    { id: 3, title: 'Quiz available now', course: 'Database Systems', time: '4 hours ago', type: 'quiz' },
    { id: 4, title: 'Grade published', course: 'Mobile App Dev', time: '1 day ago', type: 'grade' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#6366f1" />
        }
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <View>
              <Text style={styles.greeting}>Good morning,</Text>
              <Text style={styles.userName}>{user?.name || 'User'}</Text>
              <Text style={styles.role}>{user?.role === 'faculty' ? 'Faculty Member' : 'Student'}</Text>
            </View>
            <TouchableOpacity style={styles.notificationButton}>
              <Bell size={24} color="#64748b" />
              <View style={styles.notificationBadge}>
                <Text style={styles.badgeText}>3</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.timeContainer}>
            <Text style={styles.currentTime}>
              {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </Text>
            <Text style={styles.currentDate}>
              {currentTime.toLocaleDateString([], { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </Text>
          </View>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <Text style={styles.sectionTitle}>Overview</Text>
          <View style={styles.statsGrid}>
            {stats.map((stat, index) => (
              <TouchableOpacity key={index} style={styles.statCard}>
                <LinearGradient
                  colors={[stat.color + '15', stat.color + '05']}
                  style={styles.statIconContainer}
                >
                  <stat.icon size={20} color={stat.color} />
                </LinearGradient>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionGrid}>
            {user?.role === 'faculty' ? (
              <>
                <TouchableOpacity style={[styles.actionCard, { backgroundColor: '#3b82f6' }]}>
                  <Users size={24} color="white" />
                  <Text style={styles.actionText}>Manage Students</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.actionCard, { backgroundColor: '#10b981' }]}>
                  <BookOpen size={24} color="white" />
                  <Text style={styles.actionText}>Upload Content</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.actionCard, { backgroundColor: '#f59e0b' }]}>
                  <Target size={24} color="white" />
                  <Text style={styles.actionText}>Create Quiz</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.actionCard, { backgroundColor: '#8b5cf6' }]}>
                  <Calendar size={24} color="white" />
                  <Text style={styles.actionText}>Schedule Class</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <TouchableOpacity style={[styles.actionCard, { backgroundColor: '#3b82f6' }]}>
                  <BookOpen size={24} color="white" />
                  <Text style={styles.actionText}>Browse Courses</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.actionCard, { backgroundColor: '#10b981' }]}>
                  <Target size={24} color="white" />
                  <Text style={styles.actionText}>Take Quiz</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.actionCard, { backgroundColor: '#f59e0b' }]}>
                  <Clock size={24} color="white" />
                  <Text style={styles.actionText}>Submit Work</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.actionCard, { backgroundColor: '#8b5cf6' }]}>
                  <Calendar size={24} color="white" />
                  <Text style={styles.actionText}>View Schedule</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>

        {/* Recent Activity */}
        <View style={styles.activityContainer}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          {recentActivities.map((activity) => (
            <TouchableOpacity key={activity.id} style={styles.activityCard}>
              <View style={styles.activityIcon}>
                <View style={[styles.activityDot, { backgroundColor: getActivityColor(activity.type) }]} />
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>{activity.title}</Text>
                <Text style={styles.activityMeta}>
                  {user?.role === 'faculty' ? activity.student : activity.course} • {activity.time}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const getActivityColor = (type: string) => {
  switch (type) {
    case 'submission': return '#3b82f6';
    case 'quiz': return '#10b981';
    case 'forum': return '#f59e0b';
    case 'grade': return '#8b5cf6';
    case 'material': return '#06b6d4';
    case 'deadline': return '#ef4444';
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
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  greeting: {
    fontSize: 16,
    color: '#64748b',
    fontWeight: '500',
  },
  userName: {
    fontSize: 28,
    fontWeight: '700',
    color: '#0f172a',
    marginTop: 2,
  },
  role: {
    fontSize: 14,
    color: '#6366f1',
    fontWeight: '600',
    marginTop: 2,
  },
  notificationButton: {
    position: 'relative',
    padding: 8,
  },
  notificationBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: '#ef4444',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  timeContainer: {
    alignItems: 'center',
  },
  currentTime: {
    fontSize: 32,
    fontWeight: '700',
    color: '#0f172a',
  },
  currentDate: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 2,
  },
  statsContainer: {
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
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
  statIconContainer: {
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#64748b',
    textAlign: 'center',
    fontWeight: '500',
  },
  quickActions: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  actionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionCard: {
    borderRadius: 16,
    padding: 20,
    width: (width - 60) / 2,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  actionText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 8,
    textAlign: 'center',
  },
  activityContainer: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  activityCard: {
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
  activityIcon: {
    marginRight: 16,
  },
  activityDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 2,
  },
  activityMeta: {
    fontSize: 14,
    color: '#64748b',
  },
});