import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import { GROUP_ICONS } from '@/constants/icons';
import { palette } from '@/constants/palette';
import type { ContactGroup } from '@/types/contact';

type GroupChipProps = {
  group: ContactGroup;
};

export function GroupChip({ group }: GroupChipProps) {
  const Icon = GROUP_ICONS[group];

  return (
    <View style={styles.chip}>
      <Icon size={12} color={palette.tealDark} />
      <Text variant="labelSmall" style={styles.label}>
        {group}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: palette.tealSoft,
  },
  label: {
    color: palette.tealDark,
    fontWeight: '700',
  },
});
