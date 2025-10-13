import { FC } from "react";

import { useContact } from "../../hooks";

import { BaseButton } from "../uikit";

const Contact: FC = () => {
  const { onOpen } = useContact();

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
      Írjon Nekünk!
    </BaseButton>
  );
};

export default Contact;
