import { useTranslation } from 'react-i18next';
const LinkOptions = () => {
  const { t } = useTranslation();
  return [
    {
      label: t('about'),
      route: 'google.com',
      type: 'link',
    },
    { label: t('yourTickets'), route: 'travels', type: 'link' },
    { label: t('signIn'), route: 'signIn', type: 'link' },
    {
      type: 'dropdown',
      links: [
        { label: 'English', code: 'en' },
        { label: 'Amharic', code: 'am' },
        { label: 'Oromiffa', code: 'or' },
      ],
    },
  ];
};

export default LinkOptions;
