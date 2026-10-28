import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

export default function ContactListScreen() {
  return (
    <View style={styles.container}>
      <Text variant="titleMedium">Danh bạ</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
