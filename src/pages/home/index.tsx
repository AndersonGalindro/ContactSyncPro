"use client";

import { Flex, Container, Stack, Text, Button } from "@chakra-ui/react";
import { ILogo } from "../../Components/Icons";
import { useNavigate } from "react-router-dom";

export default function CallToActionWithIllustration() {
  const navigate = useNavigate();
  return (
    <Container maxW={"5xl"}>
      <Stack
        textAlign={"center"}
        align={"center"}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 20, md: 28 }}
      >
        <Flex w={"full"}>
          <ILogo height={"6rem"} mt={{ base: 12, sm: 16 }} />
        </Flex>
        <Text color={"gray.500"} maxW={"3xl"}>
          O ContactSyncPro é uma aplicação avançada de gerenciamento de contatos
          projetada para simplificar e otimizar a forma como você mantém e
          sincroniza suas informações de contato. Com uma abordagem profissional
          e intuitiva, o ContactSyncPro oferece uma experiência de usuário
          moderna e eficiente para manter suas redes de contatos atualizadas.
        </Text>
        <Stack spacing={6} direction={"row"}>
          <Button
            onClick={() => navigate("/add-contacts")}
            rounded={"full"}
            px={6}
            colorScheme={"orange"}
            bg={"orange.400"}
            _hover={{ bg: "orange.500" }}
          >
            Get started
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
}
