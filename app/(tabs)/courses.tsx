import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput, Dimensions, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, Filter, BookOpen, Plus, Users, Clock, Star } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export default function CoursesScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [courses, setCourses] = useState<any[]>([]);

  const categories = [
    { id: 'all', label: 'All Courses' },
    { id: 'programming', label: 'Programming' },
    { id: 'design', label: 'Design' },
    { id: 'mathematics', label: 'Mathematics' },
    { id: 'science', label: 'Science' },
  ];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleCreateCourse = () => {
    Alert.alert('Create Course', 'Course creation feature coming soon!');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View>
              <Text style={styles.headerTitle}>Courses</Text>
              <Text style={styles.headerSubtitle}>Explore and manage your learning</Text>
            </View>
            <TouchableOpacity style={styles.addButton} onPress={handleCreateCourse}>
              <Plus size={20} color="#667eea" />
            </TouchableOpacity>
          </View>
          
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
              <Filter size={20} color="#667eea" />
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

        {/* Empty State */}
        {filteredCourses.length === 0 && (
          <View style={styles.emptyState}>
            <LinearGradient
              colors={['#667eea15', '#667eea05']}
              style={styles.emptyStateCard}
            >
              <BookOpen size={64} color="#667eea" />
              <Text style={styles.emptyStateTitle}>No Courses Yet</Text>
              <Text style={styles.emptyStateText}>
                {searchQuery 
                  ? 'No courses match your search criteria' 
                  : 'Start by creating or enrolling in courses'
                }
              </Text>
              <TouchableOpacity style={styles.emptyStateButton} onPress={handleCreateCourse}>
                <LinearGradient
                  colors={['#667eea', '#764ba2']}
                  style={styles.emptyStateButtonGradient}
                >
                  <Plus size={20} color="white" />
                  <Text style={styles.emptyStateButtonText}>Get Started</Text>
                </LinearGradient>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        )}

        {/* Courses List */}
        {filteredCourses.length > 0 && (
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
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}

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
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
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
  addButton: {
    backgroundColor: '#f1f5f9',
    borderRadius: 12,
    padding: 12,
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
    backgroundColor: '#667eea',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748b',
  },
  categoryTextActive: {
    color: 'white',
  },
  emptyState: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 60,
  },
  emptyStateCard: {
    borderRadius: 24,
    padding: 40,
    alignItems: 'center',
  },
  emptyStateTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1e293b',
    marginTop: 20,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
  },
  emptyStateButton: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  emptyStateButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    gap: 8,
  },
  emptyStateButtonText: {
    fontSize: 16,
    fontWeight: '700',
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
  courseStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
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
});
