import { createContext, useContext, useState, type ReactNode } from 'react';

import { SEED_CONTACTS } from '@/constants/contacts';
import type { Contact, ContactDraft } from '@/types/contact';

type ContactsContextValue = {
  contacts: Contact[];
  getContact: (id: string) => Contact | undefined;
  addContact: (draft: ContactDraft) => void;
  toggleFavorite: (id: string) => void;
  removeContact: (id: string) => void;
};

const ContactsContext = createContext<ContactsContextValue | null>(null);

const createContactId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

export function ContactsProvider({ children }: { children: ReactNode }) {
  const [contacts, setContacts] = useState<Contact[]>(SEED_CONTACTS);

  const getContact = (id: string) => contacts.find((contact) => contact.id === id);

  const addContact = (draft: ContactDraft) =>
    setContacts((current) => [{ ...draft, id: createContactId() }, ...current]);

  const toggleFavorite = (id: string) =>
    setContacts((current) =>
      current.map((contact) =>
        contact.id === id ? { ...contact, isFavorite: !contact.isFavorite } : contact,
      ),
    );

  const removeContact = (id: string) =>
    setContacts((current) => current.filter((contact) => contact.id !== id));

  return (
    <ContactsContext.Provider
      value={{ contacts, getContact, addContact, toggleFavorite, removeContact }}>
      {children}
    </ContactsContext.Provider>
  );
}

export function useContacts() {
  const context = useContext(ContactsContext);
  if (!context) {
    throw new Error('useContacts must be used within ContactsProvider');
  }
  return context;
}
