import type { Contact } from '@/types/contact';

export type ContactFormErrors = Partial<Record<'fullName' | 'phone', string>>;

const PHONE_PATTERN = /^0\d{9}$/;

export const sanitizePhone = (value: string) => value.replace(/\D/g, '');

export const isValidPhone = (phone: string) => PHONE_PATTERN.test(phone);

export function validateContactForm(
  values: { fullName: string; phone: string },
  contacts: Contact[],
): ContactFormErrors {
  const errors: ContactFormErrors = {};

  if (!values.fullName.trim()) {
    errors.fullName = 'Vui lòng nhập họ và tên';
  }

  if (!isValidPhone(values.phone)) {
    errors.phone = 'Số điện thoại gồm 10 chữ số và bắt đầu bằng 0';
  } else if (contacts.some((contact) => contact.phone === values.phone)) {
    errors.phone = 'Số điện thoại đã tồn tại trong danh bạ';
  }

  return errors;
}
