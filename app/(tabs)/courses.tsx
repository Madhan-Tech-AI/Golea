import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, Filter, BookOpen, Clock, Users, Star, Play, Download, Eye } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export default function CoursesScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Courses' },
    { id: 'programming', label: 'Programming' },
    { id: 'design', label: 'Design' },
    { id: 'mathematics', label: 'Mathematics' },
    { id: 'science', label: 'Science' },
  ];

  const courses = [
    {
      id: 1,
      title: 'Advanced Data Structures',
      instructor: 'Dr. Sarah Johnson',
      category: 'programming',
      progress: 75,
      totalLessons: 24,
      completedLessons: 18,
      duration: '8 weeks',
      rating: 4.8,
      students: 156,
      color: '#3b82f6',
      description: 'Deep dive into advanced data structures and algorithms',
      nextLesson: 'Binary Trees Implementation',
    },
    {
      id: 2,
      title: 'Web Development Fundamentals',
      instructor: 'Prof. Mike Chen',
      category: 'programming',
      progress: 45,
      totalLessons: 32,
      completedLessons: 14,
      duration: '12 weeks',
      rating: 4.9,
      students: 203,
      color: '#10b981',
      description: 'Complete guide to modern web development',
      nextLesson: 'React Components',
    },
    {
      id: 3,
      title: 'Database Design & Management',
      instructor: 'Dr. Emma Davis',
      category: 'programming',
      progress: 60,
      totalLessons: 20,
      completedLessons: 12,
      duration: '6 weeks',
      rating: 4.7,
      students: 89,
      color: '#8b5cf6',
      description: 'Master database concepts and SQL',
      nextLesson: 'Advanced SQL Queries',
    },
    {
      id: 4,
      title: 'UI/UX Design Principles',
      instructor: 'Prof. Alex Wilson',
      category: 'design',
      progress: 30,
      totalLessons: 28,
      completedLessons: 8,
      duration: '10 weeks',
      rating: 4.6,
      students: 134,
      color: '#f59e0b',
      description: 'Learn modern design principles and practices',
      nextLesson: 'Color Theory',
    },
  ];

  const recentActivity = [
    { id: 1, type: 'lesson', title: 'Hash Tables Implementation', course: 'Advanced Data Structures', time: '2 hours ago' },
    { id: 2, type: 'assignment', title: 'Web Portfolio Project', course: 'Web Development', time: '5 hours ago' },
    { id: 3, type: 'quiz', title: 'SQL Basics Quiz', course: 'Database Design', time: '1 day ago' },
  ];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>My Courses</Text>
          <Text style={styles.headerSubtitle}>Continue your learning journey</Text>
          
          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <View style={styles.searchBar}>
              <Search size={20} color="#64748b" />
              <TextInput
                style={styles.searchInput}
                placeholder="Search courses..."
                placeholderTextColor="#94a3b8"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>
            <TouchableOpacity style={styles.filterButton}>
              <Filter size={20} color="#6366f1" />
            </TouchableOpacity>
          </View>

          {/* Categories */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.categoriesContainer}
            contentContainerStyle={styles.categoriesContent}
          >
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryButton,
                  selectedCategory === category.id && styles.categoryButtonActive
                ]}
                onPress={() => setSelectedCategory(category.id)}
              >
                <Text
                  style={[
                    styles.categoryText,
                    selectedCategory === category.id && styles.categoryTextActive
                  ]}
                >
                  {category.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Courses Grid */}
        <View style={styles.coursesSection}>
          <Text style={styles.sectionTitle}>
            {selectedCategory === 'all' ? 'All Courses' : categories.find(c => c.id === selectedCategory)?.label}
          </Text>
          {filteredCourses.map((course) => (
            <TouchableOpacity key={course.id} style={styles.courseCard}>
              <LinearGradient
                colors={[course.color + '15', course.color + '05']}
                style={styles.courseHeader}
              >
                <View style={styles.courseInfo}>
                  <Text style={styles.courseTitle}>{course.title}</Text>
                  <Text style={styles.courseInstructor}>{course.instructor}</Text>
                  <Text style={styles.courseDescription}>{course.description}</Text>
                </View>
                <View style={[styles.courseIconContainer, { backgroundColor: course.color }]}>
                  <BookOpen size={24} color="white" />
                </View>
              </LinearGradient>
              
              <View style={styles.courseContent}>
                {/* Progress */}
                <View style={styles.progressContainer}>
                  <Text style={styles.progressText}>
                    {course.completedLessons}/{course.totalLessons} lessons completed
                  </Text>
                  <View style={styles.progressBar}>
                    <View style={[styles.progressFill, { width: `${course.progress}%`, backgroundColor: course.color }]} />
                  </View>
                  <Text style={styles.progressPercentage}>{course.progress}%</Text>
                </View>

                {/* Course Stats */}
                <View style={styles.courseStats}>
                  <View style={styles.statItem}>
                    <Clock size={16} color="#64748b" />
                    <Text style={styles.statText}>{course.duration}</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Users size={16} color="#64748b" />
                    <Text style={styles.statText}>{course.students}</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Star size={16} color="#fbbf24" />
                    <Text style={styles.statText}>{course.rating}</Text>
                  </View>
                </View>

                {/* Next Lesson */}
                <View style={styles.nextLesson}>
                  <View style={styles.nextLessonContent}>
                    <Text style={styles.nextLessonLabel}>Next Lesson:</Text>
                    <Text style={styles.nextLessonTitle}>{course.nextLesson}</Text>
                  </View>
                  <TouchableOpacity style={[styles.playButton, { backgroundColor: course.color }]}>
                    <Play size={16} color="white" />
                  </TouchableOpacity>
                </View>

                {/* Actions */}
                <View style={styles.courseActions}>
                  <TouchableOpacity style={styles.actionButton}>
                    <Download size={18} color="#64748b" />
                    <Text style={styles.actionText}>Download</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.actionButton}>
                    <Eye size={18} color="#64748b" />
                    <Text style={styles.actionText}>Preview</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Recent Activity */}
        <View style={styles.activitySection}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          {recentActivity.map((activity) => (
            <TouchableOpacity key={activity.id} style={styles.activityCard}>
              <View style={styles.activityIcon}>
                <View style={[styles.activityDot, { backgroundColor: getActivityColor(activity.type) }]} />
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>{activity.title}</Text>
                <Text style={styles.activityMeta}>{activity.course} • {activity.time}</Text>
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
    case 'lesson': return '#3b82f6';
    case 'assignment': return '#10b981';
    case 'quiz': return '#f59e0b';
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
    paddingBottom: 16,
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
    color: '#0f172a',
    marginLeft: 8,
  },
  filterButton: {
    backgroundColor: '#f1f5f9',
    borderRadius: 12,
    padding: 12,
  },
  categoriesContainer: {
    marginHorizontal: -20,
  },
  categoriesContent: {
    paddingHorizontal: 20,
  },
  categoryButton: {
    backgroundColor: '#f1f5f9',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
  },
  categoryButtonActive: {
    backgroundColor: '#6366f1',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748b',
  },
  categoryTextActive: {
    color: 'white',
  },
  coursesSection: {
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 16,
  },
  courseCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    overflow: 'hidden',
  },
  courseHeader: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  courseInfo: {
    flex: 1,
    marginRight: 16,
  },
  courseTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 4,
  },
  courseInstructor: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '500',
    marginBottom: 8,
  },
  courseDescription: {
    fontSize: 14,
    color: '#64748b',
  },
  courseIconContainer: {
    borderRadius: 12,
    padding: 12,
  },
  courseContent: {
    padding: 20,
    paddingTop: 0,
  },
  progressContainer: {
    marginBottom: 20,
  },
  progressText: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 8,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#f1f5f9',
    borderRadius: 3,
    marginBottom: 4,
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  progressPercentage: {
    fontSize: 12,
    color: '#64748b',
    textAlign: 'right',
  },
  courseStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    paddingVertical: 16,
    backgroundColor: '#f8fafc',
    borderRadius: 12,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    fontSize: 14,
    color: '#64748b',
    marginLeft: 4,
    fontWeight: '500',
  },
  nextLesson: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f8fafc',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  nextLessonContent: {
    flex: 1,
  },
  nextLessonLabel: {
    fontSize: 12,
    color: '#64748b',
    marginBottom: 2,
  },
  nextLessonTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f172a',
  },
  playButton: {
    borderRadius: 20,
    padding: 10,
  },
  courseActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  actionText: {
    fontSize: 14,
    color: '#64748b',
    marginLeft: 4,
    fontWeight: '500',
  },
  activitySection: {
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