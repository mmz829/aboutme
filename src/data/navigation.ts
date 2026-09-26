export const navItems = [
  { id: 'profile', label: 'プロフィール', en: 'STATUS' },
  { id: 'skills', label: 'スキル', en: 'SKILLS' },
  { id: 'career', label: '経歴', en: 'JOURNEY' },
  { id: 'contact', label: 'お問い合わせ', en: 'PARTY' },
] as const;

export const sectionIds = navItems.map((item) => item.id);
