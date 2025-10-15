import { useRouter } from "next/router";
import { Button, HStack, Text, Flex } from "@chakra-ui/react";

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
        size="xs"
        variant="ghost"
        onClick={() => changeLanguage('hu')}
        fontWeight={locale === 'hu' ? 700 : 400}
        opacity={locale === 'hu' ? 1 : 0.6}
        color="white"
        px={2}
        _hover={{
          opacity: 1,
          bg: 'whiteAlpha.200'
        }}
        leftIcon={<Text fontSize="16px">🇭🇺</Text>}
      >
        HU
      </Button>
      <Text color="whiteAlpha.500" fontSize="sm">|</Text>
      <Button
        size="xs"
        variant="ghost"
        onClick={() => changeLanguage('en')}
        fontWeight={locale === 'en' ? 700 : 400}
        opacity={locale === 'en' ? 1 : 0.6}
        color="white"
        px={2}
        _hover={{
          opacity: 1,
          bg: 'whiteAlpha.200'
        }}
        leftIcon={<Text fontSize="16px">🇬🇧</Text>}
      >
        EN
      </Button>
    </HStack>
  );
};

export default LanguageSwitcher;
