import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Input } from '@/components/Input';
import { AnimeCard } from '@/components/AnimeCard';
import { Colors, Spacing, FontSizes } from '@/constants/theme';
import { useAnimeStore } from '@/store/animeStore';

const genres = ['Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Romance', 'Sci-Fi', 'Slice of Life'];

export default function Search() {
  const router = useRouter();
  const { newThisWeek } = useAnimeStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Discover Anime</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Input
          placeholder="Search for anime..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          icon="search"
        />
      </View>

      {/* Genre Filter */}
      <View style={styles.genreSection}>
        <Text style={styles.sectionTitle}>Genres</Text>
        <FlatList
          horizontal
          data={genres}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                setSelectedGenre(selectedGenre === item ? null : item)
              }
              style={[
                styles.genreChip,
                selectedGenre === item && styles.selectedGenreChip,
              ]}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.genreText,
                  selectedGenre === item && styles.selectedGenreText,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.genreList}
        />
      </View>

      {/* Results */}
      <FlatList
        data={newThisWeek}
        renderItem={({ item }) => (
          <View style={styles.cardContainer}>
            <AnimeCard
              anime={item}
              onPress={() => router.push(`/show/${item.id}`)}
              variant="portrait"
            />
          </View>
        )}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.midnight.DEFAULT,
  },
  header: {
    padding: Spacing.lg,
    paddingBottom: 0,
  },
  title: {
    fontSize: FontSizes['2xl'],
    fontWeight: '700',
    color: Colors.soft.white,
    fontFamily: 'SpaceGrotesk-Bold',
  },
  searchContainer: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
  },
  genreSection: {
    paddingTop: Spacing.lg,
  },
  sectionTitle: {
    fontSize: FontSizes.base,
    fontWeight: '600',
    color: Colors.soft.white,
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.sm,
    fontFamily: 'Rubik-SemiBold',
  },
  genreList: {
    paddingHorizontal: Spacing.lg,
    gap: Spacing.sm,
  },
  genreChip: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    backgroundColor: Colors.midnight[50],
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  selectedGenreChip: {
    backgroundColor: 'rgba(124, 58, 237, 0.3)',
    borderColor: Colors.neon.violet,
  },
  genreText: {
    fontSize: FontSizes.sm,
    color: Colors.gray[400],
    fontWeight: '600',
    fontFamily: 'Rubik-SemiBold',
  },
  selectedGenreText: {
    color: Colors.neon.violet,
  },
  list: {
    padding: Spacing.lg,
  },
  row: {
    justifyContent: 'space-between',
  },
  cardContainer: {
    width: '48%',
  },
});
