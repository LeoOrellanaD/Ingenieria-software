import { useState, useEffect } from "react";
import { useDisclosure,Button, Flex, Text, Box, Stack , HStack, Accordion, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel, Drawer,DrawerFooter, DrawerOverlay,DrawerContent,DrawerHeader,DrawerBody, Divider} from "@chakra-ui/react";
import axios from 'axios'
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'
import { ArrowBackIcon, AddIcon } from "@chakra-ui/icons";
import { BsFillHouseFill,BsFillDoorClosedFill,BsWrench,BsFillPeopleFill, BsFillCreditCard2BackFill,BsCalendar3,BsFillEnvelopeFill, BsFillFileEarmarkExcelFill} from "react-icons/bs";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

const MantencionesAdmin = () =>{
    const router = useRouter()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [mantenciones, setMantenciones] = useState([])
    const getMantenciones = async () => {
        try {
            const response = await axios.get(`${process.env.API_URL}/mantenciones`)
        setMantenciones(response.data)
        } catch (error) {
            
        }
        
    }

    useEffect(()=>{
        getMantenciones()
        localStorage.setItem('reserva', 0)
    },[])

    const deleteMantencion = async (x) => {
        Swal.fire({
            title:'¿Estas seguro de eliminar esta mantención?',
            text:'No se podra deshacer esta acción',
            icon:'warning',
            showCancelButton:true,
            confirmButtonColor:'#8DDE7C',
            cancelButtonColor:'#F24343',
            confirmButtonText: 'Aceptar',
            cancelButtonText:'Cancelar'
        }).then((result) =>{
            if(result.value){
                const response = axios.delete(`${process.env.API_URL}/mantencion/delete/${x}`)
                setMantenciones(response.data)
                window.location.reload();
            }
        })      
    }

    const showMantenciones = () =>{
        return mantenciones.map(mantenciones =>{
            return (
                <AccordionItem key = {mantenciones._id} borderColor={"blue.400"}>
                    <h2>
                        <AccordionButton _expanded={{ bg: 'blue.400', color: 'white' }}>
                            <Box as="span" flex='1' textAlign='left' width={700}>
                                <Text><b>Fecha:</b> {mantenciones.dia}/{mantenciones.mes}/{mantenciones.year}</Text>
                                <Text><b>Empresa:</b> {mantenciones.nombre_empresa} &nbsp;&nbsp; <b>N° de Mantención:</b> {mantenciones.num_mantencion}  </Text>
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <Divider colorScheme = {"white"} height = {"1.4"}/>
                    <AccordionPanel pb = {4} bgColor = {'blue.400'} textColor = {'white'} >
                        <Text> <b>Rut Empresa:</b> {mantenciones.rut_empresa} &nbsp;&nbsp; <b>Giro:</b> {mantenciones.giro} </Text>
                        <Text> <b>Hora: </b> {mantenciones.hora} </Text>
                        <Text> <b>Descripción: </b> {mantenciones.descripcion} </Text>
                        <Text> <b>Valor: </b> {mantenciones.valor} </Text>
                        <Text> <b>Observaciones: </b> {mantenciones.observaciones} </Text>
                    </AccordionPanel>
                </AccordionItem>
            )
        })
    }

    const cerrarSesion = async (e) =>{
        e.preventDefault()
        localStorage.clear();
        router.push("/")
    }

    return (
        <Flex
            flexDirection = "column"
            width = "100wh"
            height = "auto"
            minH = {"100vh"}
            backgroundColor = "blue.300"
            alignItems = "center"
        >
            <Box backgroundColor = "blue.500" w = {"100%"} h = "16">
                <Button colorScheme = 'blue' onClick = {onOpen} h = "16">
                    <AiOutlineMenu size = "20"/> &nbsp;  Menú
                </Button>
                <Button colorScheme = 'blue' marginLeft = "80%" onClick = {cerrarSesion} h = "16">
                    <BsFillDoorClosedFill size = "20"/> &nbsp; Cerrar Sesión
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
                onClick = {() => router.push("/Admin/inicio_admin")}
            >
                Volver atrás
            </Button>
            <Drawer placement = 'left' onClose = {onClose} isOpen = {isOpen}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerHeader  backgroundColor = "blue.500" color = "white" alignItems = "center" display = "flex"> 
                        <AiOutlineMenu size = "20"/> &nbsp; Menú
                    </DrawerHeader>
                    <DrawerBody backgroundColor="blue.300">
                        <Button width = {"100%"} colorScheme = "blue" mb = "2" height = "20" fontSize = "20" onClick = {() => router.push("/Admin/inicio_admin")}><BsFillHouseFill size="20"/>&nbsp;   Inicio</Button>
                        <Button width = {"100%"} colorScheme = "blue" mb = "2" height = "20" fontSize = "20" onClick = {() => router.push("/Admin/Reservas/reservas_admin")}><BsCalendar3 size="20"/>&nbsp; Reservas</Button>
                        <Button width = {"100%"} colorScheme = "blue" mb = "2" height = "20" fontSize = "20" onClick = {() => router.push("/Admin/Gastos/gastos_admin")}><BsFillCreditCard2BackFill size="20"/>&nbsp; Gastos</Button>
                        <Button width = {"100%"} colorScheme = "blue" mb = "2" height = "20" fontSize = "20" onClick = {() => router.push("/Admin/Mensajes/mensajes_admin")}><BsFillEnvelopeFill size="20"/>&nbsp; Mensajes</Button>
                        <Button width = {"100%"} colorScheme = "blue" mb = "2" height = "20" fontSize = "20" onClick = {() => router.push("/Admin/Multas/multas_admin")}><BsFillFileEarmarkExcelFill size="20"/>&nbsp; Multas</Button>
                        <Button width = {"100%"} colorScheme = "blue" mb = "2" height = "20" fontSize = "20" onClick = {() => router.push("/Admin/Mantenciones/mantenciones_admin")}><BsWrench size="20"/>&nbsp; Manteciones</Button>
                        <Button width = {"100%"} colorScheme = "blue" mb = "2" height = "20" fontSize = "20" onClick = {() => router.push("/Admin/Vecino/vecinos_admin")}><BsFillPeopleFill size="20"/>&nbsp; Vecinos</Button>
                    </DrawerBody>
                    <DrawerFooter backgroundColor = "blue.300">
                        <Button mr = {3} onClick = {onClose} colorScheme = "blue">
                            <AiOutlineClose size = "20"/>&nbsp;Cerrar
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
            <HStack mt = {30} mb = {30}>
                <BsWrench color = "white" size = "50"/>
                <Text fontSize = {50} color = "white" as = {"b"}>Mantenciones</Text>
            </HStack>
            <Button mb = "2"
                variant="solid"
                colorScheme = "blue"
                rightIcon = {<AddIcon/>}
                rounded = "50"
                onClick = {() => router.push("/Admin/Mantenciones/agregar_mantencion")}
            >
                Agregar Mantención
            </Button>
            <Stack mt = {30} width = {"90%"} alignItems = "center" rounded = "16" backgroundColor = "whiteAlpha.900" direction = {['column']}>
                <Accordion allowToggle width = {"100%"} mt = {5} mb = {5}>
                    {showMantenciones()}
                </Accordion>
            </Stack>
        </Flex>
    );
}

export default MantencionesAdmin;