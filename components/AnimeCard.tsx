import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Anime } from '@/types';
import { Colors, Spacing, BorderRadius, FontSizes } from '@/constants/theme';
import { useAuthStore } from '@/store/authStore';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - Spacing.lg * 3) / 2;

interface AnimeCardProps {
  anime: Anime;
  onPress: () => void;
  variant?: 'portrait' | 'landscape';
}

export const AnimeCard: React.FC<AnimeCardProps> = ({
  anime,
  onPress,
  variant = 'portrait',
}) => {
  const { settings } = useAuthStore();

  if (variant === 'landscape') {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={styles.landscapeContainer}
        activeOpacity={0.8}
      >
        <Image
          source={{ uri: anime.coverImage }}
          style={[
            styles.landscapeImage,
            settings.blurThumbnails && styles.blurredImage,
          ]}
        />
        <LinearGradient
          colors={['transparent', 'rgba(11, 16, 32, 0.95)']}
          style={styles.landscapeGradient}
        >
          <View style={styles.landscapeContent}>
            <Text style={styles.landscapeTitle} numberOfLines={2}>
              {anime.title}
            </Text>
            {anime.genres && (
              <View style={styles.genreContainer}>
                {anime.genres.slice(0, 2).map((genre, index) => (
                  <View key={index} style={styles.genreBadge}>
                    <Text style={styles.genreText}>{genre}</Text>
                  </View>
                ))}
              </View>
            )}
            <View style={styles.landscapeInfo}>
              <View style={styles.infoItem}>
                <Ionicons name="star" size={14} color={Colors.neon.cyan} />
                <Text style={styles.infoText}>{anime.score?.toFixed(1) || 'N/A'}</Text>
              </View>
              <View style={styles.infoItem}>
                <Ionicons name="film-outline" size={14} color={Colors.gray[400]} />
                <Text style={styles.infoText}>{anime.episodes || '?'} eps</Text>
              </View>
            </View>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.container}
      activeOpacity={0.8}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: anime.coverImage }}
          style={[
            styles.image,
            settings.blurThumbnails && styles.blurredImage,
          ]}
        />
        {anime.score && (
          <View style={styles.scoreBadge}>
            <Ionicons name="star" size={12} color={Colors.neon.cyan} />
            <Text style={styles.scoreText}>{anime.score.toFixed(1)}</Text>
          </View>
        )}
      </View>
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {anime.title}
        </Text>
        <Text style={styles.subtitle} numberOfLines={1}>
          {anime.format} • {anime.episodes || '?'} eps
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: CARD_WIDTH,
    marginBottom: Spacing.md,
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 2 / 3,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    backgroundColor: Colors.midnight[50],
  },
  image: {
    width: '100%',
    height: '100%',
  },
  blurredImage: {
    opacity: 0.3,
  },
  scoreBadge: {
    position: 'absolute',
    top: Spacing.sm,
    right: Spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(11, 16, 32, 0.9)',
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.sm,
    gap: 4,
  },
  scoreText: {
    fontSize: FontSizes.xs,
    fontWeight: '600',
    color: Colors.soft.white,
  },
  content: {
    paddingTop: Spacing.sm,
  },
  title: {
    fontSize: FontSizes.sm,
    fontWeight: '600',
    color: Colors.soft.white,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: FontSizes.xs,
    color: Colors.gray[400],
  },
  landscapeContainer: {
    width: '100%',
    height: 180,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    marginBottom: Spacing.md,
  },
  landscapeImage: {
    width: '100%',
    height: '100%',
  },
  landscapeGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '60%',
    justifyContent: 'flex-end',
  },
  landscapeContent: {
    padding: Spacing.md,
  },
  landscapeTitle: {
    fontSize: FontSizes.lg,
    fontWeight: '700',
    color: Colors.soft.white,
    marginBottom: Spacing.xs,
  },
  genreContainer: {
    flexDirection: 'row',
    gap: Spacing.xs,
    marginBottom: Spacing.sm,
  },
  genreBadge: {
    backgroundColor: 'rgba(124, 58, 237, 0.3)',
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: BorderRadius.sm,
  },
  genreText: {
    fontSize: FontSizes.xs,
    color: Colors.neon.violet,
    fontWeight: '600',
  },
  landscapeInfo: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  infoText: {
    fontSize: FontSizes.xs,
    color: Colors.gray[400],
  },
});
