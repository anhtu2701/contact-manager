import { Stack } from 'expo-router';
import { PaperProvider } from 'react-native-paper';

import { palette } from '@/constants/palette';
import { theme } from '@/constants/theme';
import { ContactsProvider } from '@/context/contacts-context';
import { SessionProvider, useSession } from '@/context/session-context';

export default function RootLayout() {
  return (
    <PaperProvider theme={theme}>
      <SessionProvider>
        <ContactsProvider>
          <RootStack />
        </ContactsProvider>
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
        <Stack.Screen name="add" options={{ title: 'Thêm liên hệ' }} />
        <Stack.Screen name="contact/[id]" options={{ title: 'Chi tiết liên hệ' }} />
      </Stack.Protected>
    </Stack>
  );
}
