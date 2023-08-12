import {
  Box,
  Stack,
  Heading,
  Flex,
  useDisclosure,
  Link,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
const Header = (props: any) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleToggle = () => (isOpen ? onClose() : onOpen());

  return (
    <Flex
      width={"100%"}
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding={6}
      bg="orange.400"
      color="white"
      {...props}
    >
      <Flex align="center" mr={5}>
        <Link href="/">
          <Heading as="h1" size="lg" letterSpacing={"tighter"}>
            ContactSyncPro
          </Heading>
        </Link>
      </Flex>

      <Box display={{ base: "block", md: "none" }} onClick={handleToggle}>
        <HamburgerIcon />
      </Box>

      <Stack
        direction={{ base: "column", md: "row" }}
        display={{ base: isOpen ? "block" : "none", md: "flex" }}
        width={{ base: "full", md: "auto" }}
        alignItems="center"
        justifyContent={"end"}
        gap={4}
        flexGrow={1}
        mt={{ base: 4, md: 0 }}
      >
        <Link href="/add-contacts">Adicionar contato</Link>
        <Link href="/contacts">Lista de Contatos</Link>
      </Stack>

      <Box
        display={{ base: isOpen ? "block" : "none", md: "block" }}
        mt={{ base: 4, md: 0 }}
      ></Box>
    </Flex>
  );
};

export default Header;
