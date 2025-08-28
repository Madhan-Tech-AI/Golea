import { Tabs } from 'expo-router';
import { useAuthStore } from '@/stores/authStore';
import { Home, Users, BookOpen, Calendar, MessageCircle, User, Upload, BarChart3, CheckSquare, Settings } from 'lucide-react-native';

export default function TabLayout() {
  const { user } = useAuthStore();
  const isFaculty = user?.role === 'faculty';

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#6366f1',
        tabBarInactiveTintColor: '#64748b',
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopWidth: 1,
          borderTopColor: '#e2e8f0',
          height: 85,
          paddingBottom: 10,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ size, color }) => (
            <Home size={size} color={color} />
          ),
        }}
      />
      
      {isFaculty ? (
        <>
          <Tabs.Screen
            name="upload"
            options={{
              title: 'Upload',
              tabBarIcon: ({ size, color }) => (
                <Upload size={size} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="students"
            options={{
              title: 'Students',
              tabBarIcon: ({ size, color }) => (
                <Users size={size} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="analytics"
            options={{
              title: 'Analytics',
              tabBarIcon: ({ size, color }) => (
                <BarChart3 size={size} color={color} />
              ),
            }}
          />
        </>
      ) : (
        <>
          <Tabs.Screen
            name="courses"
            options={{
              title: 'Courses',
              tabBarIcon: ({ size, color }) => (
                <BookOpen size={size} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="assignments"
            options={{
              title: 'Tasks',
              tabBarIcon: ({ size, color }) => (
                <CheckSquare size={size} color={color} />
              ),
            }}
          />
        </>
      )}
      
      <Tabs.Screen
        name="calendar"
        options={{
          title: 'Calendar',
          tabBarIcon: ({ size, color }) => (
            <Calendar size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: 'Chat',
          tabBarIcon: ({ size, color }) => (
            <MessageCircle size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ size, color }) => (
            <User size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}