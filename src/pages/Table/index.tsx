import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Tfoot,
  Container,
  useToast,
  ButtonGroup,
  Flex,
  IconButton,
  useEditableControls,
  Editable,
  EditableInput,
  EditablePreview,
  Input,
  Box,
  Button,
  Heading,
  Stack,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  deleteContacts,
  getContacts,
  updateContacts,
} from "../../services/api";
import { DatabaseType } from "../../services/types";
import { CheckIcon, CloseIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { useForm } from "react-hook-form";
import AlertPopup from "../form/AlertPopup";

export const CustomTable = () => {
  const [data, setData] = useState<DatabaseType[]>();
  const [load, setLoad] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  const {
    register,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const handleContacts = () => {
    getContacts().then((response) =>
      setData(response?.ContactSyncPro_database)
    );
  };

  useEffect(() => {
    handleContacts();
  }, []);

  console.log(data);

  const maskPhone = (number: string) => {
    const areaCode = `(${number.substring(0, 2)})`;
    const partOne = number.substring(2, 3) + " ";
    const partTwo = number.substring(3, 7) + "-";
    const partThree = number.substring(7, 11);

    return areaCode + " " + partOne + partTwo + partThree;
  };

  const handlePhoneInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    name: string
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

    setValue(name, maskedNumber, { shouldValidate: true });
  };

  const EditableControls = () => {
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
      getEditButtonProps,
    } = useEditableControls();

    return isEditing ? (
      <ButtonGroup justifyContent="center" size="sm">
        <IconButton
          aria-label=""
          icon={<CheckIcon />}
          {...getSubmitButtonProps()}
        ></IconButton>
        <IconButton
          aria-label=""
          icon={<CloseIcon />}
          {...getCancelButtonProps()}
        ></IconButton>
      </ButtonGroup>
    ) : (
      <Flex justifyContent="center">
        <IconButton
          aria-label=""
          size="sm"
          icon={<EditIcon />}
          {...getEditButtonProps()}
        ></IconButton>
      </Flex>
    );
  };

  return (
    <Container height={"100vh"} maxWidth={"auto"} padding={"20px 300px"}>
      {data?.length === 0 ? (
        <Stack
          as={Box}
          textAlign={"center"}
          spacing={{ base: 8, md: 14 }}
          padding={"5.2rem 9rem"}
          alignItems={"center"}
        >
          <Heading fontWeight={600} fontSize={`28px`} lineHeight={"110%"}>
            Você ainda não adicionou nenhum contato. <br />
            <br />
            <span>Clique no botão abaixo e adicione</span>
          </Heading>
          <Button
            width={"40%"}
            onClick={() => navigate("/add-contacts")}
            colorScheme={"green"}
            bg={"blue.400"}
            rounded={"full"}
            px={6}
            _hover={{
              bg: "blue.500",
            }}
          >
            Adicionar contato
          </Button>
        </Stack>
      ) : (
        <TableContainer>
          <Table variant="striped">
            <Thead>
              <Tr>
                <Th>Nome</Th>
                <Th>Sobrenome</Th>
                <Th isNumeric>Telefone</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data
                ?.slice()
                .sort((a, b) => b.id - a.id)
                .map((contatct, index) => (
                  <Tr key={index}>
                    <Td>
                      <Editable
                        display={"flex"}
                        gap={"4px"}
                        as={"td"}
                        textAlign="center"
                        defaultValue={contatct.name ?? ""}
                        isPreviewFocusable={true}
                        onSubmit={(value) =>
                          updateContacts(contatct.id, "name", value).then(() =>
                            handleContacts()
                          )
                        }
                      >
                        <EditablePreview />
                        <Input as={EditableInput} height={"30"} />
                        <EditableControls />
                      </Editable>
                    </Td>
                    <Td>
                      {" "}
                      <Editable
                        display={"flex"}
                        gap={"4px"}
                        as={"td"}
                        textAlign="center"
                        defaultValue={contatct.surname ?? ""}
                        isPreviewFocusable={true}
                        onSubmit={(value) =>
                          updateContacts(contatct.id, "surname", value).then(
                            () => handleContacts()
                          )
                        }
                      >
                        <EditablePreview />
                        <Input as={EditableInput} height={"30"} />
                        <EditableControls />
                      </Editable>
                    </Td>
                    <Td
                      isNumeric
                      display={"flex"}
                      justifyContent={"space-between"}
                    >
                      <Editable
                        display={"flex"}
                        gap={"4px"}
                        as={"td"}
                        textAlign="center"
                        defaultValue={maskPhone(String(contatct.phone)) ?? ""}
                        isPreviewFocusable={true}
                        onSubmit={(value) =>
                          updateContacts(
                            contatct.id,
                            "phone",
                            Number(value.replace(/[^\d]/g, ""))
                          ).then(() => handleContacts())
                        }
                      >
                        <EditablePreview />
                        <Input
                          as={EditableInput}
                          height={"30"}
                          value={getValues(`phone-${contatct.id}`)}
                          type="text"
                          placeholder="(99) 9 9999-9999"
                          {...register(`phone-${contatct.id}`, {
                            required: true,
                          })}
                          onChange={(event) =>
                            handlePhoneInputChange(
                              event,
                              `phone-${contatct.id}`
                            )
                          }
                        />
                        {errors.password && (
                          <AlertPopup title={errors.password.message} />
                        )}
                        <EditableControls />
                      </Editable>
                      <IconButton
                        onClick={() =>
                          deleteContacts(contatct.id)
                            .then(() => {
                              setLoad(true);
                              handleContacts();
                              setTimeout(() => {
                                setLoad(false);
                              }, 2000);
                              toast({
                                title: "Contato removido com sucesso",
                                status: "success",
                                duration: 3000,
                                isClosable: true,
                              });
                            })
                            .catch(() =>
                              toast({
                                title: "Falha ao remover Contato",
                                status: "error",
                                duration: 3000,
                                isClosable: true,
                              })
                            )
                        }
                        aria-label=""
                        size="sm"
                        icon={<DeleteIcon />}
                      ></IconButton>
                    </Td>
                  </Tr>
                ))}
            </Tbody>
            <Tfoot>
              <Tr>
                <Th>Nome</Th>
                <Th>Sobrenome</Th>
                <Th isNumeric>Telefone</Th>
              </Tr>
            </Tfoot>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};
