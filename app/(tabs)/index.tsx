import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AnimeCard } from '@/components/AnimeCard';
import { Colors, Spacing, FontSizes, BorderRadius } from '@/constants/theme';
import { useAuthStore } from '@/store/authStore';
import { useAnimeStore } from '@/store/animeStore';

export default function Home() {
  const router = useRouter();
  const { user } = useAuthStore();
  const { continueWatching, newThisWeek } = useAnimeStore();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Welcome back,</Text>
            <Text style={styles.name}>{user?.name || 'Otaku'}!</Text>
          </View>
          <TouchableOpacity style={styles.avatarContainer}>
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
          </TouchableOpacity>
        </View>

        {/* Quick Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <LinearGradient
              colors={['rgba(124, 58, 237, 0.3)', 'rgba(124, 58, 237, 0.1)']}
              style={styles.statGradient}
            >
              <Ionicons name="play-circle" size={24} color={Colors.neon.violet} />
              <Text style={styles.statValue}>12</Text>
              <Text style={styles.statLabel}>Watching</Text>
            </LinearGradient>
          </View>

          <View style={styles.statCard}>
            <LinearGradient
              colors={['rgba(34, 211, 238, 0.3)', 'rgba(34, 211, 238, 0.1)']}
              style={styles.statGradient}
            >
              <Ionicons name="checkmark-circle" size={24} color={Colors.neon.cyan} />
              <Text style={styles.statValue}>47</Text>
              <Text style={styles.statLabel}>Completed</Text>
            </LinearGradient>
          </View>

          <View style={styles.statCard}>
            <LinearGradient
              colors={['rgba(124, 58, 237, 0.3)', 'rgba(124, 58, 237, 0.1)']}
              style={styles.statGradient}
            >
              <Ionicons name="time" size={24} color={Colors.neon.violet} />
              <Text style={styles.statValue}>8</Text>
              <Text style={styles.statLabel}>Plan to Watch</Text>
            </LinearGradient>
          </View>
        </View>

        {/* Continue Watching */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Continue Watching</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            horizontal
            data={continueWatching}
            renderItem={({ item }) => (
              <View style={styles.cardWrapper}>
                <AnimeCard
                  anime={item}
                  onPress={() => router.push(`/show/${item.id}`)}
                  variant="portrait"
                />
                {/* Progress Bar */}
                <View style={styles.progressContainer}>
                  <View style={styles.progressBar}>
                    <View style={[styles.progressFill, { width: '65%' }]} />
                  </View>
                  <Text style={styles.progressText}>EP 13 • 15:20 left</Text>
                </View>
              </View>
            )}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}
          />
        </View>

        {/* New This Week */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>New This Week</Text>
              <Text style={styles.sectionSubtitle}>Fresh episodes dropped</Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>

          {newThisWeek.map((anime) => (
            <AnimeCard
              key={anime.id}
              anime={anime}
              onPress={() => router.push(`/show/${anime.id}`)}
              variant="landscape"
            />
          ))}
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActions}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => router.push('/(tabs)/search')}
            >
              <View style={styles.actionIcon}>
                <Ionicons name="search" size={24} color={Colors.neon.violet} />
              </View>
              <Text style={styles.actionText}>Find Anime</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => router.push('/(tabs)/calendar')}
            >
              <View style={styles.actionIcon}>
                <Ionicons name="calendar" size={24} color={Colors.neon.cyan} />
              </View>
              <Text style={styles.actionText}>Schedule</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton}>
              <View style={styles.actionIcon}>
                <Ionicons name="bookmark" size={24} color={Colors.neon.violet} />
              </View>
              <Text style={styles.actionText}>My List</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton}>
              <View style={styles.actionIcon}>
                <Ionicons name="trending-up" size={24} color={Colors.neon.cyan} />
              </View>
              <Text style={styles.actionText}>Trending</Text>
            </TouchableOpacity>
          </View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.lg,
  },
  greeting: {
    fontSize: FontSizes.base,
    color: Colors.gray[400],
    fontFamily: 'Rubik-Regular',
  },
  name: {
    fontSize: FontSizes['2xl'],
    fontWeight: '700',
    color: Colors.soft.white,
    fontFamily: 'SpaceGrotesk-Bold',
  },
  avatarContainer: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  avatar: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.soft.white,
    fontFamily: 'SpaceGrotesk-Bold',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.lg,
    gap: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  statCard: {
    flex: 1,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
  },
  statGradient: {
    padding: Spacing.md,
    alignItems: 'center',
  },
  statValue: {
    fontSize: FontSizes['2xl'],
    fontWeight: '700',
    color: Colors.soft.white,
    marginTop: Spacing.xs,
    fontFamily: 'SpaceGrotesk-Bold',
  },
  statLabel: {
    fontSize: FontSizes.xs,
    color: Colors.gray[400],
    marginTop: 4,
    fontFamily: 'Rubik-Regular',
  },
  section: {
    marginBottom: Spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    fontSize: FontSizes.xl,
    fontWeight: '700',
    color: Colors.soft.white,
    fontFamily: 'SpaceGrotesk-Bold',
  },
  sectionSubtitle: {
    fontSize: FontSizes.sm,
    color: Colors.gray[400],
    marginTop: 2,
    fontFamily: 'Rubik-Regular',
  },
  seeAll: {
    fontSize: FontSizes.sm,
    color: Colors.neon.violet,
    fontWeight: '600',
    fontFamily: 'Rubik-SemiBold',
  },
  horizontalList: {
    paddingHorizontal: Spacing.lg,
  },
  cardWrapper: {
    marginRight: Spacing.md,
  },
  progressContainer: {
    marginTop: Spacing.sm,
  },
  progressBar: {
    height: 4,
    backgroundColor: Colors.midnight[50],
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: 4,
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.neon.violet,
  },
  progressText: {
    fontSize: FontSizes.xs,
    color: Colors.gray[400],
    fontFamily: 'Rubik-Regular',
  },
  quickActions: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.lg,
    gap: Spacing.md,
  },
  actionButton: {
    flex: 1,
    alignItems: 'center',
  },
  actionIcon: {
    width: 56,
    height: 56,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.midnight[50],
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  actionText: {
    fontSize: FontSizes.xs,
    color: Colors.soft.white,
    textAlign: 'center',
    fontFamily: 'Rubik-Regular',
  },
});
