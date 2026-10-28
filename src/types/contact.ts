export const CONTACT_GROUPS = ['Gia đình', 'Bạn bè', 'Công việc', 'Khác'] as const;
export type ContactGroup = (typeof CONTACT_GROUPS)[number];

export const GENDERS = ['Nam', 'Nữ', 'Khác'] as const;
export type Gender = (typeof GENDERS)[number];

export type Contact = {
  id: string;
  fullName: string;
  phone: string;
  group: ContactGroup;
  gender: Gender;
  isFavorite: boolean;
  note: string;
};

export type ContactDraft = Omit<Contact, 'id'>;
