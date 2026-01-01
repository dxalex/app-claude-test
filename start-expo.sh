#!/bin/bash
# Start Expo in offline mode to avoid api.expo.dev connection issues

echo "Starting AnimeSync in offline mode..."
EXPO_OFFLINE=1 npx expo start --offline --clear
