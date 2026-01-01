import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { formatDistanceToNow } from 'date-fns';
import { Card } from '@/components/Card';
import { Colors, Spacing, FontSizes } from '@/constants/theme';

const mockNotifications = [
  {
    id: '1',
    type: 'release',
    title: 'New Episode Available',
    message: 'Jujutsu Kaisen Episode 24 is now available',
    time: new Date(Date.now() - 1000 * 60 * 30),
    read: false,
  },
  {
    id: '2',
    type: 'spoiler_alert',
    title: 'Spoiler Alert',
    message: 'High spoiler activity detected for Attack on Titan',
    time: new Date(Date.now() - 1000 * 60 * 60 * 2),
    read: false,
  },
  {
    id: '3',
    type: 'recommendation',
    title: 'New Recommendation',
    message: 'Based on your watch history, you might like "Vinland Saga"',
    time: new Date(Date.now() - 1000 * 60 * 60 * 24),
    read: true,
  },
];

export default function Notifications() {
  const getIcon = (type: string) => {
    switch (type) {
      case 'release':
        return 'play-circle';
      case 'spoiler_alert':
        return 'warning';
      case 'recommendation':
        return 'bulb';
      default:
        return 'notifications';
    }
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case 'release':
        return Colors.neon.cyan;
      case 'spoiler_alert':
        return '#EF4444';
      case 'recommendation':
        return Colors.neon.violet;
      default:
        return Colors.gray[400];
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Notifications</Text>
          <TouchableOpacity>
            <Text style={styles.markAll}>Mark all read</Text>
          </TouchableOpacity>
        </View>

        {/* Notifications List */}
        <View style={styles.section}>
          {mockNotifications.map((notification) => (
            <TouchableOpacity key={notification.id} activeOpacity={0.8}>
              <Card
                variant="glass"
                style={[
                  styles.notificationCard,
                  !notification.read && styles.unreadCard,
                ]}
              >
                <View style={styles.notificationContent}>
                  <View
                    style={[
                      styles.iconContainer,
                      { backgroundColor: `${getIconColor(notification.type)}20` },
                    ]}
                  >
                    <Ionicons
                      name={getIcon(notification.type) as any}
                      size={24}
                      color={getIconColor(notification.type)}
                    />
                  </View>

                  <View style={styles.textContainer}>
                    <Text style={styles.notificationTitle}>
                      {notification.title}
                    </Text>
                    <Text style={styles.notificationMessage}>
                      {notification.message}
                    </Text>
                    <Text style={styles.notificationTime}>
                      {formatDistanceToNow(notification.time, { addSuffix: true })}
                    </Text>
                  </View>

                  {!notification.read && <View style={styles.unreadDot} />}
                </View>
              </Card>
            </TouchableOpacity>
          ))}
        </View>

        {/* Empty State (when no notifications) */}
        {/* <View style={styles.emptyState}>
          <Ionicons
            name="notifications-off-outline"
            size={64}
            color={Colors.gray[400]}
          />
          <Text style={styles.emptyTitle}>No notifications yet</Text>
          <Text style={styles.emptyText}>
            We'll notify you when something important happens
          </Text>
        </View> */}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.midnight.DEFAULT,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.lg,
  },
  title: {
    fontSize: FontSizes['2xl'],
    fontWeight: '700',
    color: Colors.soft.white,
    fontFamily: 'SpaceGrotesk-Bold',
  },
  markAll: {
    fontSize: FontSizes.sm,
    color: Colors.neon.violet,
    fontWeight: '600',
    fontFamily: 'Rubik-SemiBold',
  },
  section: {
    paddingHorizontal: Spacing.lg,
  },
  notificationCard: {
    marginBottom: Spacing.md,
  },
  unreadCard: {
    borderWidth: 1,
    borderColor: Colors.neon.violet,
  },
  notificationContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.md,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: FontSizes.base,
    fontWeight: '600',
    color: Colors.soft.white,
    marginBottom: 4,
    fontFamily: 'Rubik-SemiBold',
  },
  notificationMessage: {
    fontSize: FontSizes.sm,
    color: Colors.gray[400],
    marginBottom: Spacing.xs,
    fontFamily: 'Rubik-Regular',
  },
  notificationTime: {
    fontSize: FontSizes.xs,
    color: Colors.gray[500],
    fontFamily: 'Rubik-Regular',
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.neon.cyan,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.xxl * 2,
  },
  emptyTitle: {
    fontSize: FontSizes.xl,
    fontWeight: '600',
    color: Colors.soft.white,
    marginTop: Spacing.lg,
    fontFamily: 'Rubik-SemiBold',
  },
  emptyText: {
    fontSize: FontSizes.sm,
    color: Colors.gray[400],
    marginTop: Spacing.sm,
    textAlign: 'center',
    fontFamily: 'Rubik-Regular',
  },
});
