import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Card } from '@/components/Card';
import { Colors, Spacing, FontSizes, BorderRadius } from '@/constants/theme';
import { useAuthStore } from '@/store/authStore';

export default function Profile() {
  const router = useRouter();
  const { user, settings, updateSettings, logout } = useAuthStore();

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: async () => {
          await logout();
          router.replace('/(auth)/signin');
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={styles.header}>
          <LinearGradient
            colors={[Colors.neon.violet, Colors.neon.cyan]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.avatar}
          >
            <Text style={styles.avatarText}>
              {user?.name?.[0]?.toUpperCase() || 'A'}
            </Text>
          </LinearGradient>
          <Text style={styles.name}>{user?.name || 'Anonymous'}</Text>
          <Text style={styles.email}>{user?.email || 'user@example.com'}</Text>

          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>12</Text>
            <Text style={styles.statLabel}>Watching</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>47</Text>
            <Text style={styles.statLabel}>Completed</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>8</Text>
            <Text style={styles.statLabel}>Plan to Watch</Text>
          </View>
        </View>

        {/* Settings Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Privacy & Spoilers</Text>

          <Card variant="glass" style={styles.settingCard}>
            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingName}>Blur Thumbnails</Text>
                <Text style={styles.settingDescription}>
                  Blur anime covers to avoid visual spoilers
                </Text>
              </View>
              <Switch
                value={settings.blurThumbnails}
                onValueChange={(value) => updateSettings({ blurThumbnails: value })}
                trackColor={{ false: Colors.gray[500], true: Colors.neon.violet }}
                thumbColor={Colors.soft.white}
              />
            </View>
          </Card>

          <Card variant="glass" style={styles.settingCard}>
            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingName}>Spoiler Protection</Text>
                <Text style={styles.settingDescription}>
                  Hide episode descriptions and discussions
                </Text>
              </View>
              <Switch
                value={settings.spoilerProtection}
                onValueChange={(value) =>
                  updateSettings({ spoilerProtection: value })
                }
                trackColor={{ false: Colors.gray[500], true: Colors.neon.violet }}
                thumbColor={Colors.soft.white}
              />
            </View>
          </Card>

          <Card variant="glass" style={styles.settingCard}>
            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingName}>Release Alerts</Text>
                <Text style={styles.settingDescription}>
                  Get notified when new episodes drop
                </Text>
              </View>
              <Switch
                value={settings.releaseAlerts}
                onValueChange={(value) => updateSettings({ releaseAlerts: value })}
                trackColor={{ false: Colors.gray[500], true: Colors.neon.violet }}
                thumbColor={Colors.soft.white}
              />
            </View>
          </Card>
        </View>

        {/* Display Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Display</Text>

          <Card variant="glass" style={styles.settingCard}>
            <TouchableOpacity style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingName}>Episode List Density</Text>
                <Text style={styles.settingDescription}>
                  {settings.episodeDensity}
                </Text>
              </View>
              <Ionicons
                name="chevron-forward"
                size={20}
                color={Colors.gray[400]}
              />
            </TouchableOpacity>
          </Card>

          <Card variant="glass" style={styles.settingCard}>
            <TouchableOpacity style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingName}>Timezone</Text>
                <Text style={styles.settingDescription}>{user?.timezone}</Text>
              </View>
              <Ionicons
                name="chevron-forward"
                size={20}
                color={Colors.gray[400]}
              />
            </TouchableOpacity>
          </Card>
        </View>

        {/* Account Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>

          <Card variant="glass" style={styles.settingCard}>
            <TouchableOpacity style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingName}>Tracking Source</Text>
                <Text style={styles.settingDescription}>
                  {user?.trackingSource || 'Manual'}
                </Text>
              </View>
              <Ionicons
                name="chevron-forward"
                size={20}
                color={Colors.gray[400]}
              />
            </TouchableOpacity>
          </Card>

          <Card variant="glass" style={styles.settingCard}>
            <TouchableOpacity style={styles.settingRow} onPress={handleLogout}>
              <View style={styles.settingInfo}>
                <Text style={[styles.settingName, styles.dangerText]}>
                  Logout
                </Text>
              </View>
              <Ionicons name="log-out-outline" size={20} color="#EF4444" />
            </TouchableOpacity>
          </Card>
        </View>
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
    alignItems: 'center',
    padding: Spacing.lg,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  avatarText: {
    fontSize: 36,
    fontWeight: '700',
    color: Colors.soft.white,
    fontFamily: 'SpaceGrotesk-Bold',
  },
  name: {
    fontSize: FontSizes.xl,
    fontWeight: '700',
    color: Colors.soft.white,
    marginBottom: 4,
    fontFamily: 'SpaceGrotesk-Bold',
  },
  email: {
    fontSize: FontSizes.sm,
    color: Colors.gray[400],
    marginBottom: Spacing.md,
    fontFamily: 'Rubik-Regular',
  },
  editButton: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.neon.violet,
  },
  editButtonText: {
    fontSize: FontSizes.sm,
    color: Colors.neon.violet,
    fontWeight: '600',
    fontFamily: 'Rubik-SemiBold',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
    backgroundColor: Colors.midnight[50],
    borderRadius: BorderRadius.lg,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: FontSizes['2xl'],
    fontWeight: '700',
    color: Colors.soft.white,
    marginBottom: 4,
    fontFamily: 'SpaceGrotesk-Bold',
  },
  statLabel: {
    fontSize: FontSizes.xs,
    color: Colors.gray[400],
    fontFamily: 'Rubik-Regular',
  },
  statDivider: {
    width: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  section: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    fontSize: FontSizes.base,
    fontWeight: '600',
    color: Colors.soft.white,
    marginBottom: Spacing.md,
    fontFamily: 'Rubik-SemiBold',
  },
  settingCard: {
    marginBottom: Spacing.md,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  settingInfo: {
    flex: 1,
    marginRight: Spacing.md,
  },
  settingName: {
    fontSize: FontSizes.base,
    fontWeight: '600',
    color: Colors.soft.white,
    marginBottom: 4,
    fontFamily: 'Rubik-SemiBold',
  },
  settingDescription: {
    fontSize: FontSizes.sm,
    color: Colors.gray[400],
    fontFamily: 'Rubik-Regular',
  },
  dangerText: {
    color: '#EF4444',
  },
});
