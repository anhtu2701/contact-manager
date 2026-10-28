import { Check } from 'lucide-react-native';
import { MorphIcon } from 'morphicons/react-native';
import { useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Menu, Text } from 'react-native-paper';

import { GROUP_ICONS, MORPH_ICONS } from '@/constants/icons';
import { palette } from '@/constants/palette';
import { CONTACT_GROUPS, type ContactGroup } from '@/types/contact';

type GroupSelectProps = {
  value: ContactGroup;
  onValueChange: (value: ContactGroup) => void;
};

export function GroupSelect({ value, onValueChange }: GroupSelectProps) {
  const [open, setOpen] = useState(false);
  const ValueIcon = GROUP_ICONS[value];

  const handleSelect = (group: ContactGroup) => {
    onValueChange(group);
    setOpen(false);
  };

  return (
    <Menu
      visible={open}
      onDismiss={() => setOpen(false)}
      anchorPosition="bottom"
      contentStyle={styles.menu}
      anchor={
        <Pressable onPress={() => setOpen(true)} style={styles.trigger}>
          <ValueIcon size={18} color={palette.teal} />
          <Text variant="bodyLarge" style={styles.value}>
            {value}
          </Text>
          <MorphIcon
            icon={open ? MORPH_ICONS.chevronUp : MORPH_ICONS.chevronDown}
            size={18}
            color={palette.muted}
          />
        </Pressable>
      }>
      {CONTACT_GROUPS.map((group) => {
        const Icon = GROUP_ICONS[group];
        return (
          <Menu.Item
            key={group}
            title={group}
            leadingIcon={({ size, color }) => <Icon size={size} color={color} />}
            trailingIcon={
              group === value
                ? ({ size }) => <Check size={size} color={palette.teal} />
                : undefined
            }
            onPress={() => handleSelect(group)}
          />
        );
      })}
    </Menu>
  );
}

const styles = StyleSheet.create({
  trigger: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    height: 56,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: palette.border,
    backgroundColor: palette.surface,
  },
  value: {
    flex: 1,
  },
  menu: {
    backgroundColor: palette.surface,
  },
});
