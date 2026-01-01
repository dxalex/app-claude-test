import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { Colors, Spacing, FontSizes, BorderRadius } from '@/constants/theme';
import { useAuthStore } from '@/store/authStore';

type TrackingSource = 'manual' | 'myanimelist' | 'anilist';

export default function Onboarding() {
  const router = useRouter();
  const { user } = useAuthStore();
  const [step, setStep] = useState(1);
  const [trackingSource, setTrackingSource] = useState<TrackingSource>('manual');

  const handleComplete = () => {
    // Save tracking source preference
    router.replace('/(tabs)');
  };

  if (step === 1) {
    return (
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Text style={styles.title}>Welcome, {user?.name}!</Text>
            <Text style={styles.subtitle}>
              Let's set up your anime tracking experience
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Choose your tracking source</Text>
            <Text style={styles.sectionDescription}>
              You can sync your watch history or track manually
            </Text>

            <TouchableOpacity
              onPress={() => setTrackingSource('manual')}
              activeOpacity={0.8}
            >
              <Card
                variant="glass"
                style={[
                  styles.sourceCard,
                  trackingSource === 'manual' && styles.selectedCard,
                ]}
              >
                <View style={styles.sourceContent}>
                  <View style={styles.iconContainer}>
                    <Ionicons
                      name="create-outline"
                      size={32}
                      color={Colors.neon.violet}
                    />
                  </View>
                  <View style={styles.sourceText}>
                    <Text style={styles.sourceName}>Manual Tracking</Text>
                    <Text style={styles.sourceDescription}>
                      Track your progress manually within the app
                    </Text>
                  </View>
                  {trackingSource === 'manual' && (
                    <Ionicons
                      name="checkmark-circle"
                      size={24}
                      color={Colors.neon.cyan}
                    />
                  )}
                </View>
              </Card>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setTrackingSource('myanimelist')}
              activeOpacity={0.8}
            >
              <Card
                variant="glass"
                style={[
                  styles.sourceCard,
                  trackingSource === 'myanimelist' && styles.selectedCard,
                ]}
              >
                <View style={styles.sourceContent}>
                  <View style={styles.iconContainer}>
                    <Ionicons
                      name="link-outline"
                      size={32}
                      color={Colors.neon.violet}
                    />
                  </View>
                  <View style={styles.sourceText}>
                    <Text style={styles.sourceName}>MyAnimeList</Text>
                    <Text style={styles.sourceDescription}>
                      Sync with your MAL account
                    </Text>
                  </View>
                  {trackingSource === 'myanimelist' && (
                    <Ionicons
                      name="checkmark-circle"
                      size={24}
                      color={Colors.neon.cyan}
                    />
                  )}
                </View>
              </Card>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setTrackingSource('anilist')}
              activeOpacity={0.8}
            >
              <Card
                variant="glass"
                style={[
                  styles.sourceCard,
                  trackingSource === 'anilist' && styles.selectedCard,
                ]}
              >
                <View style={styles.sourceContent}>
                  <View style={styles.iconContainer}>
                    <Ionicons
                      name="link-outline"
                      size={32}
                      color={Colors.neon.violet}
                    />
                  </View>
                  <View style={styles.sourceText}>
                    <Text style={styles.sourceName}>AniList</Text>
                    <Text style={styles.sourceDescription}>
                      Sync with your AniList account
                    </Text>
                  </View>
                  {trackingSource === 'anilist' && (
                    <Ionicons
                      name="checkmark-circle"
                      size={24}
                      color={Colors.neon.cyan}
                    />
                  )}
                </View>
              </Card>
            </TouchableOpacity>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <Button
            title="Continue"
            onPress={() => setStep(2)}
            style={styles.button}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Privacy Settings</Text>
          <Text style={styles.subtitle}>
            Customize your spoiler protection preferences
          </Text>
        </View>

        <View style={styles.section}>
          <Card variant="glass" style={styles.settingCard}>
            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingName}>Blur Thumbnails</Text>
                <Text style={styles.settingDescription}>
                  Blur anime thumbnails to avoid spoilers
                </Text>
              </View>
              <Ionicons
                name="checkmark-circle"
                size={24}
                color={Colors.neon.cyan}
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
              <Ionicons
                name="checkmark-circle"
                size={24}
                color={Colors.neon.cyan}
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
              <Ionicons
                name="checkmark-circle"
                size={24}
                color={Colors.neon.cyan}
              />
            </View>
          </Card>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button
          title="Get Started"
          onPress={handleComplete}
          style={styles.button}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.midnight.DEFAULT,
  },
  scrollContent: {
    padding: Spacing.lg,
    paddingBottom: 100,
  },
  header: {
    marginBottom: Spacing.xl,
  },
  title: {
    fontSize: FontSizes['3xl'],
    fontWeight: '700',
    color: Colors.soft.white,
    marginBottom: Spacing.sm,
    fontFamily: 'SpaceGrotesk-Bold',
  },
  subtitle: {
    fontSize: FontSizes.base,
    color: Colors.gray[400],
    fontFamily: 'Rubik-Regular',
  },
  section: {
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    fontSize: FontSizes.xl,
    fontWeight: '600',
    color: Colors.soft.white,
    marginBottom: Spacing.xs,
    fontFamily: 'SpaceGrotesk-SemiBold',
  },
  sectionDescription: {
    fontSize: FontSizes.sm,
    color: Colors.gray[400],
    marginBottom: Spacing.lg,
    fontFamily: 'Rubik-Regular',
  },
  sourceCard: {
    marginBottom: Spacing.md,
  },
  selectedCard: {
    borderWidth: 2,
    borderColor: Colors.neon.violet,
  },
  sourceContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: BorderRadius.md,
    backgroundColor: 'rgba(124, 58, 237, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  sourceText: {
    flex: 1,
  },
  sourceName: {
    fontSize: FontSizes.lg,
    fontWeight: '600',
    color: Colors.soft.white,
    marginBottom: 4,
    fontFamily: 'Rubik-SemiBold',
  },
  sourceDescription: {
    fontSize: FontSizes.sm,
    color: Colors.gray[400],
    fontFamily: 'Rubik-Regular',
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
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: Spacing.lg,
    backgroundColor: Colors.midnight.DEFAULT,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  button: {
    width: '100%',
  },
});
