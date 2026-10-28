import * as Linking from 'expo-linking';
import { router, useLocalSearchParams } from 'expo-router';
import { PhoneCall, Trash2 } from 'lucide-react-native';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import { Button, Card, Divider, Text } from 'react-native-paper';

import { AvatarInitial } from '@/components/ui/avatar-initial';
import { FavoriteCheckbox } from '@/components/ui/favorite-checkbox';
import { GROUP_AVATAR_COLORS } from '@/constants/contacts';
import { palette } from '@/constants/palette';
import { useContacts } from '@/context/contacts-context';
import { formatPhone } from '@/utils/format-phone';

export default function ContactDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { getContact, toggleFavorite, removeContact } = useContacts();
  const contact = getContact(id);

  if (!contact) {
    return null;
  }

  const handleCall = () => {
    Linking.openURL(`tel:${contact.phone}`).catch(() =>
      Alert.alert('Không thể mở ứng dụng gọi điện'),
    );
  };

  const handleDelete = () => {
    removeContact(contact.id);
    router.back();
  };

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <Card mode="outlined" style={styles.card}>
        <View style={styles.cardBody}>
          <View style={styles.header}>
            <AvatarInitial
              name={contact.fullName}
              color={GROUP_AVATAR_COLORS[contact.group]}
              size={72}
            />
            <View style={styles.headerText}>
              <Text variant="titleLarge" style={styles.name}>
                {contact.fullName}
              </Text>
              <Text variant="titleMedium" style={styles.phone}>
                {formatPhone(contact.phone)}
              </Text>
            </View>
          </View>

          <Divider />

          <View style={styles.row}>
            <DetailField label="Nhóm" value={contact.group} />
            <DetailField label="Giới tính" value={contact.gender} />
          </View>

          <DetailField label="Ghi chú" value={contact.note || 'Chưa có ghi chú'} />

          <Divider />

          <FavoriteCheckbox
            label="Yêu thích"
            checked={contact.isFavorite}
            onCheckedChange={() => toggleFavorite(contact.id)}
          />
        </View>
      </Card>

      <Button
        mode="contained"
        icon={({ size, color }) => <PhoneCall size={size} color={color} />}
        onPress={handleCall}
        style={styles.button}
        contentStyle={styles.buttonContent}
        labelStyle={styles.buttonLabel}>
        Gọi điện
      </Button>

      <Button
        mode="outlined"
        onPress={() => router.back()}
        style={[styles.button, styles.outlinedButton]}
        contentStyle={styles.buttonContent}
        labelStyle={styles.buttonLabel}>
        Quay lại
      </Button>

      <Button
        mode="contained"
        buttonColor={palette.red}
        icon={({ size, color }) => <Trash2 size={size} color={color} />}
        onPress={handleDelete}
        style={styles.button}
        contentStyle={styles.buttonContent}
        labelStyle={styles.buttonLabel}>
        Xóa liên hệ
      </Button>
    </ScrollView>
  );
}

type DetailFieldProps = {
  label: string;
  value: string;
};

function DetailField({ label, value }: DetailFieldProps) {
  return (
    <View style={styles.field}>
      <Text variant="labelLarge" style={styles.fieldLabel}>
        {label}
      </Text>
      <Text variant="bodyLarge">{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 16,
    gap: 16,
  },
  card: {
    borderRadius: 16,
  },
  cardBody: {
    gap: 16,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  headerText: {
    flex: 1,
    gap: 4,
  },
  name: {
    fontWeight: '800',
  },
  phone: {
    color: palette.teal,
    fontWeight: '700',
  },
  row: {
    flexDirection: 'row',
  },
  field: {
    flex: 1,
    gap: 2,
  },
  fieldLabel: {
    color: palette.muted,
  },
  button: {
    borderRadius: 999,
  },
  outlinedButton: {
    borderColor: palette.teal,
    borderWidth: 2,
  },
  buttonContent: {
    height: 52,
  },
  buttonLabel: {
    fontSize: 17,
    fontWeight: '700',
  },
});
