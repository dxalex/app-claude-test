import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { format, addDays } from 'date-fns';
import { Card } from '@/components/Card';
import { Colors, Spacing, FontSizes, BorderRadius } from '@/constants/theme';

const mockSchedule = [
  {
    id: '1',
    anime: 'Jujutsu Kaisen',
    episode: 24,
    airDate: new Date(),
    time: '12:00 PM',
    spoilerLevel: 'low',
  },
  {
    id: '2',
    anime: 'Attack on Titan: Final Season',
    episode: 29,
    airDate: addDays(new Date(), 1),
    time: '3:45 PM',
    spoilerLevel: 'high',
  },
  {
    id: '3',
    anime: 'Demon Slayer: Kimetsu no Yaiba',
    episode: 12,
    airDate: addDays(new Date(), 2),
    time: '11:30 AM',
    spoilerLevel: 'medium',
  },
];

export default function Calendar() {
  const [selectedDay, setSelectedDay] = useState(0);

  const getSpoilerColor = (level: string) => {
    switch (level) {
      case 'low':
        return '#10B981';
      case 'medium':
        return '#F59E0B';
      case 'high':
        return '#EF4444';
      default:
        return Colors.gray[400];
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Release Calendar</Text>
          <Text style={styles.subtitle}>Never miss a new episode</Text>
        </View>

        {/* Week Selector */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.weekContainer}
        >
          {[0, 1, 2, 3, 4, 5, 6].map((day) => {
            const date = addDays(new Date(), day);
            const isSelected = selectedDay === day;

            return (
              <TouchableOpacity
                key={day}
                onPress={() => setSelectedDay(day)}
                style={[styles.dayCard, isSelected && styles.selectedDayCard]}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.dayName,
                    isSelected && styles.selectedDayText,
                  ]}
                >
                  {format(date, 'EEE')}
                </Text>
                <Text
                  style={[
                    styles.dayNumber,
                    isSelected && styles.selectedDayText,
                  ]}
                >
                  {format(date, 'd')}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Today's Releases */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              {selectedDay === 0 ? 'Today' : format(addDays(new Date(), selectedDay), 'EEEE')}
            </Text>
            <Text style={styles.releaseCount}>3 releases</Text>
          </View>

          {mockSchedule.map((item) => (
            <Card key={item.id} variant="glass" style={styles.scheduleCard}>
              <View style={styles.scheduleContent}>
                <View style={styles.timeContainer}>
                  <Ionicons name="time-outline" size={20} color={Colors.neon.cyan} />
                  <Text style={styles.time}>{item.time}</Text>
                </View>

                <View style={styles.scheduleInfo}>
                  <Text style={styles.animeName}>{item.anime}</Text>
                  <Text style={styles.episodeInfo}>Episode {item.episode}</Text>

                  <View style={styles.spoilerBadge}>
                    <View
                      style={[
                        styles.spoilerDot,
                        { backgroundColor: getSpoilerColor(item.spoilerLevel) },
                      ]}
                    />
                    <Text style={styles.spoilerText}>
                      {item.spoilerLevel.toUpperCase()} SPOILER RISK
                    </Text>
                  </View>
                </View>

                <TouchableOpacity style={styles.notifyButton}>
                  <Ionicons
                    name="notifications-outline"
                    size={20}
                    color={Colors.neon.violet}
                  />
                </TouchableOpacity>
              </View>
            </Card>
          ))}
        </View>

        {/* Timezone Info */}
        <View style={styles.timezoneContainer}>
          <Ionicons name="globe-outline" size={16} color={Colors.gray[400]} />
          <Text style={styles.timezoneText}>Times shown in UTC (GMT+0)</Text>
          <TouchableOpacity>
            <Text style={styles.changeLink}>Change</Text>
          </TouchableOpacity>
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
    padding: Spacing.lg,
  },
  title: {
    fontSize: FontSizes['2xl'],
    fontWeight: '700',
    color: Colors.soft.white,
    fontFamily: 'SpaceGrotesk-Bold',
  },
  subtitle: {
    fontSize: FontSizes.sm,
    color: Colors.gray[400],
    marginTop: 4,
    fontFamily: 'Rubik-Regular',
  },
  weekContainer: {
    paddingHorizontal: Spacing.lg,
    gap: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  dayCard: {
    width: 60,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.midnight[50],
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedDayCard: {
    backgroundColor: Colors.neon.violet,
    borderColor: Colors.neon.cyan,
  },
  dayName: {
    fontSize: FontSizes.xs,
    color: Colors.gray[400],
    marginBottom: 4,
    fontFamily: 'Rubik-Regular',
  },
  dayNumber: {
    fontSize: FontSizes.xl,
    fontWeight: '700',
    color: Colors.soft.white,
    fontFamily: 'SpaceGrotesk-Bold',
  },
  selectedDayText: {
    color: Colors.soft.white,
  },
  section: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  sectionHeader: {
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
  releaseCount: {
    fontSize: FontSizes.sm,
    color: Colors.neon.cyan,
    fontWeight: '600',
    fontFamily: 'Rubik-SemiBold',
  },
  scheduleCard: {
    marginBottom: Spacing.md,
  },
  scheduleContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.md,
  },
  timeContainer: {
    alignItems: 'center',
    gap: 4,
  },
  time: {
    fontSize: FontSizes.xs,
    color: Colors.soft.white,
    fontWeight: '600',
    fontFamily: 'Rubik-SemiBold',
  },
  scheduleInfo: {
    flex: 1,
  },
  animeName: {
    fontSize: FontSizes.base,
    fontWeight: '600',
    color: Colors.soft.white,
    marginBottom: 4,
    fontFamily: 'Rubik-SemiBold',
  },
  episodeInfo: {
    fontSize: FontSizes.sm,
    color: Colors.gray[400],
    marginBottom: Spacing.sm,
    fontFamily: 'Rubik-Regular',
  },
  spoilerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  spoilerDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  spoilerText: {
    fontSize: FontSizes.xs,
    color: Colors.gray[400],
    fontWeight: '600',
    fontFamily: 'Rubik-SemiBold',
  },
  notifyButton: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.md,
    backgroundColor: 'rgba(124, 58, 237, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  timezoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.xl,
  },
  timezoneText: {
    fontSize: FontSizes.xs,
    color: Colors.gray[400],
    fontFamily: 'Rubik-Regular',
  },
  changeLink: {
    fontSize: FontSizes.xs,
    color: Colors.neon.violet,
    fontWeight: '600',
    fontFamily: 'Rubik-SemiBold',
  },
});
