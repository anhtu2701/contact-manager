import { __iconData as eyeData } from 'lucide-react-native/icons/eye';
import { __iconData as eyeOffData } from 'lucide-react-native/icons/eye-off';
import type { IconInput } from 'morphicons/react-native';

const toMorphIcon = (data: { node: unknown }) => data.node as IconInput;

export const MORPH_ICONS = {
  eye: toMorphIcon(eyeData),
  eyeOff: toMorphIcon(eyeOffData),
};
