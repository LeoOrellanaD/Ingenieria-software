import { useState, useEffect } from "react";
import { Flex, Text, Box, Stack, Table, Thead,Tr,Td,Tbody, Button,VStack,HStack} from "@chakra-ui/react";
import { useRouter } from "next/router";
import axios from 'axios'


const GastosAdmin= () => {

//     const router = useRouter();
//      const { query:{ codigo },
//  }= router;

// const props= {
//     codigo,
// };

// console.log(props.codigo)

const [cobros, setCobros] = useState([])
const getCobros = async () => {
const response = await axios.get(`${process.env.API_URL}/cobros`)
setCobros(response.data)
}

useEffect(() => {
    getCobros()
}, [])

  //const [isOpen, setIsOpen] = useState(false);


//AGREGAR CONDICION DEL SHOWBUTTON PARA COMPARAR FECHAS
const showGastos = () => {


	return cobros.map(cobros => {
		    return (
            <Tr key={cobros._id}>
                <Td>{cobros.mes}</Td>
                <Td>{cobros.year}</Td>
                <Td>{cobros.reserva_total}</Td>
				<Td>{cobros.multa_total}</Td>
				<Td>{cobros.costo_total}</Td>
                <Td>{cobros.vecino.nombre}</Td>
                <Td>{cobros.vecino.apellido}</Td>
                <Td>{cobros.num_cobro}</Td>

            </Tr>
        )
	})
    }

return (
    <Flex
        flexDirection="column"
        width="100wh"
        height="100vh"
        backgroundColor="blue.400"
        alignItems="center"
        >



    <Text fontSize={50} color="white" mt={30} mb={30}>Cobros de Vecinos</Text>
    <HStack>
        {/* <VStack marginLeft={-100} marginRight={100}><Button variant="solid"
                    colorScheme="blue"
                    rounded="50"
                    w={40}
                    h={20}
                    >Inicio</Button>
        <Button variant="solid"
                    colorScheme="blue"
                    rounded="50"
                    w={40}
                    h={20}>Gastos</Button>
        <Button variant="solid"
                    colorScheme="blue"
                    rounded="50"
                    w={40}
                    h={20}>Mensajes</Button>
        <Button variant="solid"
                    colorScheme="blue"
                    rounded="50"
                    w={40}
                    h={20}>Multas</Button>
        <Button variant="solid"
                    colorScheme="blue"
                    rounded="50"
                    w={40}
                    h={20}>Mantenciones</Button>
        <Button variant="solid"
                    colorScheme="blue"
                    rounded="50"
                    w={40}
                    h={20}>Usuarios</Button>
        </VStack> */}
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
						<Td color={"blue.400"}>Mes</Td>
						<Td color={"blue.400"}>Año</Td>
						<Td color={"blue.400"}>Servicios</Td>
						<Td color={"blue.400"}>Multas</Td>
						<Td color={"blue.400"}>Total</Td>
                        <Td color={"blue.400"}>Vecino</Td>
                        <Td color={"blue.400"}>        </Td>
						<Td color={"blue.400"}>N° de Boleta</Td>
						
					</Tr>
                    </Thead>
                    <Tbody>
                    {showGastos()}
				</Tbody>
                </Table>
            </Stack>
        </form>
    </Box>
    </HStack>
    
    </Flex>
);
};

export default GastosAdmin;