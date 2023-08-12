import { Alert, AlertIcon, AlertTitle } from "@chakra-ui/react";

const AlertPopup = (title: any) => {
  return (
    <Alert status="error">
      <AlertIcon />
      <AlertTitle mr={2}>{title}</AlertTitle>
    </Alert>
  );
};

export default AlertPopup;
