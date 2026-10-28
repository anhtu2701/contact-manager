import { Star } from 'lucide-react-native';
import { StyleSheet, View } from 'react-native';
import { Card, Text } from 'react-native-paper';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { AvatarInitial } from '@/components/ui/avatar-initial';
import { GroupChip } from '@/components/ui/group-chip';
import { GROUP_AVATAR_COLORS } from '@/constants/contacts';
import { palette } from '@/constants/palette';
import type { Contact } from '@/types/contact';
import { formatPhone } from '@/utils/format-phone';

type ContactItemProps = {
  contact: Contact;
  onPress: () => void;
};

export function ContactItem({ contact, onPress }: ContactItemProps) {
  return (
    <Animated.View entering={FadeInDown}>
      <Card mode="outlined" style={styles.card} onPress={onPress}>
        <View style={styles.row}>
          <AvatarInitial name={contact.fullName} color={GROUP_AVATAR_COLORS[contact.group]} />
          <View style={styles.info}>
            <Text variant="titleMedium" style={styles.name}>
              {contact.fullName}
            </Text>
            <Text variant="bodyMedium" style={styles.phone}>
              {formatPhone(contact.phone)}
            </Text>
            <GroupChip group={contact.group} />
          </View>
          {contact.isFavorite ? <Star size={20} color={palette.amber} fill={palette.amber} /> : null}
        </View>
      </Card>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    padding: 16,
  },
  info: {
    flex: 1,
    gap: 4,
  },
  name: {
    fontWeight: '700',
  },
  phone: {
    color: palette.muted,
  },
});
