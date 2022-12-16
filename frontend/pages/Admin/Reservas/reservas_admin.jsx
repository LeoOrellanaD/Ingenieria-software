import { useState, useEffect } from "react";
import { Flex, Text, Box, Stack, Table, Thead,Tr,Td,Tbody, Button,VStack,HStack, Input, TableContainer} from "@chakra-ui/react";
import axios from 'axios'


const ReservasAdmin= () => {

const [reservas, setReservas] = useState([])
const getReservas = async () => {
const response = await axios.get(`${process.env.API_URL}/reservas`)
setReservas(response.data)
}

const deleteReserva = async (x) => {

            const response =axios.delete(`${process.env.API_URL}/reserva/delete/${x}`)
            setReservas(response.data)
            window.location.reload();
}

useEffect(() => {
    getReservas()
}, [])

const showreservas = () => {

const validateDate =(y,m,d)=>{
    const fecha = new Date();
    const year = fecha.getFullYear();
    const mes= fecha.getMonth()+1;
    const dia = fecha.getDate();
    console.log(fecha)
    console.log(year)
    console.log(mes)
    console.log(dia)
    const year1 = (parseInt(y))
    const mes1= (parseInt(m))
    const dia1= (parseInt(d))
    console.log(year1)
    if (year1>=year){
        if(mes1>=mes-1 || year1>=year){
            if(dia1>=dia){
                return true;
            }
        }
    }
    return false;
}

	return reservas.map(reservas => {
		return (
            <Tr key={reservas._id}>
                <Td>{reservas.dia}</Td>
                <Td>{reservas.mes}</Td>
                <Td>{reservas.year}</Td>
				<Td>{reservas.hora}</Td>
				<Td>{reservas.servicio.nombre}</Td>
                <Td>{reservas.vecino.nombre}</Td>
                <Td>{reservas.vecino.apellido}</Td>
				<Td>{reservas.num_reserva}</Td>
                    <Td>
                        {validateDate(reservas.year,reservas.mes,reservas.dia) ? (<Button
                id={reservas.num_reserva}
                    variant="solid"
                    colorScheme="blue"
                    rounded="50"
                    onClick={()=> deleteReserva(reservas.num_reserva)}
                    >Eliminar</Button>) :  <Button
                    id={reservas.num_reserva}
                        variant="solid"
                        colorScheme="blue"
                        rounded="50"
                        disabled
                        >Eliminar</Button>
                        }
                    </Td>
            </Tr>
        )
	})

    }
return (
    <Flex
        flexDirection="column"
        width="100wh"
        height="auto"
        minH={"100vh"}
        backgroundColor="blue.400"
        alignItems="center"
        >

    <Text fontSize={50} color="white" mt={30} mb={30}>Reservas de Servicio</Text>
    <Stack mb={30}>
    <Box  minW={{ base: "10%", md: "468px"}}>
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
                <Text fontSize={30} color="blue.400" mt={30} mb={30}>Buscar Reserva</Text>
            <HStack>
                <VStack>
                <Text>Dia</Text>
                <Input placeholder="Ejemplo: 20"></Input>
                </VStack>
                <VStack>
                <Text>Mes</Text>
                <Input placeholder="Ejemplo: 02"></Input>
                </VStack>
                <VStack>
                <Text>Año</Text>
                <Input placeholder="Ejemplo: 2022"></Input>
                </VStack>

            </HStack>
            <Button
                        variant = "solid"
                        colorScheme = "blue"
                        width = "30%"
                        rounded = "40"
                        mt={10}
                        >Buscar
                </Button>
            </Stack>

        </form>
        </Box>
    </Stack>
    <HStack>
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
                <TableContainer>
                <Table variant={"simple"}>
                    <Thead>
                    <Tr>
						<Td color={"blue.400"}>Dia</Td>
						<Td color={"blue.400"}>Mes</Td>
						<Td color={"blue.400"}>Año</Td>
						<Td color={"blue.400"}>Hora</Td>
						<Td color={"blue.400"}>Servicio</Td>
                        <Td color={"blue.400"}>Vecino</Td>
                        <Td color={"blue.400"}>        </Td>
						<Td color={"blue.400"}>N° de reserva</Td>
						<Td color={"blue.400"}>Acciones</Td>
					</Tr>
                    </Thead>
                    <Tbody>
                    {showreservas()}
				</Tbody>
                </Table>
                </TableContainer>
            </Stack>
        </form>
    </Box>
    </HStack>
    </Flex>
);
};

export default ReservasAdmin;