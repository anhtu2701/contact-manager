import { StyleSheet, View } from 'react-native';
import { RadioButton } from 'react-native-paper';

import { palette } from '@/constants/palette';
import { GENDERS, type Gender } from '@/types/contact';

type GenderRadioGroupProps = {
  value: Gender;
  onValueChange: (value: Gender) => void;
};

export function GenderRadioGroup({ value, onValueChange }: GenderRadioGroupProps) {
  return (
    <RadioButton.Group value={value} onValueChange={(next) => onValueChange(next as Gender)}>
      <View style={styles.row}>
        {GENDERS.map((gender) => (
          <RadioButton.Item
            key={gender}
            value={gender}
            label={gender}
            color={palette.teal}
            position="leading"
            style={styles.item}
            labelStyle={styles.label}
          />
        ))}
      </View>
    </RadioButton.Group>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  item: {
    flex: 1,
    paddingHorizontal: 0,
  },
  label: {
    textAlign: 'left',
  },
});
