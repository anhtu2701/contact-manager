import { StyleSheet } from 'react-native';
import { Checkbox } from 'react-native-paper';

import { palette } from '@/constants/palette';

type FavoriteCheckboxProps = {
  label: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
};

export function FavoriteCheckbox({ label, checked, onCheckedChange }: FavoriteCheckboxProps) {
  return (
    <Checkbox.Item
      label={label}
      status={checked ? 'checked' : 'unchecked'}
      onPress={() => onCheckedChange(!checked)}
      color={palette.teal}
      position="leading"
      style={styles.item}
      labelStyle={styles.label}
    />
  );
}

const styles = StyleSheet.create({
  item: {
    paddingHorizontal: 0,
  },
  label: {
    textAlign: 'left',
  },
});
