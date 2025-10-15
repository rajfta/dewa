import { FC } from "react";
import { useTranslations } from "next-intl";

import { useContact } from "../../hooks";

import { BaseButton } from "../uikit";

const Contact: FC = () => {
  const { onOpen } = useContact();
  const t = useTranslations('footer');

  return (
    <BaseButton
      variant="primary"
      width="100%"
      py={[3, 3, 3, 2]}
      fontSize="normal"
      borderRadius="md"
      mb={[12, 12, 12, 0]}
      onClick={onOpen}
      justifyContent="center"
    >
      {t('writeToUs')}
    </BaseButton>
  );
};

export default Contact;
