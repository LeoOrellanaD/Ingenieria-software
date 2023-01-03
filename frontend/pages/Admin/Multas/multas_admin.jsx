import { useState, useEffect } from "react";
import { useDisclosure,Flex, Text, Box, Table,HStack, Thead,Tr,Td,Tbody, Button, Drawer,DrawerFooter, DrawerOverlay,DrawerContent,DrawerHeader,DrawerBody, TableContainer} from "@chakra-ui/react";
import axios from 'axios'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2'
import { ArrowBackIcon, DeleteIcon, Search2Icon, AddIcon } from "@chakra-ui/icons";
import { BsFillHouseFill,BsFillPersonFill,BsFillDoorClosedFill,BsWrench,BsFillPeopleFill, BsFillCreditCard2BackFill,BsCalendar3,BsFillEnvelopeFill, BsFillFileEarmarkExcelFill } from "react-icons/bs";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

const MultasAdmin = () => {

    const router = useRouter()
    const { isOpen, onOpen, onClose } = useDisclosure()

const [multas, setMultas] = useState([])
    const getMultas = async () => {
        try {
            const response = await axios.get(`${process.env.API_URL}/multas`)
            setMultas(response.data)
        } catch (error) {
            Swal.fire({
                text:'No existe registro de multas',
                icon:'warning',
                showCancelButton: true,
                showConfirmButton: true,
                cancelButtonText: 'Volver atras',
                confirmButtonText:'Crear multa',
                reverseButtons: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33'
            }).then((result) =>{
                if(result.isDismissed){
                    router.push("/Admin/inicio_admin")
                }
                if(result.isConfirmed){
                    router.push("/Admin/Multas/agregar_multa")
                }
            })
        }
    
    
    }
    useEffect(() => {
        getMultas()
        localStorage.setItem('reserva', 0)
    }, [])

    const showMultas = () =>{
        return multas.map(multas =>{
            return (
                <Tr key={multas._id}>
                <Td>{multas.dia+"/"+multas.mes+"/"+multas.year}</Td>
                <Td>{multas.vecino.nombre}</Td>
                <Td>{multas.vecino.apellido}</Td>
                <Td>{multas.tipo}</Td>
                <Td>{multas.valor}</Td>
                <Td>{multas.cod_multa}</Td>
                </Tr>
            )
        })
    }

    const deleteMulta = async (x)=> {

        Swal.fire({
            title:'¿Estas seguro de eliminar esta multa?',
            text:'No se podra deshacer esta acción',
            icon:'warning',
            showCancelButton:true,
            confirmButtonColor:'#8DDE7C',
            cancelButtonColor:'#F24343',
            confirmButtonText: 'Aceptar',
            cancelButtonText:'Cancelar'
        }).then((result)=>{
            if(result.value){
                const response = axios.delete(`${process.env.API_URL}/multa/delete/${x}`)
                setMultas(response.data)
                window.location.reload();
            }
    })
    }

    const cerrarSesion = async (e) => {

        e.preventDefault()
        localStorage.clear();
        router.push("/")
    
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

            <Button mt={10} 
                    name="atras" 
                    leftIcon={<ArrowBackIcon/>} 
                    colorScheme="blue" as="b" 
                    rounded="40" 
                    marginLeft="-60%"
                    onClick={()=>router.push("/Admin/inicio_admin")}>
                Volver atrás
            </Button>

            <Drawer placement='left'  onClose={onClose} isOpen={isOpen} >
            <DrawerOverlay />
            <DrawerContent>
                <DrawerHeader  
                        backgroundColor="blue.500" 
                        color="white" 
                        alignItems="center" 
                        display="flex"> 
                    <AiOutlineMenu size="20"/> 
                    &nbsp; Menú
                </DrawerHeader>

                <DrawerBody backgroundColor="blue.300">
                    <Button width={"100%"} colorScheme="blue" mb="2" height="20" fontSize="20" onClick={() => router.push("/Admin/inicio_admin")}><BsFillHouseFill size="20"/>&nbsp;   Inicio</Button>
                    <Button width={"100%"} colorScheme="blue" mb="2" height="20" fontSize="20" onClick={() => router.push("/Admin/Reservas/reservas_admin")}><BsCalendar3 size="20"/>&nbsp; Reservas</Button>
                    <Button width={"100%"} colorScheme="blue" mb="2" height="20" fontSize="20" onClick={() => router.push("/Admin/Gastos/gastos_admin")}><BsFillCreditCard2BackFill size="20"/>&nbsp; Gastos</Button>
                    <Button width={"100%"} colorScheme="blue" mb="2" height="20" fontSize="20" onClick={() => router.push("/Admin/Mensajes/mensajes_admin")}><BsFillEnvelopeFill size="20"/>&nbsp; Mensajes</Button>
                    <Button width={"100%"} colorScheme="blue" mb="2" height="20" fontSize="20" onClick={() => router.push("/Admin/Multas/multas_admin")}><BsFillFileEarmarkExcelFill size="20"/>&nbsp; Multas</Button>
                    <Button width={"100%"} colorScheme="blue" mb="2" height="20" fontSize="20" onClick={() => router.push("/Admin/Mantenciones/mantenciones_admin")}><BsWrench size="20"/>&nbsp; Manteciones</Button>
                    <Button width={"100%"} colorScheme="blue" mb="2" height="20" fontSize="20" onClick={() => router.push("/Admin/Vecino/vecinos_admin")}><BsFillPeopleFill size="20"/>&nbsp; Vecinos</Button>
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
            <Button mb="2"
                    variant="solid"
                    colorScheme="blue"
                    rounded="50"
                    rightIcon={<AddIcon/>}
                    onClick = {() => router.push("/Admin/Multas/agregar_multa")}>
                Agregar Multa
            </Button>
            <TableContainer mt={30} rounded="16" width={"90%"}>
                        <Table variant={"simple"} colorScheme="blue" backgroundColor="whiteAlpha.900">
                        <Thead>
                        <Tr>
                        <Td bgColor={"blue.500"} color={"white"}>Fecha</Td>
                            <Td bgColor={"blue.500"} color={"white"}>Nombre</Td>
                            <Td bgColor={"blue.500"} color={"white"}>Apellido</Td>
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

export default MultasAdmin;