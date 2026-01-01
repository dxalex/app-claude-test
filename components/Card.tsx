import React, { ReactNode } from 'react';
import { View, StyleSheet, ViewStyle, TouchableOpacity } from 'react-native';
import { BlurView } from 'expo-blur';
import { Colors, BorderRadius, Spacing } from '@/constants/theme';

interface CardProps {
  children: ReactNode;
  variant?: 'glass' | 'solid' | 'outline';
  onPress?: () => void;
  style?: ViewStyle;
  blurred?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'glass',
  onPress,
  style,
  blurred = false,
}) => {
  const Container = onPress ? TouchableOpacity : View;

  if (variant === 'glass') {
    return (
      <Container
        onPress={onPress}
        style={[styles.container, style]}
        activeOpacity={onPress ? 0.8 : 1}
      >
        <BlurView intensity={20} tint="dark" style={styles.blur}>
          <View style={[styles.glassContent, blurred && styles.blurredContent]}>
            {children}
          </View>
        </BlurView>
      </Container>
    );
  }

  return (
    <Container
      onPress={onPress}
      style={[
        styles.container,
        variant === 'solid' && styles.solid,
        variant === 'outline' && styles.outline,
        blurred && styles.blurredContent,
        style,
      ]}
      activeOpacity={onPress ? 0.8 : 1}
    >
      {children}
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
  },
  blur: {
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  glassContent: {
    padding: Spacing.md,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  solid: {
    backgroundColor: Colors.midnight[50],
    padding: Spacing.md,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.midnight[50],
    padding: Spacing.md,
  },
  blurredContent: {
    opacity: 0.3,
  },
});
