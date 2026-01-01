# AnimeSync - Anime Tracking App

A modern iOS app for tracking your anime watch progress across devices while avoiding spoilers and catching new episode drops.

## Features

### 🎯 Core Features

- **Multi-source Tracking**: Sync with MyAnimeList, AniList, or track manually
- **Continue Watching**: Pick up where you left off with progress tracking
- **New This Week**: Stay updated with the latest episode releases
- **Release Calendar**: Never miss a new episode with timezone-aware schedules
- **Spoiler Protection**: Blur thumbnails and hide descriptions to avoid spoilers
- **Episode Tracking**: Mark episodes as watched with quick actions (long-press)
- **Search & Discovery**: Find anime by title and filter by genre
- **Notifications**: Get alerts for new episodes and community spoiler warnings
- **Community Links**: Access episode discussions and community content

### 🎨 Design

Modern "otaku" aesthetic with:
- **Color Palette**:
  - Midnight: `#0B1020` (Primary background)
  - Neon Violet: `#7C3AED` (Primary accent)
  - Electric Cyan: `#22D3EE` (Secondary accent)
  - Soft White: `#F8FAFC` (Text)

- **Typography**:
  - Body: Rubik
  - Headings: Space Grotesk

- **UI Features**:
  - Glass morphism effects
  - Gradient accents
  - Smooth animations
  - Haptic feedback

## Tech Stack

- **Framework**: Expo + React Native
- **Language**: TypeScript
- **Navigation**: Expo Router (file-based routing)
- **State Management**: Zustand
- **Storage**: React Native MMKV + Expo SecureStore
- **UI Components**: Custom components with Expo Linear Gradient & Blur
- **Icons**: Expo Vector Icons (Ionicons)
- **Date Handling**: date-fns

## Project Structure

```
app-claude-test/
├── app/                      # Expo Router screens
│   ├── (auth)/              # Authentication flow
│   │   ├── signin.tsx       # Sign in screen
│   │   └── signup.tsx       # Sign up screen
│   ├── (tabs)/              # Main app tabs
│   │   ├── index.tsx        # Home/Dashboard
│   │   ├── calendar.tsx     # Release calendar
│   │   ├── search.tsx       # Search & discovery
│   │   ├── notifications.tsx # Notifications center
│   │   └── profile.tsx      # Profile & settings
│   ├── show/
│   │   └── [id].tsx         # Show detail page
│   ├── onboarding.tsx       # Onboarding flow
│   ├── _layout.tsx          # Root layout
│   └── index.tsx            # Entry point
├── components/              # Reusable UI components
│   ├── Button.tsx          # Custom button
│   ├── Card.tsx            # Card component
│   ├── Input.tsx           # Input field
│   └── AnimeCard.tsx       # Anime card component
├── constants/              # App constants
│   └── theme.ts           # Theme configuration
├── store/                 # Zustand stores
│   ├── authStore.ts      # Authentication state
│   └── animeStore.ts     # Anime data state
├── types/                # TypeScript types
│   └── index.ts         # Type definitions
├── utils/               # Utility functions
│   └── storage.ts      # Storage utilities
└── prisma/             # Database schema (for future backend)
    └── schema.prisma  # Prisma schema
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Expo Go app (for quick testing) or iOS Simulator (Xcode)
- EAS CLI (for production builds): `npm install -g eas-cli`

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd app-claude-test
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npx expo start
```

4. Run on iOS:
   - **Using Expo Go** (easiest):
     - Install Expo Go from the App Store
     - Scan the QR code from the terminal

   - **Using iOS Simulator**:
     ```bash
     npx expo start --ios
     ```

   - **Building with EAS** (for development builds):
     ```bash
     # Install EAS CLI
     npm install -g eas-cli

     # Login to Expo
     eas login

     # Build for iOS simulator
     eas build --profile development --platform ios
     ```

## Build Configuration

The project includes EAS Build configuration (`eas.json`) with three profiles:

- **development**: For testing on simulator/device with development client
- **preview**: For internal testing on physical devices
- **production**: For App Store submission

To build:
```bash
# Development build for simulator
eas build --profile development --platform ios

# Preview build for testing
eas build --profile preview --platform ios

# Production build
eas build --profile production --platform ios
```

## Usage

### Authentication

1. Open the app and sign up with email/password
2. Or sign in if you already have an account

### Onboarding

1. Choose your tracking source (Manual, MyAnimeList, or AniList)
2. Configure privacy settings
3. Start tracking!

### Main Features

**Dashboard**
- View "Continue Watching" to resume where you left off
- Check "New This Week" for latest episodes
- Quick access to search, calendar, and your list

**Calendar**
- Browse upcoming releases by day
- Set notifications for specific shows
- View spoiler risk levels

**Show Detail**
- View anime information and episodes
- Long-press episodes to mark as watched
- Access community discussions
- Find where to watch

**Settings**
- Toggle spoiler protection
- Adjust thumbnail blur settings
- Configure release alerts
- Manage episode list density

## Key Features Implementation

### Spoiler Protection

The app implements multiple layers of spoiler protection:

1. **Blur Thumbnails**: Automatically blur anime covers and episode thumbnails
2. **Hide Descriptions**: Conceal episode titles and descriptions
3. **Spoiler Levels**: Color-coded spoiler risk indicators (low/medium/high)

```typescript
// In useAuthStore
settings: {
  spoilerProtection: true,
  blurThumbnails: true,
  // ...
}
```

### Episode Tracking

Quick actions for marking episodes:

- **Single Tap**: View episode details
- **Long Press**: Mark episode as watched (with haptic feedback)

```typescript
// In show/[id].tsx
<TouchableOpacity
  onLongPress={() => handleMarkWatched(episode.id)}
>
  {/* Episode content */}
</TouchableOpacity>
```

### Storage

The app uses a hybrid storage approach:

- **Secure Store**: For sensitive data (auth tokens)
- **MMKV**: For fast, encrypted local storage (user preferences, cache)

```typescript
// Secure data
await secureStorage.setItem('user_token', token);

// Fast local storage
localStorage.setItem('user_data', userData);
```

## Customization

### Theme

Edit `constants/theme.ts` to customize colors, fonts, and spacing:

```typescript
export const Colors = {
  midnight: { DEFAULT: '#0B1020', /* ... */ },
  neon: { violet: '#7C3AED', cyan: '#22D3EE' },
  // ...
};
```

### Add New Features

1. Create a new screen in `app/` directory
2. Add types in `types/index.ts`
3. Update store in `store/` if needed
4. Use existing components or create new ones

## Future Enhancements

- [ ] Backend API integration
- [ ] Real-time sync with MAL/AniList
- [ ] Push notifications
- [ ] Offline mode
- [ ] Social features (friends, recommendations)
- [ ] Watch together feature
- [ ] Advanced statistics and insights
- [ ] Widget support
- [ ] Apple Watch companion app

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Acknowledgments

- Design inspiration from modern anime tracking platforms
- Icons by Ionicons
- Fonts: Rubik & Space Grotesk from Google Fonts

---

**Note**: This app is currently using mock data. Integration with real anime APIs (MyAnimeList, AniList, Jikan) will be implemented in future updates.
