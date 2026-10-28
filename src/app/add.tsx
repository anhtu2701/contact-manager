import { router } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { Button, HelperText, Text, TextInput } from 'react-native-paper';

import { FavoriteCheckbox } from '@/components/ui/favorite-checkbox';
import { GenderRadioGroup } from '@/components/ui/gender-radio-group';
import { GroupSelect } from '@/components/ui/group-select';
import { palette } from '@/constants/palette';
import { useContacts } from '@/context/contacts-context';
import type { ContactGroup, Gender } from '@/types/contact';
import { sanitizePhone, validateContactForm, type ContactFormErrors } from '@/utils/validation';

export default function AddContactScreen() {
  const { contacts, addContact } = useContacts();
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [group, setGroup] = useState<ContactGroup>('Bạn bè');
  const [gender, setGender] = useState<Gender>('Nam');
  const [isFavorite, setIsFavorite] = useState(false);
  const [note, setNote] = useState('');
  const [errors, setErrors] = useState<ContactFormErrors>({});

  const clearError = (field: keyof ContactFormErrors) =>
    setErrors((current) => ({ ...current, [field]: undefined }));

  const handleSave = () => {
    const nextErrors = validateContactForm({ fullName, phone }, contacts);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    addContact({
      fullName: fullName.trim(),
      phone,
      group,
      gender,
      isFavorite,
      note: note.trim(),
    });
    router.back();
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <View>
          <TextInput
            mode="outlined"
            label="Họ và tên"
            placeholder="Ví dụ: Nguyễn Văn An"
            value={fullName}
            onChangeText={(value) => {
              setFullName(value);
              clearError('fullName');
            }}
            error={Boolean(errors.fullName)}
            outlineStyle={styles.inputOutline}
            style={styles.input}
          />
          <HelperText type="error" visible={Boolean(errors.fullName)}>
            {errors.fullName}
          </HelperText>
        </View>

        <View>
          <TextInput
            mode="outlined"
            label="Số điện thoại"
            placeholder="Ví dụ: 0901234567"
            value={phone}
            onChangeText={(value) => {
              setPhone(sanitizePhone(value));
              clearError('phone');
            }}
            keyboardType="phone-pad"
            maxLength={10}
            error={Boolean(errors.phone)}
            outlineStyle={styles.inputOutline}
            style={styles.input}
          />
          <HelperText type="error" visible={Boolean(errors.phone)}>
            {errors.phone}
          </HelperText>
        </View>

        <View style={styles.field}>
          <Text variant="labelLarge" style={styles.label}>
            Nhóm
          </Text>
          <GroupSelect value={group} onValueChange={setGroup} />
        </View>

        <View style={styles.field}>
          <Text variant="labelLarge" style={styles.label}>
            Giới tính
          </Text>
          <GenderRadioGroup value={gender} onValueChange={setGender} />
        </View>

        <FavoriteCheckbox
          label="Thêm vào yêu thích"
          checked={isFavorite}
          onCheckedChange={setIsFavorite}
        />

        <TextInput
          mode="outlined"
          label="Ghi chú"
          placeholder="Nhập ghi chú (nhiều dòng)..."
          value={note}
          onChangeText={setNote}
          multiline
          numberOfLines={4}
          outlineStyle={styles.inputOutline}
          style={[styles.input, styles.noteInput]}
        />

        <Button
          mode="contained"
          onPress={handleSave}
          style={styles.button}
          contentStyle={styles.buttonContent}
          labelStyle={styles.buttonLabel}>
          Lưu liên hệ
        </Button>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.background,
  },
  content: {
    padding: 16,
    gap: 8,
  },
  field: {
    gap: 8,
  },
  label: {
    color: palette.muted,
  },
  input: {
    backgroundColor: palette.surface,
  },
  inputOutline: {
    borderRadius: 12,
  },
  noteInput: {
    minHeight: 110,
  },
  button: {
    marginTop: 8,
    borderRadius: 999,
  },
  buttonContent: {
    height: 52,
  },
  buttonLabel: {
    fontSize: 17,
    fontWeight: '700',
  },
});
