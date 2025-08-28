import React, { useState, useRef, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput, Modal, KeyboardAvoidingView, Platform, Dimensions, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MessageCircle, Send, Search, Users, Phone, Video, MoveVertical as MoreVertical, Paperclip, Smile, Plus, Hash, Bell, X, Check, CheckCheck } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export default function ChatScreen() {
  const [selectedChat, setSelectedChat] = useState<any>(null);
  const [message, setMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showChatModal, setShowChatModal] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  const chats = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      role: 'Faculty',
      course: 'Data Structures',
      lastMessage: 'The assignment deadline has been extended to Friday',
      timestamp: '2m ago',
      unread: 2,
      online: true,
      type: 'direct',
      avatar: null,
    },
    {
      id: 2,
      name: 'CS Students - Year 3',
      role: 'Group',
      course: 'Computer Science',
      lastMessage: 'John: Anyone have notes from yesterday\'s lecture?',
      timestamp: '15m ago',
      unread: 5,
      online: false,
      type: 'group',
      avatar: null,
      members: 45,
    },
    {
      id: 3,
      name: 'Prof. Mike Chen',
      role: 'Faculty',
      course: 'Web Development',
      lastMessage: 'Great work on the React project!',
      timestamp: '1h ago',
      unread: 0,
      online: false,
      type: 'direct',
      avatar: null,
    },
    {
      id: 4,
      name: 'Mobile App Dev Team',
      role: 'Group',
      course: 'Project Team',
      lastMessage: 'Emma: Meeting tomorrow at 2 PM',
      timestamp: '3h ago',
      unread: 1,
      online: false,
      type: 'group',
      avatar: null,
      members: 6,
    },
  ];

  const messages = [
    {
      id: 1,
      senderId: 'faculty_1',
      senderName: 'Dr. Sarah Johnson',
      message: 'Hi everyone! I hope you\'re all doing well.',
      timestamp: '2024-01-16 09:00',
      type: 'text',
      status: 'delivered',
      isMe: false,
    },
    {
      id: 2,
      senderId: 'me',
      senderName: 'You',
      message: 'Good morning Dr. Johnson! Thank you for the update.',
      timestamp: '2024-01-16 09:05',
      type: 'text',
      status: 'read',
      isMe: true,
    },
    {
      id: 3,
      senderId: 'faculty_1',
      senderName: 'Dr. Sarah Johnson',
      message: 'I wanted to let you know that I\'ve uploaded the new lecture materials to the course portal.',
      timestamp: '2024-01-16 09:10',
      type: 'text',
      status: 'delivered',
      isMe: false,
    },
    {
      id: 4,
      senderId: 'me',
      senderName: 'You',
      message: 'Perfect! I\'ll check them out right away.',
      timestamp: '2024-01-16 09:12',
      type: 'text',
      status: 'read',
      isMe: true,
    },
    {
      id: 5,
      senderId: 'faculty_1',
      senderName: 'Dr. Sarah Johnson',
      message: 'The assignment deadline has been extended to Friday. Please make sure to submit your work on time.',
      timestamp: '2024-01-16 14:30',
      type: 'text',
      status: 'delivered',
      isMe: false,
    },
  ];

  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chat.course.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatTime = (timestamp: string) => {
    // If it's already a relative time (like "2m ago"), return it
    if (timestamp.includes('ago') || timestamp.includes('now')) {
      return timestamp;
    }
    
    // Parse absolute timestamp
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    
    if (diffMins < 1) return 'now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const sendMessage = () => {
    if (message.trim()) {
      console.log('Sending message:', message);
      setMessage('');
      // Scroll to bottom after sending
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  };

  const openChat = (chat: any) => {
    setSelectedChat(chat);
    setShowChatModal(true);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'sent': return <Check size={14} color="#94a3b8" />;
      case 'delivered': return <CheckCheck size={14} color="#94a3b8" />;
      case 'read': return <CheckCheck size={14} color="#667eea" />;
      default: return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Messages</Text>
          <Text style={styles.headerSubtitle}>Stay connected with your instructors and peers</Text>
          
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
            <TouchableOpacity style={styles.newChatButton}>
              <Plus size={20} color="#667eea" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Chat List */}
        <FlatList
          data={filteredChats}
          style={styles.chatList}
          contentContainerStyle={styles.chatListContent}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item: chat }) => (
            <TouchableOpacity
              style={styles.chatItem}
              onPress={() => openChat(chat)}
            >
              <View style={styles.chatAvatarContainer}>
                <LinearGradient
                  colors={chat.type === 'group' ? ['#667eea', '#764ba2'] : ['#10b981', '#059669']}
                  style={styles.chatAvatar}
                >
                  {chat.type === 'group' ? (
                    <Users size={20} color="white" />
                  ) : (
                    <Text style={styles.avatarText}>{chat.name.charAt(0)}</Text>
                  )}
                </LinearGradient>
                {chat.online && chat.type === 'direct' && (
                  <View style={styles.onlineIndicator} />
                )}
              </View>

              <View style={styles.chatContent}>
                <View style={styles.chatHeader}>
                  <Text style={styles.chatName} numberOfLines={1}>{chat.name}</Text>
                  <View style={styles.chatMeta}>
                    <Text style={styles.chatTimestamp}>{chat.timestamp}</Text>
                    {chat.unread > 0 && (
                      <View style={styles.unreadBadge}>
                        <Text style={styles.unreadText}>{chat.unread}</Text>
                      </View>
                    )}
                  </View>
                </View>
                <View style={styles.chatSubInfo}>
                  <Text style={styles.chatRole}>{chat.type === 'group' ? `${chat.members} members` : chat.role}</Text>
                  <Text style={styles.chatCourse}> • {chat.course}</Text>
                </View>
                <Text style={styles.lastMessage} numberOfLines={1}>
                  {chat.lastMessage}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Chat Modal */}
      <Modal
        visible={showChatModal}
        animationType="slide"
        presentationStyle="fullScreen"
      >
        <SafeAreaView style={styles.modalContainer}>
          {selectedChat && (
            <>
              {/* Chat Header */}
              <View style={styles.chatModalHeader}>
                <TouchableOpacity
                  onPress={() => setShowChatModal(false)}
                  style={styles.backButton}
                >
                  <X size={24} color="#64748b" />
                </TouchableOpacity>
                
                <View style={styles.chatModalInfo}>
                  <LinearGradient
                    colors={selectedChat.type === 'group' ? ['#667eea', '#764ba2'] : ['#10b981', '#059669']}
                    style={styles.chatModalAvatar}
                  >
                    {selectedChat.type === 'group' ? (
                      <Users size={16} color="white" />
                    ) : (
                      <Text style={styles.chatModalAvatarText}>{selectedChat.name.charAt(0)}</Text>
                    )}
                  </LinearGradient>
                  <View style={styles.chatModalDetails}>
                    <Text style={styles.chatModalName} numberOfLines={1}>{selectedChat.name}</Text>
                    <Text style={styles.chatModalStatus}>
                      {selectedChat.type === 'group' 
                        ? `${selectedChat.members} members` 
                        : selectedChat.online ? 'Online' : 'Last seen recently'
                      }
                    </Text>
                  </View>
                </View>

                <View style={styles.chatModalActions}>
                  {selectedChat.type === 'direct' && (
                    <>
                      <TouchableOpacity style={styles.chatActionButton}>
                        <Phone size={20} color="#667eea" />
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.chatActionButton}>
                        <Video size={20} color="#667eea" />
                      </TouchableOpacity>
                    </>
                  )}
                  <TouchableOpacity style={styles.chatActionButton}>
                    <MoreVertical size={20} color="#667eea" />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Messages */}
              <KeyboardAvoidingView 
                style={styles.chatContainer}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              >
                <ScrollView
                  ref={scrollViewRef}
                  style={styles.messagesContainer}
                  contentContainerStyle={styles.messagesContent}
                  onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: false })}
                >
                  {messages.map((msg) => (
                    <View
                      key={msg.id}
                      style={[
                        styles.messageContainer,
                        msg.isMe ? styles.myMessageContainer : styles.theirMessageContainer
                      ]}
                    >
                      {!msg.isMe && (
                        <View style={styles.senderAvatar}>
                          <LinearGradient
                            colors={['#10b981', '#059669']}
                            style={styles.messageSenderAvatar}
                          >
                            <Text style={styles.messageSenderAvatarText}>
                              {msg.senderName.charAt(0)}
                            </Text>
                          </LinearGradient>
                        </View>
                      )}
                      
                      <View
                        style={[
                          styles.messageBubble,
                          msg.isMe ? styles.myMessage : styles.theirMessage
                        ]}
                      >
                        {!msg.isMe && (
                          <Text style={styles.senderName}>{msg.senderName}</Text>
                        )}
                        <Text
                          style={[
                            styles.messageText,
                            msg.isMe ? styles.myMessageText : styles.theirMessageText
                          ]}
                        >
                          {msg.message}
                        </Text>
                        <View style={styles.messageFooter}>
                          <Text
                            style={[
                              styles.messageTime,
                              msg.isMe ? styles.myMessageTime : styles.theirMessageTime
                            ]}
                          >
                            {formatTime(msg.timestamp)}
                          </Text>
                          {msg.isMe && (
                            <View style={styles.messageStatus}>
                              {getStatusIcon(msg.status)}
                            </View>
                          )}
                        </View>
                      </View>
                    </View>
                  ))}
                </ScrollView>

                {/* Message Input */}
                <View style={styles.messageInputContainer}>
                  <TouchableOpacity style={styles.attachButton}>
                    <Paperclip size={20} color="#64748b" />
                  </TouchableOpacity>
                  
                  <View style={styles.messageInputWrapper}>
                    <TextInput
                      style={styles.messageInput}
                      placeholder="Type a message..."
                      placeholderTextColor="#94a3b8"
                      value={message}
                      onChangeText={setMessage}
                      multiline
                      maxLength={1000}
                    />
                    <TouchableOpacity style={styles.emojiButton}>
                      <Smile size={20} color="#64748b" />
                    </TouchableOpacity>
                  </View>

                  <TouchableOpacity
                    style={[
                      styles.sendButton,
                      message.trim() ? styles.sendButtonActive : {}
                    ]}
                    onPress={sendMessage}
                    disabled={!message.trim()}
                  >
                    <LinearGradient
                      colors={message.trim() ? ['#667eea', '#764ba2'] : ['#e2e8f0', '#e2e8f0']}
                      style={styles.sendButtonGradient}
                    >
                      <Send size={18} color={message.trim() ? 'white' : '#94a3b8'} />
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </KeyboardAvoidingView>
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
  newChatButton: {
    backgroundColor: '#f1f5f9',
    borderRadius: 12,
    padding: 12,
  },
  chatList: {
    flex: 1,
  },
  chatListContent: {
    paddingVertical: 8,
  },
  chatItem: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  chatAvatarContainer: {
    position: 'relative',
    marginRight: 16,
  },
  chatAvatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 14,
    height: 14,
    backgroundColor: '#10b981',
    borderRadius: 7,
    borderWidth: 2,
    borderColor: 'white',
  },
  chatContent: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  chatName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1e293b',
    flex: 1,
  },
  chatMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  chatTimestamp: {
    fontSize: 12,
    color: '#94a3b8',
  },
  unreadBadge: {
    backgroundColor: '#667eea',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  unreadText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  chatSubInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  chatRole: {
    fontSize: 12,
    color: '#667eea',
    fontWeight: '600',
  },
  chatCourse: {
    fontSize: 12,
    color: '#64748b',
  },
  lastMessage: {
    fontSize: 14,
    color: '#64748b',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  chatModalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    backgroundColor: 'white',
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  chatModalInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  chatModalAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  chatModalAvatarText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  chatModalDetails: {
    flex: 1,
  },
  chatModalName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 2,
  },
  chatModalStatus: {
    fontSize: 12,
    color: '#64748b',
  },
  chatModalActions: {
    flexDirection: 'row',
    gap: 8,
  },
  chatActionButton: {
    padding: 8,
  },
  chatContainer: {
    flex: 1,
  },
  messagesContainer: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  messagesContent: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'flex-end',
  },
  myMessageContainer: {
    justifyContent: 'flex-end',
  },
  theirMessageContainer: {
    justifyContent: 'flex-start',
  },
  senderAvatar: {
    marginRight: 8,
  },
  messageSenderAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageSenderAvatarText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  messageBubble: {
    maxWidth: width * 0.75,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  myMessage: {
    backgroundColor: '#667eea',
    marginLeft: 40,
  },
  theirMessage: {
    backgroundColor: 'white',
    marginRight: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  senderName: {
    fontSize: 12,
    color: '#667eea',
    fontWeight: '600',
    marginBottom: 4,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 4,
  },
  myMessageText: {
    color: 'white',
  },
  theirMessageText: {
    color: '#1e293b',
  },
  messageFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 4,
  },
  messageTime: {
    fontSize: 11,
  },
  myMessageTime: {
    color: 'rgba(255, 255, 255, 0.8)',
  },
  theirMessageTime: {
    color: '#94a3b8',
  },
  messageStatus: {
    marginLeft: 4,
  },
  messageInputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    gap: 12,
  },
  attachButton: {
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageInputWrapper: {
    flex: 1,
    backgroundColor: '#f8fafc',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'flex-end',
    minHeight: 40,
  },
  messageInput: {
    flex: 1,
    fontSize: 16,
    color: '#1e293b',
    maxHeight: 100,
    paddingVertical: 4,
  },
  emojiButton: {
    padding: 4,
    marginLeft: 8,
  },
  sendButton: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  sendButtonActive: {
    shadowColor: '#667eea',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  sendButtonGradient: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
