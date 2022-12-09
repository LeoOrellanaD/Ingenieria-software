import { useState, useEffect } from "react";
import { Flex, Card, CardBody, CardHeader, CardFooter, Text, Box, Stack, Table,Thead,Tr,Td,Tbody } from "@chakra-ui/react";
import { useRouter } from "next/router";
import administrador from "../../backend/models/administrador";
import axios from 'axios'


const inicio_admin= () => {

    const router = useRouter();
    const { query:{ codigo },
}= router;

const props= {
    codigo,
};

console.log(props.codigo)

const [administrador, setAdmin] = useState([])
const getAdmin = async () => {
    const response = await axios.get(`${process.env.API_URL}/administrador/search/${props.codigo}`)
    setAdmin(response.data)
}

useEffect(() => {
    getAdmin()
}, [])

const showAdmin = () => {

        return (
            <Tr>
                <Td>{administrador.nombre}</Td>
                <Td>{administrador.apellido}</Td>
                <Td>{administrador.telefono}</Td>
            </Tr>
        )
    }

return (
    <Flex
        flexDirection="column"
        width="100wh"
        height="100vh"
        backgroundColor="blue.400"
        alignItems="center"
        >
    <Text fontSize={50} color="white" mb={20}>Pagina de Inicio</Text>
    <Box  minW={{ base: "10%", md: "468px"}} >
        <form>
            <Stack spacing={4}
                p="1rem"
                backgroundColor="whiteAlpha.900"
                boxShadow="md"
                rounded="16"
                flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center">
                <Table variant={"simple"}>
                    <Thead>
                    <Tr>
						<Td>Nombre</Td>
						<Td>Apellido</Td>
						<Td>Numero de Telefono</Td>
					</Tr>
                    </Thead>
                    <Tbody>
                    {showAdmin()}
				</Tbody>
                </Table>
            </Stack>
        </form>
    </Box>
    </Flex>
);
};

export default inicio_admin;
