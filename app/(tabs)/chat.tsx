import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput, Alert, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MessageCircle, Send, Search, Plus, Users } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export default function ChatScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [chats, setChats] = useState<any[]>([]);

  const handleNewChat = () => {
    Alert.alert('New Chat', 'Chat creation feature coming soon!');
  };

  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View>
              <Text style={styles.headerTitle}>Messages</Text>
              <Text style={styles.headerSubtitle}>Connect with instructors and peers</Text>
            </View>
            <TouchableOpacity style={styles.addButton} onPress={handleNewChat}>
              <Plus size={20} color="#667eea" />
            </TouchableOpacity>
          </View>
          
          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <View style={styles.searchBar}>
              <Search size={20} color="#64748b" />
              <TextInput
                style={styles.searchInput}
                placeholder="Search conversations..."
                placeholderTextColor="#94a3b8"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>
          </View>
        </View>

        {/* Empty State */}
        <View style={styles.emptyState}>
          <LinearGradient
            colors={['#667eea15', '#667eea05']}
            style={styles.emptyStateCard}
          >
            <MessageCircle size={64} color="#667eea" />
            <Text style={styles.emptyStateTitle}>No Messages Yet</Text>
            <Text style={styles.emptyStateText}>
              Start conversations with your instructors and classmates to collaborate and get help.
            </Text>
            <TouchableOpacity style={styles.emptyStateButton} onPress={handleNewChat}>
              <LinearGradient
                colors={['#667eea', '#764ba2']}
                style={styles.emptyStateButtonGradient}
              >
                <Plus size={20} color="white" />
                <Text style={styles.emptyStateButtonText}>Start Chatting</Text>
              </LinearGradient>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </View>
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
    color: '#1e293b',
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
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f5f9',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1e293b',
    marginLeft: 8,
  },
  emptyState: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 60,
    justifyContent: 'center',
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
});
