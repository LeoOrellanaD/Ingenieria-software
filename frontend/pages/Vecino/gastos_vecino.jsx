import { useState, useEffect } from "react";
import { Flex, Text, Box, Stack, Table, Thead,Tr,Td,Tbody, Button,VStack,HStack} from "@chakra-ui/react";
import { useRouter } from "next/router";
import axios from 'axios'
import Swal from 'sweetalert2'

const GastosVecino= () => {

    const router = useRouter();
    const {
        query: { codigo },
    } = router;

    const props = {
        codigo,
    };

    const [cobros, setCobros] = useState([]);

    const setCookieFunction = (value) => {
        localStorage.setItem('codigo', value)
    }

    const getCobros = async () => {
        if(codigo){
            setCookieFunction(codigo)
            try {
                const response = await axios.get(`${process.env.API_URL}/vecino/cobros/${props.codigo}`)
                setCobros(response.data);
            } catch (error) {
                Swal.fire({
                    text:'Vecino no tiene historial de gastos',
                    icon:'warning',
                    iconColor: '#3085d6',
                    showCancelButton: true,
                    showConfirmButton: false,
                    cancelButtonText: 'Volver atras',
                    cancelButtonColor: '#d33'
                }).then((result)=>{
                    if(result.isDismissed){
                        console.log(codigo)
                        router.push({pathname:'/Vecino/inicio_vecino', query:{codigo: codigo},});
                    }
                })
            }
        }else{
            try {
                const response = await axios.get(`${process.env.API_URL}/vecino/cobros/${localStorage.getItem('codigo')}`)
                setCobros(response.data);
            } catch (error) {
                Swal.fire({
                    text:'Vecino no tiene historial de gastos',
                    icon:'warning',
                    iconColor: '#3085d6',
                    showCancelButton: true,
                    showConfirmButton: false,
                    cancelButtonText: 'Volver atras',
                    cancelButtonColor: '#d33'
                }).then((result)=>{
                    if(result.isDismissed){
                        console.log(codigo)
                        router.push({pathname:'/Vecino/inicio_vecino', query:{codigo: codigo},});
                    }
                })
            }
        }
    };

useEffect(() => {
    getCobros()
}, [])

//AGREGAR CONDICION DEL SHOWBUTTON PARA COMPARAR FECHAS
const showCobros = () => {return cobros.map(cobros => {
        return (
            <Tr key={cobros._id}>
                <Td>{cobros.mes}</Td>
                <Td>{cobros.year}</Td>
                <Td>{"$"+cobros.reserva_total}</Td>
				<Td>{"$"+cobros.multa_total}</Td>
				<Td>{"$"+cobros.costo_total}</Td>
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
						<Td color={"blue.400"}>N° de Boleta</Td>
					</Tr>
                    </Thead>
                    <Tbody>
                    {showCobros()}
				</Tbody>
                </Table>
            </Stack>
        </form>
    </Box>
    </HStack>
    </Flex>
);
};

export default GastosVecino;