import {
  VStack,
  Input,
  useToast,
  Box,
  Button,
  Heading,
} from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import AlertPopup from "../AlertPopup";
import { insertContacts } from "../../../services/api";
import { useNavigate } from "react-router-dom";

export default function Builder() {
  const toast = useToast();
  const [data, setData] = useState({ name: "", surname: "", phone: "" });
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: any) => {
    insertContacts({ ...data, phone: Number(data.phone.replace(/[^\d]/g, "")) })
      .then(() => {
        toast({
          title: "Contato adicionada com sucesso",
          status: "success",
          duration: 3000,
          isClosable: true,
        });

        setTimeout(() => {
          navigate("/contacts");
        }, 500);
      })
      .catch(() =>
        toast({
          title: "Erro ao adicionar Contato",
          status: "error",
          duration: 3000,
          isClosable: true,
        })
      );
    setData({ ...data, phone: Number(data.phone.replace(/[^\d]/g, "")) });
  };

  console.log(data);
  console.log(errors);

  const handlePhoneInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const inputValue = event.target.value;
    const digitsOnly = inputValue.replace(/[^\d]/g, "");

    let maskedNumber = "";

    if (digitsOnly.length <= 2) {
      maskedNumber = `(${digitsOnly}`;
    } else if (digitsOnly.length <= 3) {
      maskedNumber = `(${digitsOnly.slice(0, 2)}) ${digitsOnly.slice(2)}`;
    } else if (digitsOnly.length <= 7) {
      maskedNumber = `(${digitsOnly.slice(0, 2)}) ${digitsOnly.slice(
        2,
        3
      )} ${digitsOnly.slice(3)}`;
    } else {
      maskedNumber = `(${digitsOnly.slice(0, 2)}) ${digitsOnly.slice(
        2,
        3
      )} ${digitsOnly.slice(3, 7)}-${digitsOnly.slice(7, 11)}`;
    }

    setValue("phone", maskedNumber, { shouldValidate: true });
  };

  return (
    <Box
      height="calc(100vh - 7.5rem)"
      width="100vw"
      justifyContent={"center"}
      flexDirection={"column"}
      gap={8}
      display={"flex"}
      alignItems={"center"}
    >
      <Heading as="h1">Adicione um contato</Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack width={"360px"}>
          <Input
            type="text"
            placeholder="Nome"
            {...register("name", {
              required: "Insira o nome do contato",
              minLength: 3,
              maxLength: 80,
            })}
          />
          {errors.firstname && <AlertPopup title={errors.firstname.message} />}
          <Input
            type="text"
            placeholder="Sobrenome"
            {...register("surname", {
              required: "Insira o sobrenome do contato",
              minLength: 3,
              maxLength: 100,
            })}
          />
          {errors.lastname && <AlertPopup title={errors.lastname.message} />}
          <Input
            value={getValues("phone")}
            type="text"
            placeholder="(99) 9 9999-9999"
            {...register("phone", { required: true })}
            onChange={handlePhoneInputChange}
          />
          {errors.password && <AlertPopup title={errors.password.message} />}

          <Button
            borderRadius="md"
            bg="cyan.600"
            _hover={{ bg: "cyan.200" }}
            variant="ghost"
            type="submit"
          >
            Enviar
          </Button>
        </VStack>
      </form>
    </Box>
  );
}
