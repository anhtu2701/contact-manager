import { Stack } from 'expo-router';
import { PaperProvider } from 'react-native-paper';

import { palette } from '@/constants/palette';
import { theme } from '@/constants/theme';
import { SessionProvider, useSession } from '@/context/session-context';

export default function RootLayout() {
  return (
    <PaperProvider theme={theme}>
      <SessionProvider>
        <RootStack />
      </SessionProvider>
    </PaperProvider>
  );
}

function RootStack() {
  const { isLoggedIn } = useSession();

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: palette.teal },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: { fontWeight: '700' },
        contentStyle: { backgroundColor: palette.background },
      }}>
      <Stack.Protected guard={!isLoggedIn}>
        <Stack.Screen name="login" options={{ headerShown: false }} />
      </Stack.Protected>

      <Stack.Protected guard={isLoggedIn} redirectTo="/login">
        <Stack.Screen name="index" options={{ title: 'Danh bạ của tôi' }} />
      </Stack.Protected>
    </Stack>
  );
}
