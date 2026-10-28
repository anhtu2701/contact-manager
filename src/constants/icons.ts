import { __iconData as chevronDownData } from 'lucide-react-native/icons/chevron-down';
import { __iconData as chevronUpData } from 'lucide-react-native/icons/chevron-up';
import { __iconData as eyeData } from 'lucide-react-native/icons/eye';
import { __iconData as eyeOffData } from 'lucide-react-native/icons/eye-off';
import { Briefcase, House, Tag, Users, type LucideIcon } from 'lucide-react-native';
import type { IconInput } from 'morphicons/react-native';

import type { ContactGroup } from '@/types/contact';

const toMorphIcon = (data: { node: unknown }) => data.node as IconInput;

export const MORPH_ICONS = {
  eye: toMorphIcon(eyeData),
  eyeOff: toMorphIcon(eyeOffData),
  chevronDown: toMorphIcon(chevronDownData),
  chevronUp: toMorphIcon(chevronUpData),
};

export const GROUP_ICONS: Record<ContactGroup, LucideIcon> = {
  'Gia đình': House,
  'Bạn bè': Users,
  'Công việc': Briefcase,
  Khác: Tag,
};
