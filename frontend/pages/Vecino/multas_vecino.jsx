import { useState, useEffect } from "react";
import { Flex, Text, Box, Stack, Table, Thead,Tr,Td,Tbody, HStack} from "@chakra-ui/react";
import axios from 'axios'
import { useRouter } from "next/router";
import Swal from 'sweetalert2'

const MultasVecino = () => {

    const [multas, setMultas] = useState([])
    const router = useRouter();
    const {
        query: { codigo },
    } = router;

    const props = {
        codigo,
    };

    const setCookieFunction = (value) => {
        localStorage.setItem('codigo', value)
    }

    const getMultas = async () => {
        if(codigo){
            setCookieFunction(codigo)
            try {
                const response = await axios.get(`${process.env.API_URL}/vecino/multas/${props.codigo}`)
                setMultas(response.data);
            } catch (error) {
                Swal.fire({
                    text:'Vecino no tiene historial de multas',
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
                const response = await axios.get(`${process.env.API_URL}/vecino/multas/${localStorage.getItem('codigo')}`)
                setMultas(response.data);
            } catch (error) {
                Swal.fire({
                    text:'Vecino no tiene historial de multas',
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
        getMultas()
    }, [])

    const showMultas = () =>{
        return multas.map(multas =>{
            return (
                <Tr key = {multas._id}>
                <Td>{multas.dia}</Td>
                <Td>{multas.mes}</Td>
                <Td>{multas.year}</Td>
                <Td>{multas.tipo}</Td>
                <Td>{"$"+multas.valor}</Td>
                <Td>{multas.cod_multa}</Td>
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



        <Text fontSize={50} color="white" mt={30} mb={30}>Multas</Text>
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
                            <Td color={"blue.400"}>Dia</Td>
                            <Td color={"blue.400"}>Mes</Td>
                            <Td color={"blue.400"}>Año</Td>
                            <Td color={"blue.400"}>Tipo</Td>
                            <Td color={"blue.400"}>Valor</Td>
                            <Td color={"blue.400"}>N° Multa</Td>

                        </Tr>
                        </Thead>
                        <Tbody>
                        {showMultas()}
                    </Tbody>
                    </Table>
                </Stack>
            </form>
        </Box>
        </HStack>
        </Flex>
    );
};

export default MultasVecino;