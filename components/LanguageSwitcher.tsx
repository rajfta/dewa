import { useRouter } from "next/router";
import { Button, HStack, Text } from "@chakra-ui/react";

const LanguageSwitcher = () => {
  const router = useRouter();
  const { locale, pathname, asPath, query } = router;

  const changeLanguage = (newLocale: string) => {
    // Set cookie to persist locale preference
    document.cookie = `NEXT_LOCALE=${newLocale}; max-age=${60 * 60 * 24 * 365}; path=/`;

    // Navigate to new locale
    router.push({ pathname, query }, asPath, { locale: newLocale });
  };

  return (
    <HStack spacing={2}>
      <Button
        size="sm"
        variant={locale === 'hu' ? 'solid' : 'ghost'}
        colorScheme={locale === 'hu' ? 'primary' : 'gray'}
        onClick={() => changeLanguage('hu')}
        fontWeight={locale === 'hu' ? 600 : 400}
      >
        HU
      </Button>
      <Text color="gray.400">|</Text>
      <Button
        size="sm"
        variant={locale === 'en' ? 'solid' : 'ghost'}
        colorScheme={locale === 'en' ? 'primary' : 'gray'}
        onClick={() => changeLanguage('en')}
        fontWeight={locale === 'en' ? 600 : 400}
      >
        EN
      </Button>
    </HStack>
  );
};

export default LanguageSwitcher;
