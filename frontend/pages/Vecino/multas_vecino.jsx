import { useState, useEffect } from "react";
import { useDisclosure,DrawerOverlay,DrawerContent,DrawerHeader,DrawerBody,DrawerFooter,Drawer,Flex, Text, Box, Stack, Table, Thead,Tr,Td,Tbody, HStack, Button, TableContainer} from "@chakra-ui/react";
import axios from 'axios'
import { useRouter } from "next/router";
import Swal from 'sweetalert2'
import { ArrowBackIcon, DeleteIcon, Search2Icon, AddIcon } from "@chakra-ui/icons";
import { BsFillHouseFill,BsFillPersonFill,BsFillDoorClosedFill,BsWrench,BsFillPeopleFill, BsFillCreditCard2BackFill,BsCalendar3,BsFillEnvelopeFill, BsFillFileEarmarkExcelFill,BsMenuApp } from "react-icons/bs";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";


const MultasVecino = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
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
                    showCancelButton: true,
                    showConfirmButton: false,
                    cancelButtonText: 'Volver atras',
                    cancelButtonColor: '#d33'
                }).then((result)=>{
                    if(result.isDismissed){
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
                    showCancelButton: true,
                    showConfirmButton: false,
                    cancelButtonText: 'Volver atras',
                    cancelButtonColor: '#d33'
                }).then((result)=>{
                    if(result.isDismissed){
                        router.push({pathname:'/Vecino/inicio_vecino', query:{codigo: codigo},});
                    }
                })
            }
        }
    };

    useEffect(() => {
        getMultas()
    }, [])

    const cerrarSesion = async (e) => {

        e.preventDefault()
        localStorage.clear();
        router.push("/")
    
    }

    const showMultas = () =>{
        return multas.map(multas =>{
            return (
                <Tr key = {multas._id}>
                <Td>{multas.dia+"/"+multas.mes+"/"+multas.year}</Td>
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
      height="auto"
      minH={"100vh"}
            backgroundColor="blue.300"
            alignItems="center"
            >
                <Box backgroundColor="blue.500" w={"100%"} h="16">
                <Button colorScheme='blue' onClick={onOpen} h="16">
                <AiOutlineMenu size="20"/> &nbsp;  Menú
                </Button>
                <Button colorScheme='blue' position="absolute" right="0" onClick={cerrarSesion} h="16">
                <BsFillDoorClosedFill size="20"/> &nbsp; Cerrar Sesión
                </Button>
            </Box>

            <Button mt={10} name="atras" leftIcon={<ArrowBackIcon/>} colorScheme="blue" as="b" rounded="40" marginLeft="-60%"
        onClick={()=>router.push("/Vecino/inicio_vecino")}>
        Volver atrás</Button>

            <Drawer placement='left'  onClose={onClose} isOpen={isOpen} >
        <DrawerOverlay />
        <DrawerContent>
        <DrawerHeader  backgroundColor="blue.500" color="white" alignItems="center" display="flex"> 
  <AiOutlineMenu size="20"/> 
  &nbsp; 
  Menú
</DrawerHeader>
          <DrawerBody backgroundColor="blue.300">
          <Button width={"100%"} colorScheme="blue" mb="2" height="20" fontSize="20" onClick={() => router.push("/Vecino/inicio_vecino")}><BsFillHouseFill size="20"/>&nbsp;   Inicio</Button>
            <Button width={"100%"} colorScheme="blue" mb="2" height="20" fontSize="20" onClick={() => router.push("/Vecino/reservas_vecino")}><BsCalendar3 size="20"/>&nbsp; Reservas</Button>
            <Button width={"100%"} colorScheme="blue" mb="2" height="20" fontSize="20" onClick={() => router.push("/Vecino/multas_vecino")}><BsFillFileEarmarkExcelFill size="20"/>&nbsp; Multas</Button>
            <Button width={"100%"} colorScheme="blue" mb="2" height="20" fontSize="20" onClick={() => router.push("/Vecino/gastos_vecino")}><BsFillCreditCard2BackFill size="20"/>&nbsp; Gastos</Button>
            <Button width={"100%"} colorScheme="blue" mb="2" height="20" fontSize="20" onClick={() => router.push("/Vecino/mensajes_vecino")}><BsFillEnvelopeFill size="20"/>&nbsp; Mensajes</Button>


          </DrawerBody>
          <DrawerFooter backgroundColor="blue.300">
            <Button mr={3} onClick={onClose} colorScheme="blue">
            <AiOutlineClose size="20"/>&nbsp;Cerrar
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      <HStack mt={30} mb={30}>
            <BsFillFileEarmarkExcelFill color="white" size="50"/>
            <Text fontSize={50} color="white" as={"b"}>Multas</Text>
        </HStack>
        <TableContainer rounded="16" width={"90%"}>

        
                    <Table variant={"simple"} colorScheme="blue" backgroundColor="whiteAlpha.900">
                        <Thead>
                        <Tr>
                            <Td bgColor={"blue.500"} color={"white"}>Fecha</Td>
                            <Td bgColor={"blue.500"} color={"white"}>Tipo</Td>
                            <Td bgColor={"blue.500"} color={"white"}>Valor</Td>
                            <Td bgColor={"blue.500"} color={"white"}>N° Multa</Td>

                        </Tr>
                        </Thead>
                        <Tbody>
                        {showMultas()}
                    </Tbody>
                    </Table>
                    </TableContainer>
        </Flex>
    );
};

export default MultasVecino;