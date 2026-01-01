import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { Colors, Spacing, FontSizes, BorderRadius } from '@/constants/theme';
import { useAuthStore } from '@/store/authStore';
import { useAnimeStore } from '@/store/animeStore';

const { width } = Dimensions.get('window');

// Mock episode data
const mockEpisodes = [
  {
    id: '1',
    episodeNumber: 1,
    title: 'Ryomen Sukuna',
    description: 'Itadori Yuji is a high school student with exceptional physical abilities.',
    duration: 24,
    thumbnail: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx113415-bbBWj4pEFseh.jpg',
    watched: true,
  },
  {
    id: '2',
    episodeNumber: 2,
    title: 'For Myself',
    description: 'Itadori wakes up in an unfamiliar room and before him rests Gojo Satoru.',
    duration: 24,
    thumbnail: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx113415-bbBWj4pEFseh.jpg',
    watched: true,
  },
  {
    id: '3',
    episodeNumber: 3,
    title: 'Girl of Steel',
    description: 'Itadori, Fushiguro, and Gojo head to a town where a cursed object has been discovered.',
    duration: 24,
    thumbnail: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx113415-bbBWj4pEFseh.jpg',
    watched: false,
  },
];

export default function ShowDetail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { settings } = useAuthStore();
  const { newThisWeek, markEpisodeWatched } = useAnimeStore();

  const [isFavorite, setIsFavorite] = useState(false);

  // Find the anime from the store
  const anime = newThisWeek.find((a) => a.id === id);

  if (!anime) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Anime not found</Text>
      </SafeAreaView>
    );
  }

  const handleMarkWatched = (episodeId: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    markEpisodeWatched(anime.id, episodeId);
  };

  const toggleFavorite = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setIsFavorite(!isFavorite);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header Image */}
        <View style={styles.headerContainer}>
          <Image
            source={{ uri: anime.coverImage }}
            style={[
              styles.bannerImage,
              settings.blurThumbnails && styles.blurredImage,
            ]}
          />
          <LinearGradient
            colors={['transparent', Colors.midnight.DEFAULT]}
            style={styles.gradient}
          />

          {/* Back Button */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color={Colors.soft.white} />
          </TouchableOpacity>

          {/* Favorite Button */}
          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={toggleFavorite}
          >
            <Ionicons
              name={isFavorite ? 'heart' : 'heart-outline'}
              size={24}
              color={isFavorite ? '#EF4444' : Colors.soft.white}
            />
          </TouchableOpacity>
        </View>

        {/* Anime Info */}
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{anime.title}</Text>
          {anime.titleJapanese && (
            <Text style={styles.japaneseTitle}>{anime.titleJapanese}</Text>
          )}

          <View style={styles.metaContainer}>
            <View style={styles.metaItem}>
              <Ionicons name="star" size={16} color={Colors.neon.cyan} />
              <Text style={styles.metaText}>{anime.score?.toFixed(1) || 'N/A'}</Text>
            </View>
            <View style={styles.metaDivider} />
            <View style={styles.metaItem}>
              <Ionicons name="film-outline" size={16} color={Colors.gray[400]} />
              <Text style={styles.metaText}>{anime.format}</Text>
            </View>
            <View style={styles.metaDivider} />
            <View style={styles.metaItem}>
              <Ionicons name="calendar-outline" size={16} color={Colors.gray[400]} />
              <Text style={styles.metaText}>{anime.status}</Text>
            </View>
          </View>

          {/* Genres */}
          {anime.genres && (
            <View style={styles.genreContainer}>
              {anime.genres.map((genre, index) => (
                <View key={index} style={styles.genreBadge}>
                  <Text style={styles.genreText}>{genre}</Text>
                </View>
              ))}
            </View>
          )}

          {/* Description */}
          {!settings.spoilerProtection && (
            <Text style={styles.description}>{anime.description}</Text>
          )}

          {/* Where to Watch */}
          <Button
            title="Where to Watch"
            onPress={() => {}}
            variant="outline"
            style={styles.watchButton}
          />
        </View>

        {/* Episodes Section */}
        <View style={styles.episodesSection}>
          <View style={styles.episodesHeader}>
            <Text style={styles.sectionTitle}>Episodes</Text>
            <Text style={styles.episodeCount}>{mockEpisodes.length} episodes</Text>
          </View>

          {mockEpisodes.map((episode) => (
            <Card key={episode.id} variant="glass" style={styles.episodeCard}>
              <TouchableOpacity
                onLongPress={() => handleMarkWatched(episode.id)}
                activeOpacity={0.8}
                style={styles.episodeContent}
              >
                <Image
                  source={{ uri: episode.thumbnail }}
                  style={[
                    styles.episodeThumbnail,
                    settings.blurThumbnails && styles.blurredImage,
                  ]}
                />
                <View style={styles.episodeInfo}>
                  <View style={styles.episodeTitleRow}>
                    <Text style={styles.episodeNumber}>EP {episode.episodeNumber}</Text>
                    {episode.watched && (
                      <View style={styles.watchedBadge}>
                        <Ionicons
                          name="checkmark-circle"
                          size={16}
                          color={Colors.neon.cyan}
                        />
                      </View>
                    )}
                  </View>
                  {!settings.spoilerProtection && (
                    <>
                      <Text style={styles.episodeTitle} numberOfLines={1}>
                        {episode.title}
                      </Text>
                      <Text style={styles.episodeDescription} numberOfLines={2}>
                        {episode.description}
                      </Text>
                    </>
                  )}
                  <Text style={styles.episodeDuration}>{episode.duration} min</Text>
                </View>
              </TouchableOpacity>
            </Card>
          ))}

          {/* Long Press Hint */}
          <View style={styles.hintContainer}>
            <Ionicons name="hand-left-outline" size={16} color={Colors.gray[400]} />
            <Text style={styles.hintText}>
              Long press an episode to mark as watched
            </Text>
          </View>
        </View>

        {/* Discussion Links */}
        <View style={styles.discussionSection}>
          <Text style={styles.sectionTitle}>Community</Text>
          <Card variant="glass" style={styles.discussionCard}>
            <TouchableOpacity style={styles.discussionLink}>
              <Ionicons name="chatbubbles" size={24} color={Colors.neon.violet} />
              <View style={styles.discussionInfo}>
                <Text style={styles.discussionTitle}>Episode Discussion</Text>
                <Text style={styles.discussionSubtitle}>Join the community</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={Colors.gray[400]} />
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
  headerContainer: {
    width: '100%',
    height: 300,
    position: 'relative',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  blurredImage: {
    opacity: 0.3,
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
  },
  backButton: {
    position: 'absolute',
    top: Spacing.md,
    left: Spacing.lg,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(11, 16, 32, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteButton: {
    position: 'absolute',
    top: Spacing.md,
    right: Spacing.lg,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(11, 16, 32, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContainer: {
    padding: Spacing.lg,
  },
  title: {
    fontSize: FontSizes['3xl'],
    fontWeight: '700',
    color: Colors.soft.white,
    marginBottom: Spacing.xs,
    fontFamily: 'SpaceGrotesk-Bold',
  },
  japaneseTitle: {
    fontSize: FontSizes.base,
    color: Colors.gray[400],
    marginBottom: Spacing.md,
    fontFamily: 'Rubik-Regular',
  },
  metaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
    gap: Spacing.md,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: FontSizes.sm,
    color: Colors.soft.white,
    fontFamily: 'Rubik-Regular',
  },
  metaDivider: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.gray[400],
  },
  genreContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.xs,
    marginBottom: Spacing.md,
  },
  genreBadge: {
    backgroundColor: 'rgba(124, 58, 237, 0.3)',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.sm,
  },
  genreText: {
    fontSize: FontSizes.xs,
    color: Colors.neon.violet,
    fontWeight: '600',
    fontFamily: 'Rubik-SemiBold',
  },
  description: {
    fontSize: FontSizes.sm,
    color: Colors.gray[400],
    lineHeight: 20,
    marginBottom: Spacing.lg,
    fontFamily: 'Rubik-Regular',
  },
  watchButton: {
    marginBottom: Spacing.lg,
  },
  episodesSection: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  episodesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    fontSize: FontSizes.xl,
    fontWeight: '700',
    color: Colors.soft.white,
    fontFamily: 'SpaceGrotesk-Bold',
  },
  episodeCount: {
    fontSize: FontSizes.sm,
    color: Colors.gray[400],
    fontFamily: 'Rubik-Regular',
  },
  episodeCard: {
    marginBottom: Spacing.md,
  },
  episodeContent: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  episodeThumbnail: {
    width: 120,
    height: 68,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.midnight[50],
  },
  episodeInfo: {
    flex: 1,
  },
  episodeTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: 4,
  },
  episodeNumber: {
    fontSize: FontSizes.sm,
    fontWeight: '600',
    color: Colors.neon.cyan,
    fontFamily: 'Rubik-SemiBold',
  },
  watchedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  episodeTitle: {
    fontSize: FontSizes.base,
    fontWeight: '600',
    color: Colors.soft.white,
    marginBottom: 4,
    fontFamily: 'Rubik-SemiBold',
  },
  episodeDescription: {
    fontSize: FontSizes.xs,
    color: Colors.gray[400],
    lineHeight: 16,
    marginBottom: 4,
    fontFamily: 'Rubik-Regular',
  },
  episodeDuration: {
    fontSize: FontSizes.xs,
    color: Colors.gray[500],
    fontFamily: 'Rubik-Regular',
  },
  hintContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.xs,
    marginTop: Spacing.md,
  },
  hintText: {
    fontSize: FontSizes.xs,
    color: Colors.gray[400],
    fontFamily: 'Rubik-Regular',
  },
  discussionSection: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.xl,
  },
  discussionCard: {
    marginTop: Spacing.md,
  },
  discussionLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  discussionInfo: {
    flex: 1,
  },
  discussionTitle: {
    fontSize: FontSizes.base,
    fontWeight: '600',
    color: Colors.soft.white,
    marginBottom: 4,
    fontFamily: 'Rubik-SemiBold',
  },
  discussionSubtitle: {
    fontSize: FontSizes.sm,
    color: Colors.gray[400],
    fontFamily: 'Rubik-Regular',
  },
  errorText: {
    fontSize: FontSizes.lg,
    color: Colors.soft.white,
    textAlign: 'center',
    marginTop: Spacing.xxl,
    fontFamily: 'Rubik-Regular',
  },
});
