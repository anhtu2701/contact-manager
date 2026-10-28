import { router } from 'expo-router';
import { Plus } from 'lucide-react-native';
import { FlatList, StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ContactItem } from '@/components/contact-item';
import { StatsCard } from '@/components/stats-card';
import { palette } from '@/constants/palette';
import { useContacts } from '@/context/contacts-context';

export default function ContactListScreen() {
  const { contacts } = useContacts();
  const { bottom } = useSafeAreaInsets();
  const favoriteCount = contacts.filter((contact) => contact.isFavorite).length;

  return (
    <View style={styles.container}>
      <FlatList
        data={contacts}
        keyExtractor={(contact) => contact.id}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <View style={styles.header}>
            <StatsCard total={contacts.length} favorites={favoriteCount} />
            <Text variant="titleSmall" style={styles.sectionTitle}>
              Danh sách liên hệ
            </Text>
          </View>
        }
        ListEmptyComponent={
          <Text variant="bodyMedium" style={styles.empty}>
            Chưa có liên hệ nào
          </Text>
        }
        ListFooterComponent={
          contacts.length > 0 ? (
            <Text variant="bodySmall" style={styles.hint}>
              Nhấn vào một liên hệ để xem chi tiết
            </Text>
          ) : undefined
        }
        ItemSeparatorComponent={Separator}
        renderItem={({ item }) => (
          <ContactItem contact={item} onPress={() => router.push(`/contact/${item.id}`)} />
        )}
      />

      <View style={[styles.footer, { paddingBottom: bottom + 12 }]}>
        <Button
          mode="contained"
          icon={({ size, color }) => <Plus size={size} color={color} />}
          onPress={() => router.push('/add')}
          style={styles.button}
          contentStyle={styles.buttonContent}
          labelStyle={styles.buttonLabel}>
          Thêm liên hệ
        </Button>
      </View>
    </View>
  );
}

function Separator() {
  return <View style={styles.separator} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    padding: 16,
  },
  header: {
    gap: 16,
    marginBottom: 12,
  },
  sectionTitle: {
    color: palette.muted,
    fontWeight: '700',
  },
  separator: {
    height: 12,
  },
  empty: {
    marginTop: 48,
    textAlign: 'center',
    color: palette.muted,
  },
  hint: {
    marginTop: 16,
    textAlign: 'center',
    color: palette.muted,
  },
  footer: {
    paddingTop: 12,
    paddingHorizontal: 16,
    backgroundColor: palette.background,
  },
  button: {
    borderRadius: 999,
  },
  buttonContent: {
    height: 52,
  },
  buttonLabel: {
    fontSize: 17,
    fontWeight: '700',
  },
});
