import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import { palette } from '@/constants/palette';

type StatsCardProps = {
  total: number;
  favorites: number;
};

export function StatsCard({ total, favorites }: StatsCardProps) {
  return (
    <View style={styles.card}>
      <Text variant="bodyMedium" style={styles.caption}>
        Thống kê
      </Text>
      <View style={styles.row}>
        <StatItem value={total} label="Tổng liên hệ" />
        <StatItem value={favorites} label="Yêu thích" />
      </View>
    </View>
  );
}

type StatItemProps = {
  value: number;
  label: string;
};

function StatItem({ value, label }: StatItemProps) {
  return (
    <View>
      <Text variant="displaySmall" style={styles.value}>
        {value}
      </Text>
      <Text variant="bodySmall" style={styles.caption}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: 8,
    padding: 20,
    borderRadius: 16,
    backgroundColor: palette.teal,
  },
  row: {
    flexDirection: 'row',
    gap: 48,
  },
  value: {
    color: '#FFFFFF',
    fontWeight: '800',
  },
  caption: {
    color: 'rgba(255,255,255,0.85)',
  },
});
