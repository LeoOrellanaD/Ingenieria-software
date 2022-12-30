import { useState, useEffect } from "react";
import { Flex, Text, Box, Stack, Table, Thead,Tr,Td,Tbody,HStack,Button,Menu, MenuButton, MenuList,MenuItem} from "@chakra-ui/react";
import axios from 'axios'
import { useRouter } from 'next/router'


const GastosAdmin= () => {

const router = useRouter()
const [cobros, setCobros] = useState([])
const getCobros = async () => {
    try {
        const response = await axios.get(`${process.env.API_URL}/cobros`)
        setCobros(response.data)
    } catch (error) {

    }

}

useEffect(() => {
    getCobros()
}, [])

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
        backgroundColor="blue.300"
        alignItems="center"
        >
    <Box backgroundColor="blue.500" w={"100%"} h="10">
    <Menu>
  <MenuButton  color="white" w="10%" h="10" background={"blue.600"}>
    Menú
  </MenuButton>
  <MenuList >
    <MenuItem color="blue.400" as="b"  onClick={() => router.push("/Admin/inicio_admin")} >Inicio</MenuItem>
    <MenuItem color="blue.400" as="b" onClick={() => router.push("/Admin/Reservas/reservas_admin")}>Reservas</MenuItem>
    <MenuItem color="blue.400" as="b" onClick={() => router.push("/Admin/Mensajes/mensajes_admin")}>Mensajes</MenuItem>
    <MenuItem color="blue.400" as="b" onClick={() => router.push("/Admin/Multas/multas_admin")}>Multas</MenuItem>
    <MenuItem color="blue.400" as="b" onClick={() => router.push("/Admin/Mantenciones/mantenciones_admin")}>Manteciones</MenuItem>
    <MenuItem color="blue.400" as="b" onClick={() => router.push("/Admin/Vecino/vecinos_admin")}>Vecinos</MenuItem>
  </MenuList>
</Menu>
    </Box>
    <Button mt={10} name="atras" colorScheme="blue" as="b" rounded="40" style={{
    position: "fixed",
    top: "20px",
    left: "200px",
    zIndex: 1,
    }}
    onClick={()=>router.push("/Admin/inicio_admin")}>
    Volver atrás</Button>


    <Text fontSize={50} color="white" as={"b"} mt={30} mb={30}>Cobros de Vecinos</Text>
    <Button mb="2"
                variant="solid"
                colorScheme="blue"
                rounded="50"
                onClick = {() => router.push("/Admin/Gastos/agregar_cobro")}>
                    Generar Cobro</Button>
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