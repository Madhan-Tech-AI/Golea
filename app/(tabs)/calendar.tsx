import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Modal, Dimensions, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar as CalendarIcon, Clock, MapPin, Users, Plus, Filter, Bell, Video, BookOpen, SquareCheck as CheckSquare, X, ChevronLeft, ChevronRight } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export default function CalendarScreen() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'agenda'>('month');
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  const events = [
    {
      id: 1,
      title: 'Data Structures Lecture',
      type: 'class',
      course: 'Computer Science',
      date: '2024-01-16',
      startTime: '09:00',
      endTime: '10:30',
      location: 'Room 301',
      instructor: 'Dr. Sarah Johnson',
      description: 'Binary Trees and AVL Trees implementation',
      attendees: 35,
      isOnline: false,
      meetingLink: null,
      color: '#3b82f6',
    },
    {
      id: 2,
      title: 'Assignment Due: React Components',
      type: 'assignment',
      course: 'Web Development',
      date: '2024-01-18',
      startTime: '23:59',
      endTime: '23:59',
      location: 'Online',
      instructor: 'Prof. Mike Chen',
      description: 'React functional components project submission',
      attendees: 0,
      isOnline: true,
      meetingLink: null,
      color: '#f59e0b',
    },
    {
      id: 3,
      title: 'Database Systems Quiz',
      type: 'exam',
      course: 'Database Management',
      date: '2024-01-19',
      startTime: '14:00',
      endTime: '15:30',
      location: 'Exam Hall A',
      instructor: 'Dr. Emma Davis',
      description: 'SQL queries and database optimization',
      attendees: 28,
      isOnline: false,
      meetingLink: null,
      color: '#ef4444',
    },
    {
      id: 4,
      title: 'Office Hours',
      type: 'office_hours',
      course: 'General',
      date: '2024-01-17',
      startTime: '15:00',
      endTime: '17:00',
      location: 'Room 205',
      instructor: 'Dr. Sarah Johnson',
      description: 'Open office hours for student consultations',
      attendees: 0,
      isOnline: false,
      meetingLink: null,
      color: '#10b981',
    },
    {
      id: 5,
      title: 'Team Project Meeting',
      type: 'meeting',
      course: 'Mobile App Development',
      date: '2024-01-20',
      startTime: '10:00',
      endTime: '11:00',
      location: 'Online',
      instructor: 'Prof. Alex Wilson',
      description: 'Final project discussion and planning',
      attendees: 8,
      isOnline: true,
      meetingLink: 'https://meet.google.com/abc-def-ghi',
      color: '#8b5cf6',
    },
  ];

  const upcomingEvents = events
    .filter(event => new Date(event.date) >= new Date())
    .sort((a, b) => new Date(a.date + ' ' + a.startTime).getTime() - new Date(b.date + ' ' + b.startTime).getTime())
    .slice(0, 5);

  const todaysEvents = events.filter(event => {
    const today = new Date().toISOString().split('T')[0];
    return event.date === today;
  });

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'class': return BookOpen;
      case 'assignment': return CheckSquare;
      case 'exam': return Clock;
      case 'office_hours': return Users;
      case 'meeting': return Video;
      default: return CalendarIcon;
    }
  };

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hour12 = parseInt(hours) > 12 ? parseInt(hours) - 12 : parseInt(hours);
    const ampm = parseInt(hours) >= 12 ? 'PM' : 'AM';
    return `${hour12 === 0 ? 12 : hour12}:${minutes} ${ampm}`;
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const renderCalendarGrid = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);
    const days = [];
    const today = new Date().toISOString().split('T')[0];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<View key={`empty-${i}`} style={styles.calendarDay} />);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const dayEvents = events.filter(event => event.date === dateStr);
      const isToday = dateStr === today;
      const isSelected = dateStr === selectedDate.toISOString().split('T')[0];

      days.push(
        <TouchableOpacity
          key={day}
          style={[
            styles.calendarDay,
            isToday && styles.calendarDayToday,
            isSelected && styles.calendarDaySelected,
          ]}
          onPress={() => setSelectedDate(new Date(dateStr))}
        >
          <Text style={[
            styles.calendarDayText,
            isToday && styles.calendarDayTextToday,
            isSelected && styles.calendarDayTextSelected,
          ]}>
            {day}
          </Text>
          {dayEvents.length > 0 && (
            <View style={styles.eventIndicators}>
              {dayEvents.slice(0, 3).map((event, index) => (
                <View
                  key={index}
                  style={[styles.eventDot, { backgroundColor: event.color }]}
                />
              ))}
            </View>
          )}
        </TouchableOpacity>
      );
    }

    return days;
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const handleJoinMeeting = (event: any) => {
    if (event.isOnline && event.meetingLink) {
      Alert.alert('Join Meeting', `Join ${event.title}?`, [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Join', onPress: () => console.log('Opening meeting link:', event.meetingLink) }
      ]);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Calendar</Text>
          <Text style={styles.headerSubtitle}>Stay organized with your schedule</Text>
          
          {/* View Mode Selector */}
          <View style={styles.viewModeSelector}>
            {(['month', 'week', 'agenda'] as const).map((mode) => (
              <TouchableOpacity
                key={mode}
                style={[
                  styles.viewModeButton,
                  viewMode === mode && styles.viewModeButtonActive
                ]}
                onPress={() => setViewMode(mode)}
              >
                <Text
                  style={[
                    styles.viewModeText,
                    viewMode === mode && styles.viewModeTextActive
                  ]}
                >
                  {mode.charAt(0).toUpperCase() + mode.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Action Buttons */}
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.actionButton}>
              <Filter size={18} color="#667eea" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Bell size={18} color="#667eea" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Plus size={18} color="#667eea" />
            </TouchableOpacity>
          </View>
        </View>

        {viewMode === 'month' && (
          <>
            {/* Calendar Header */}
            <View style={styles.calendarHeader}>
              <TouchableOpacity onPress={() => navigateMonth('prev')}>
                <ChevronLeft size={24} color="#667eea" />
              </TouchableOpacity>
              <Text style={styles.calendarTitle}>
                {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </Text>
              <TouchableOpacity onPress={() => navigateMonth('next')}>
                <ChevronRight size={24} color="#667eea" />
              </TouchableOpacity>
            </View>

            {/* Calendar Grid */}
            <View style={styles.calendarSection}>
              <View style={styles.calendarContainer}>
                {/* Day Headers */}
                <View style={styles.dayHeaders}>
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                    <Text key={day} style={styles.dayHeader}>{day}</Text>
                  ))}
                </View>
                
                {/* Calendar Grid */}
                <View style={styles.calendarGrid}>
                  {renderCalendarGrid()}
                </View>
              </View>
            </View>
          </>
        )}

        {/* Today's Events */}
        {todaysEvents.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Today's Events</Text>
            {todaysEvents.map((event) => {
              const EventIcon = getEventIcon(event.type);
              return (
                <TouchableOpacity
                  key={event.id}
                  style={styles.eventCard}
                  onPress={() => {
                    setSelectedEvent(event);
                    setShowEventModal(true);
                  }}
                >
                  <LinearGradient
                    colors={[event.color + '15', event.color + '05']}
                    style={styles.eventCardGradient}
                  >
                    <View style={styles.eventHeader}>
                      <View style={[styles.eventIcon, { backgroundColor: event.color }]}>
                        <EventIcon size={16} color="white" />
                      </View>
                      <View style={styles.eventInfo}>
                        <Text style={styles.eventTitle}>{event.title}</Text>
                        <Text style={styles.eventCourse}>{event.course}</Text>
                      </View>
                      <Text style={styles.eventTime}>
                        {formatTime(event.startTime)}
                      </Text>
                    </View>
                    <View style={styles.eventDetails}>
                      <View style={styles.eventDetailItem}>
                        <MapPin size={14} color="#64748b" />
                        <Text style={styles.eventDetailText}>{event.location}</Text>
                      </View>
                      <View style={styles.eventDetailItem}>
                        <Users size={14} color="#64748b" />
                        <Text style={styles.eventDetailText}>{event.instructor}</Text>
                      </View>
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              );
            })}
          </View>
        )}

        {/* Upcoming Events */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Upcoming Events</Text>
          {upcomingEvents.map((event) => {
            const EventIcon = getEventIcon(event.type);
            return (
              <TouchableOpacity
                key={event.id}
                style={styles.upcomingEventCard}
                onPress={() => {
                  setSelectedEvent(event);
                  setShowEventModal(true);
                }}
              >
                <View style={styles.upcomingEventLeft}>
                  <View style={styles.upcomingEventDate}>
                    <Text style={styles.upcomingEventDateText}>
                      {formatDate(event.date)}
                    </Text>
                    <Text style={styles.upcomingEventTime}>
                      {formatTime(event.startTime)}
                    </Text>
                  </View>
                  <View style={[styles.upcomingEventIcon, { backgroundColor: event.color + '15' }]}>
                    <EventIcon size={20} color={event.color} />
                  </View>
                </View>
                <View style={styles.upcomingEventContent}>
                  <Text style={styles.upcomingEventTitle}>{event.title}</Text>
                  <Text style={styles.upcomingEventCourse}>{event.course}</Text>
                  <View style={styles.upcomingEventMeta}>
                    <MapPin size={12} color="#64748b" />
                    <Text style={styles.upcomingEventMetaText}>{event.location}</Text>
                    <Text style={styles.upcomingEventMetaText}>•</Text>
                    <Text style={styles.upcomingEventMetaText}>{event.instructor}</Text>
                  </View>
                </View>
                <View style={[styles.upcomingEventBorder, { backgroundColor: event.color }]} />
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>

      {/* Event Detail Modal */}
      <Modal
        visible={showEventModal}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <SafeAreaView style={styles.modalContainer}>
          {selectedEvent && (
            <>
              <View style={styles.modalHeader}>
                <TouchableOpacity onPress={() => setShowEventModal(false)}>
                  <X size={24} color="#64748b" />
                </TouchableOpacity>
                <Text style={styles.modalTitle} numberOfLines={1}>Event Details</Text>
                <View style={{ width: 24 }} />
              </View>

              <ScrollView style={styles.modalContent}>
                {/* Event Header */}
                <LinearGradient
                  colors={[selectedEvent.color + '15', selectedEvent.color + '05']}
                  style={styles.modalEventHeader}
                >
                  <View style={[styles.modalEventIcon, { backgroundColor: selectedEvent.color }]}>
                    {React.createElement(getEventIcon(selectedEvent.type), { size: 32, color: 'white' })}
                  </View>
                  <View style={styles.modalEventInfo}>
                    <Text style={styles.modalEventTitle}>{selectedEvent.title}</Text>
                    <Text style={styles.modalEventCourse}>{selectedEvent.course}</Text>
                    <Text style={styles.modalEventInstructor}>{selectedEvent.instructor}</Text>
                  </View>
                </LinearGradient>

                {/* Event Details */}
                <View style={styles.modalSection}>
                  <Text style={styles.modalSectionTitle}>Event Information</Text>
                  <View style={styles.modalDetailsCard}>
                    <View style={styles.modalDetailRow}>
                      <CalendarIcon size={20} color="#64748b" />
                      <View style={styles.modalDetailContent}>
                        <Text style={styles.modalDetailLabel}>Date</Text>
                        <Text style={styles.modalDetailValue}>
                          {new Date(selectedEvent.date).toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </Text>
                      </View>
                    </View>

                    <View style={styles.modalDetailRow}>
                      <Clock size={20} color="#64748b" />
                      <View style={styles.modalDetailContent}>
                        <Text style={styles.modalDetailLabel}>Time</Text>
                        <Text style={styles.modalDetailValue}>
                          {formatTime(selectedEvent.startTime)} - {formatTime(selectedEvent.endTime)}
                        </Text>
                      </View>
                    </View>

                    <View style={styles.modalDetailRow}>
                      <MapPin size={20} color="#64748b" />
                      <View style={styles.modalDetailContent}>
                        <Text style={styles.modalDetailLabel}>Location</Text>
                        <Text style={styles.modalDetailValue}>{selectedEvent.location}</Text>
                      </View>
                    </View>

                    {selectedEvent.attendees > 0 && (
                      <View style={styles.modalDetailRow}>
                        <Users size={20} color="#64748b" />
                        <View style={styles.modalDetailContent}>
                          <Text style={styles.modalDetailLabel}>Attendees</Text>
                          <Text style={styles.modalDetailValue}>{selectedEvent.attendees} students</Text>
                        </View>
                      </View>
                    )}
                  </View>
                </View>

                {/* Description */}
                {selectedEvent.description && (
                  <View style={styles.modalSection}>
                    <Text style={styles.modalSectionTitle}>Description</Text>
                    <View style={styles.modalDescriptionCard}>
                      <Text style={styles.modalDescriptionText}>{selectedEvent.description}</Text>
                    </View>
                  </View>
                )}

                {/* Action Buttons */}
                <View style={styles.modalActions}>
                  {selectedEvent.isOnline && selectedEvent.meetingLink && (
                    <TouchableOpacity
                      style={styles.primaryButton}
                      onPress={() => handleJoinMeeting(selectedEvent)}
                    >
                      <LinearGradient
                        colors={['#667eea', '#764ba2']}
                        style={styles.buttonGradient}
                      >
                        <Video size={20} color="white" />
                        <Text style={styles.primaryButtonText}>Join Meeting</Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  )}
                  
                  <TouchableOpacity style={styles.secondaryButton}>
                    <Bell size={20} color="#667eea" />
                    <Text style={styles.secondaryButtonText}>Set Reminder</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.secondaryButton}>
                    <Plus size={20} color="#667eea" />
                    <Text style={styles.secondaryButtonText}>Add to Calendar</Text>
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
  viewModeSelector: {
    flexDirection: 'row',
    backgroundColor: '#f1f5f9',
    borderRadius: 12,
    padding: 4,
    marginBottom: 16,
  },
  viewModeButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 8,
  },
  viewModeButtonActive: {
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  viewModeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748b',
  },
  viewModeTextActive: {
    color: '#667eea',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    backgroundColor: '#f1f5f9',
    borderRadius: 12,
    padding: 12,
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: 'white',
  },
  calendarTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1e293b',
  },
  calendarSection: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  calendarContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  dayHeaders: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  dayHeader: {
    flex: 1,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '600',
    color: '#64748b',
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  calendarDay: {
    width: (width - 72) / 7,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  calendarDayToday: {
    backgroundColor: '#667eea15',
    borderRadius: 8,
  },
  calendarDaySelected: {
    backgroundColor: '#667eea',
    borderRadius: 8,
  },
  calendarDayText: {
    fontSize: 16,
    color: '#1e293b',
  },
  calendarDayTextToday: {
    color: '#667eea',
    fontWeight: '600',
  },
  calendarDayTextSelected: {
    color: 'white',
    fontWeight: '600',
  },
  eventIndicators: {
    position: 'absolute',
    bottom: 4,
    flexDirection: 'row',
    gap: 2,
  },
  eventDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 16,
  },
  eventCard: {
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  eventCardGradient: {
    padding: 20,
  },
  eventHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  eventIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  eventInfo: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 2,
  },
  eventCourse: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '500',
  },
  eventTime: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1e293b',
  },
  eventDetails: {
    flexDirection: 'row',
    gap: 16,
  },
  eventDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  eventDetailText: {
    fontSize: 14,
    color: '#64748b',
  },
  upcomingEventCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
    position: 'relative',
  },
  upcomingEventLeft: {
    alignItems: 'center',
    marginRight: 16,
  },
  upcomingEventDate: {
    alignItems: 'center',
    marginBottom: 8,
  },
  upcomingEventDateText: {
    fontSize: 12,
    color: '#64748b',
    fontWeight: '600',
  },
  upcomingEventTime: {
    fontSize: 14,
    color: '#1e293b',
    fontWeight: '700',
  },
  upcomingEventIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  upcomingEventContent: {
    flex: 1,
  },
  upcomingEventTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 4,
  },
  upcomingEventCourse: {
    fontSize: 14,
    color: '#667eea',
    fontWeight: '600',
    marginBottom: 4,
  },
  upcomingEventMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  upcomingEventMetaText: {
    fontSize: 12,
    color: '#64748b',
  },
  upcomingEventBorder: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
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
  modalEventHeader: {
    marginHorizontal: 20,
    marginBottom: 24,
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalEventIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  modalEventInfo: {
    flex: 1,
  },
  modalEventTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 4,
  },
  modalEventCourse: {
    fontSize: 16,
    color: '#667eea',
    fontWeight: '600',
    marginBottom: 4,
  },
  modalEventInstructor: {
    fontSize: 14,
    color: '#64748b',
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
  modalDetailsCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  modalDetailRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  modalDetailContent: {
    marginLeft: 16,
    flex: 1,
  },
  modalDetailLabel: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '600',
    marginBottom: 4,
  },
  modalDetailValue: {
    fontSize: 16,
    color: '#1e293b',
    fontWeight: '500',
  },
  modalDescriptionCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  modalDescriptionText: {
    fontSize: 16,
    color: '#64748b',
    lineHeight: 24,
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
