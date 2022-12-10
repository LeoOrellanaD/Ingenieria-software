import { useState, useEffect } from "react";
import {
Flex,
Text,
Box,
Stack,
Table,
Thead,
Tr,
Td,
Tbody,
Button,
HStack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import axios from "axios";

const Inicio_admin = () => {
const router = useRouter();
const {
    query: { codigo },
} = router;

const props = {
    codigo,
};

const router1 = useRouter();

  // console.log(props.codigo);

const [administrador, setAdmin] = useState([]);
const getAdmin = async () => {
    //const response = await axios.get(`${process.env.API_URL}/administrador/search/${props.codigo}`)
    const response = await axios.get(`${process.env.API_URL}/administrador/search/1001`);
    setAdmin(response.data);
};

useEffect(() => {
    getAdmin();
}, []);

const showAdmin = () => {
    return (
    <Tr>
        <Td>{administrador.nombre}</Td>
        <Td>{administrador.apellido}</Td>
        <Td>{administrador.telefono}</Td>
    </Tr>
    );
};

return (
    <Flex
        flexDirection="column"
        width="100wh"
        height="100vh"
        backgroundColor="blue.400"
        alignItems="center"
    >
    <HStack>
        <Text fontSize={50} color="white" mt={30} mb={30}>
            Pagina de Inicio
        </Text>
    </HStack>
    <Box minW={{ base: "10%", md: "700px" }}>
        <form>
        <Stack
            spacing={4}
            p="1rem"
            backgroundColor="whiteAlpha.900"
            boxShadow="md"
            rounded="16"
            flexDir="column"
            mb="10"
            justifyContent="center"
            alignItems="center"
        >
            <HStack>
                <Text fontSize={20} color="blue.500" mb={6}>
                Datos personales
                </Text>
            <Button
                borderRadius={0}
                type="submit"
                variant="solid"
                colorScheme="blue"
                width="20%"
                rounded="50"
                align='right'
            >
                editar
            </Button>
            </HStack>

            <Table variant={"simple"} textAlign={"center"}>
                <Thead>
                <Tr>
                    <Td>Nombre</Td>
                    <Td>Apellido</Td>
                    <Td>Numero de Telefono</Td>
                </Tr>
                </Thead>
            <Tbody>{showAdmin()}</Tbody>
            </Table>
            </Stack>
        </form>
    </Box>

    <Box minW={{ base: "10%", md: "700px" }} background="white" rounded={16}>
        <form>
        <HStack mt={10} mb={20} ml={10} mr={10}>
            <Button
                borderRadius={0}
                variant="solid"
                colorScheme="blue"
                width="full"
                rounded="50"
                onClick={() => router1.push("/reservas_admin")}
            >
                Reservas
            </Button>
            <Button
                borderRadius={0}
                variant="solid"
                colorScheme="blue"
                width="full"
                rounded="50"
                mr={5}
                ml={5}
            >
            Gastos
            </Button>
            <Button
                borderRadius={0}
                variant="solid"
                colorScheme="blue"
                width="full"
                rounded="50"
                ml={5}
            >
                Mensajes
            </Button>
        </HStack>
            <HStack mt={10} mb={10} ml={10} mr={10}>
            <Button
                borderRadius={0}
                variant="solid"
                colorScheme="blue"
                width="full"
                rounded="50"
            >
                Multas
            </Button>
            <Button
                borderRadius={0}
                variant="solid"
                colorScheme="blue"
                width="full"
                rounded="50"
                mr={5}
                ml={5}
            >
                Mantenciones
            </Button>
            <Button
                borderRadius={0}
                variant="solid"
                colorScheme="blue"
                width="full"
                rounded="50"
                ml={5}
            >
                Usuarios
            </Button>
            </HStack>
        </form>
        </Box>
    </Flex>
);
};

export default Inicio_admin;
