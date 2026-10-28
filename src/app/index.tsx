import { FlatList, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import { ContactItem } from '@/components/contact-item';
import { StatsCard } from '@/components/stats-card';
import { palette } from '@/constants/palette';
import { useContacts } from '@/context/contacts-context';

export default function ContactListScreen() {
  const { contacts } = useContacts();
  const favoriteCount = contacts.filter((contact) => contact.isFavorite).length;

  return (
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
      ItemSeparatorComponent={Separator}
      renderItem={({ item }) => <ContactItem contact={item} />}
    />
  );
}

function Separator() {
  return <View style={styles.separator} />;
}

const styles = StyleSheet.create({
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
});
