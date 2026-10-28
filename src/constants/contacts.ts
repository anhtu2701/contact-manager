import { palette } from '@/constants/palette';
import type { Contact, ContactGroup } from '@/types/contact';

export const GROUP_AVATAR_COLORS: Record<ContactGroup, string> = {
  'Gia đình': palette.orange,
  'Bạn bè': palette.teal,
  'Công việc': palette.purple,
  Khác: palette.slate,
};

export const SEED_CONTACTS: Contact[] = [
  {
    id: '1',
    fullName: 'Nguyễn Văn An',
    phone: '0901234567',
    group: 'Bạn bè',
    gender: 'Nam',
    isFavorite: false,
    note: '',
  },
  {
    id: '2',
    fullName: 'Trần Thị Bình',
    phone: '0912345678',
    group: 'Gia đình',
    gender: 'Nữ',
    isFavorite: true,
    note: 'Chị gái, hay gọi buổi tối',
  },
  {
    id: '3',
    fullName: 'Lê Minh Châu',
    phone: '0987654321',
    group: 'Công việc',
    gender: 'Nữ',
    isFavorite: false,
    note: '',
  },
];
