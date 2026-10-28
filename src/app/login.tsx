import { BookUser, Lock, UserRound } from 'lucide-react-native';
import { MorphIcon } from 'morphicons/react-native';
import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, HelperText, Text, TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ACCOUNT } from '@/constants/auth';
import { MORPH_ICONS } from '@/constants/icons';
import { palette } from '@/constants/palette';
import { useSession } from '@/context/session-context';

export default function LoginScreen() {
  const { signIn } = useSession();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = () => {
    setError('');
    if (!username.trim() || !password) {
      setError('Vui lòng nhập tên đăng nhập và mật khẩu');
      return;
    }
    if (!signIn(username.trim(), password)) {
      setError('Sai tên đăng nhập hoặc mật khẩu');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <View style={styles.logo}>
          <BookUser size={44} color="#FFFFFF" />
        </View>
        <Text variant="headlineMedium" style={styles.title}>
          Danh bạ
        </Text>
        <Text variant="bodyMedium" style={styles.subtitle}>
          Đăng nhập để tiếp tục
        </Text>

        <TextInput
          mode="outlined"
          label="Tên đăng nhập"
          placeholder="Nhập tên đăng nhập"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
          autoCorrect={false}
          left={<TextInput.Icon icon={({ size, color }) => <UserRound size={size} color={color} />} />}
          outlineStyle={styles.inputOutline}
          style={styles.input}
        />
        <TextInput
          mode="outlined"
          label="Mật khẩu"
          placeholder="Nhập mật khẩu"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!isPasswordVisible}
          autoCapitalize="none"
          autoCorrect={false}
          left={<TextInput.Icon icon={({ size, color }) => <Lock size={size} color={color} />} />}
          right={
            <TextInput.Icon
              onPress={() => setIsPasswordVisible((visible) => !visible)}
              icon={({ size, color }) => (
                <MorphIcon
                  icon={isPasswordVisible ? MORPH_ICONS.eyeOff : MORPH_ICONS.eye}
                  size={size}
                  color={color}
                />
              )}
            />
          }
          outlineStyle={styles.inputOutline}
          style={styles.input}
        />
        <HelperText type="error" visible={error !== ''}>
          {error}
        </HelperText>

        <Button
          mode="contained"
          onPress={handleLogin}
          style={styles.button}
          contentStyle={styles.buttonContent}
          labelStyle={styles.buttonLabel}>
          Đăng nhập
        </Button>

        <Text variant="bodySmall" style={styles.hint}>
          Tài khoản mẫu: {ACCOUNT.username} / {ACCOUNT.password}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: palette.background,
  },
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },
  logo: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: palette.teal,
  },
  title: {
    marginTop: 16,
    textAlign: 'center',
    fontWeight: '800',
  },
  subtitle: {
    marginTop: 4,
    marginBottom: 32,
    textAlign: 'center',
    color: palette.muted,
  },
  input: {
    marginBottom: 16,
    backgroundColor: palette.surface,
  },
  inputOutline: {
    borderRadius: 12,
  },
  button: {
    marginTop: 8,
    borderRadius: 999,
  },
  buttonContent: {
    height: 52,
  },
  buttonLabel: {
    fontSize: 17,
    fontWeight: '700',
  },
  hint: {
    marginTop: 16,
    textAlign: 'center',
    color: palette.muted,
  },
});
