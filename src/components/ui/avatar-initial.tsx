import { Avatar } from 'react-native-paper';

type AvatarInitialProps = {
  name: string;
  color: string;
  size?: number;
};

export function AvatarInitial({ name, color, size = 56 }: AvatarInitialProps) {
  const words = name.trim().split(/\s+/);
  const initial = words[words.length - 1]?.charAt(0).toUpperCase() ?? '';

  return (
    <Avatar.Text
      label={initial}
      size={size}
      color="#FFFFFF"
      style={{ backgroundColor: color }}
      labelStyle={{ fontWeight: '800' }}
    />
  );
}
