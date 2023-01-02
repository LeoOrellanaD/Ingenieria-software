import { useState, useEffect } from "react";
import {  useDisclosure,HStack, Flex, Text,Button, Box, Table, Thead,Tr,Td,Tbody,Drawer,DrawerFooter, DrawerOverlay,DrawerContent,DrawerHeader,DrawerBody,TableContainer} from "@chakra-ui/react";
import axios from 'axios'
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'
import { ArrowBackIcon, AddIcon } from "@chakra-ui/icons";
import { BsFillHouseFill,BsFillDoorClosedFill,BsWrench,BsFillPeopleFill, BsFillCreditCard2BackFill,BsCalendar3,BsFillEnvelopeFill, BsFillFileEarmarkExcelFill,BsMenuApp,BsFillCalendar2PlusFill } from "react-icons/bs";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

const GastosAdmin = () =>{
    const router = useRouter()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [cobros, setCobros] = useState([])

    const getCobros = async () =>{
        try{
            const response = await axios.get(`${process.env.API_URL}/cobros`)
            setCobros(response.data)
        }catch (error){
            Swal.fire({
                text:'No existe registro de cobros',
                icon:'warning',
                showCancelButton: true,
                showConfirmButton: true,
                cancelButtonText: 'Volver atras',
                confirmButtonText:'Crear cobro',
                reverseButtons: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33'
            }).then((result) =>{
                if(result.isDismissed){
                    router.push("/Admin/inicio_admin")
                }
                if(result.isConfirmed){
                    router.push("/Admin/Gastos/agregar_cobro")
                }
            })
        }
    }

    useEffect(() =>{
        getCobros()
        localStorage.setItem('reserva', 0)
    }, [])

    const showGastos = () =>{
        return cobros.map(cobros =>{
		    return (
                <Tr key={cobros._id}>
                    <Td>{cobros.mes+"/"+cobros.year}</Td>
                    <Td>{"$"+cobros.reserva_total}</Td>
				    <Td>{"$"+cobros.multa_total}</Td>
				    <Td>{"$"+cobros.costo_total}</Td>
                    <Td>{cobros.vecino.nombre+" "+cobros.vecino.apellido}</Td>
                    <Td>{cobros.num_cobro}</Td>
                </Tr>
            )
	    })
    }

    const cerrarSesion = async (e) =>{
        e.preventDefault()
        localStorage.clear();
        router.push("/")
    }

    return(
        <Flex
            flexDirection = "column"
            width = "150wh"
            height = "auto"
            minH = {"100vh"}
            backgroundColor = "blue.300"
            alignItems = "center"
        >
            <Box 
                backgroundColor = "blue.500"
                w = {"100%"}
                h = "16"
            >
                <Button 
                    colorScheme = 'blue'
                    onClick = {onOpen}
                    h = "16">
                    <AiOutlineMenu size="20"/> &nbsp;  Menú
                </Button>
                <Button 
                    colorScheme = 'blue' 
                    marginLeft = "80%" 
                    onClick = {cerrarSesion}
                    h = "16">
                    <BsFillDoorClosedFill size="20"/> &nbsp; Cerrar Sesión
                </Button>
            </Box>

            <Button 
                mt = {10} 
                name = "atras"
                leftIcon = {<ArrowBackIcon/>} 
                colorScheme = "blue" 
                as = "b" 
                rounded = "40" 
                marginLeft = "-60%"
                onClick={() => router.push("/Admin/inicio_admin")}
            >
                Volver atrás
            </Button>
            <Drawer
                placement = 'left'  
                onClose = {onClose} 
                isOpen = {isOpen}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerHeader  
                        backgroundColor = "blue.500" 
                        color = "white" 
                        alignItems = "center" 
                        display = "flex"
                    > 
                        <AiOutlineMenu size = "20"/> &nbsp; Menú
                    </DrawerHeader>
                    <DrawerBody backgroundColor = "blue.300">
                        <Button width = {"100%"} colorScheme = "blue" mb = "2" height = "20" fontSize = "20" onClick={() => router.push("/Admin/inicio_admin")}><BsFillHouseFill size="20"/>&nbsp;   Inicio</Button>
                        <Button width = {"100%"} colorScheme = "blue" mb = "2" height = "20" fontSize = "20" onClick={() => router.push("/Admin/Reservas/reservas_admin")}><BsCalendar3 size="20"/>&nbsp; Reservas</Button>
                        <Button width = {"100%"} colorScheme = "blue" mb = "2" height = "20" fontSize = "20" onClick={() => router.push("/Admin/Gastos/gastos_admin")}><BsFillCreditCard2BackFill size="20"/>&nbsp; Gastos</Button>
                        <Button width = {"100%"} colorScheme = "blue" mb = "2" height = "20" fontSize = "20" onClick={() => router.push("/Admin/Mensajes/mensajes_admin")}><BsFillEnvelopeFill size="20"/>&nbsp; Mensajes</Button>
                        <Button width = {"100%"} colorScheme = "blue" mb = "2" height = "20" fontSize = "20" onClick={() => router.push("/Admin/Multas/multas_admin")}><BsFillFileEarmarkExcelFill size="20"/>&nbsp; Multas</Button>
                        <Button width = {"100%"} colorScheme = "blue" mb = "2" height = "20" fontSize = "20" onClick={() => router.push("/Admin/Mantenciones/mantenciones_admin")}><BsWrench size="20"/>&nbsp; Manteciones</Button>
                        <Button width = {"100%"} colorScheme = "blue" mb = "2" height = "20" fontSize = "20" onClick={() => router.push("/Admin/Vecino/vecinos_admin")}><BsFillPeopleFill size="20"/>&nbsp; Vecinos</Button>
                    </DrawerBody>
                    <DrawerFooter backgroundColor = "blue.300">
                        <Button 
                            mr = {3} 
                            onClick = {onClose} 
                            colorScheme = "blue"
                        >
                            <AiOutlineClose size="20"/>&nbsp;Cerrar
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
            <HStack mt = {30} mb = {30}>
                <BsFillCreditCard2BackFill color = "white" size = "50"/>
                <Text 
                    fontSize = {50} 
                    color = "white" 
                    as = {"b"} 
                    mt = {30} 
                    mb = {30}
                >
                    Cobros de Vecinos
                </Text>
            </HStack>
                <Button
                    variant = "solid"
                    colorScheme = "blue"
                    rounded = "50"
                    rightIcon = {<AddIcon/>}
                    onClick = {() => router.push("/Admin/Gastos/agregar_cobro")}
                >
                    Generar Cobro
                </Button>
                <TableContainer rounded = "16" mt = {30} width = {"90%"}>
                    <Table variant = {"simple"} colorScheme = "blue" backgroundColor = "whiteAlpha.900">
                        <Thead>
                            <Tr>
						        <Td bgColor = {"blue.500"} color = {"white"}>Mes/Año</Td>
						        <Td bgColor = {"blue.500"} color = {"white"}>Servicios</Td>
						        <Td bgColor = {"blue.500"} color = {"white"}>Multas</Td>
						        <Td bgColor = {"blue.500"} color = {"white"}>Total</Td>
                                <Td bgColor = {"blue.500"} color = {"white"}>Vecino</Td>
						        <Td bgColor = {"blue.500"} color = {"white"}>N° de Boleta</Td>
					        </Tr>
                        </Thead>
                        <Tbody>
                            {showGastos()}
			    	    </Tbody>
                    </Table>
                </TableContainer>
        </Flex>
    );
};

export default GastosAdmin;