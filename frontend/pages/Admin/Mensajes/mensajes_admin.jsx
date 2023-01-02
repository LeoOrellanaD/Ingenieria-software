import { useState, useEffect } from "react";
import { Divider, useDisclosure,Flex, Text, Box, Stack , HStack, Accordion, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel, Button,Drawer,DrawerFooter, DrawerOverlay,DrawerContent,DrawerHeader,DrawerBody} from "@chakra-ui/react";
import axios from 'axios'
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'
import { ArrowBackIcon, AddIcon } from "@chakra-ui/icons";
import { BsFillHouseFill,BsFillDoorClosedFill,BsWrench,BsFillPeopleFill, BsFillCreditCard2BackFill,BsCalendar3,BsFillEnvelopeFill, BsFillFileEarmarkExcelFill } from "react-icons/bs";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";


const MensajesAdmin = () => {

const router = useRouter()
const { isOpen, onOpen, onClose } = useDisclosure()
const [mensajes, setMensajes] = useState([])
    const getMensajes = async () => {
    try {
        const response = await axios.get(`${process.env.API_URL}/mensajes`)
    setMensajes(response.data)
    } catch (error) {
        Swal.fire({
            text:'No existe registro de mensajes',
            icon:'warning',
            showCancelButton: true,
            showConfirmButton: true,
            cancelButtonText: 'Volver atras',
            confirmButtonText:'Crear mensaje',
            reverseButtons: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33'
        }).then((result) =>{
            if(result.isDismissed){
                router.push("/Admin/inicio_admin")
            }
            if(result.isConfirmed){
                router.push("/Admin/Mensajes/agregar_mensaje")
            }
        })
    }

    }
useEffect(() => {
    getMensajes()
    localStorage.setItem('reserva', 0)
}, [])

const showMensajes = () =>{
    return mensajes.map(mensajes =>{
        return (

    <AccordionItem key={mensajes._id} borderColor={"blue.400"}>
        <h2>
                <AccordionButton _expanded={{ bg: 'blue.400', color: 'white' }}>
                    <Box as="span" flex='1' textAlign='left' width={700}>
                        <Text><b>Fecha:</b> {mensajes.dia}/{mensajes.mes}/{mensajes.year}</Text>
                        <Text><b>Asunto:</b> {mensajes.asunto}</Text>
                    </Box>
                    <AccordionIcon/>
                </AccordionButton>
                </h2>
                <Divider colorScheme = {"white"} height = {"1.4"}/>
        <AccordionPanel pb = {4} bgColor = {'blue.400'} textColor = {'white'} >
            <Text> <b>De:</b> {mensajes.administrador.nombre} {mensajes.administrador.apellido} </Text>
            <Text> <b>Para: </b>
                {mensajes.vecino.map(vecinos=>{
                    return "["+vecinos.nombre +" "+ vecinos.apellido+"] "
                })}
            </Text>
            <Text> <br /> </Text>
            <Text >{mensajes.contenido}</Text>
        </AccordionPanel>
    </AccordionItem>
            )
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
                <Button colorScheme='blue'  marginLeft="80%" onClick={cerrarSesion} h="16">
                <BsFillDoorClosedFill size="20"/> &nbsp; Cerrar Sesión
                </Button>
            </Box>

            <Button mt={10} 
                    name="atras" 
                    leftIcon={<ArrowBackIcon/>} 
                    colorScheme="blue" 
                    as="b" 
                    rounded="40" 
                    marginLeft="-60%"
                    onClick={()=>router.push("/Admin/inicio_admin")}
            >   
                Volver atrás    
            </Button>

        <Drawer placement='left'  onClose={onClose} isOpen={isOpen} >
            <DrawerOverlay />
            <DrawerContent>
                <DrawerHeader   backgroundColor="blue.500" 
                                color="white" 
                                alignItems="center" 
                                display="flex"> 
                                <AiOutlineMenu size="20"/>
                        &nbsp;Menú
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
                        <AiOutlineClose size="20"/>
                        &nbsp;Cerrar
                    </Button>
                </DrawerFooter>
            </DrawerContent>
      </Drawer>

        <HStack mt={30} mb={30}>
            <BsFillEnvelopeFill color="white" size="50"/>
            <Text fontSize={50} color="white" as={"b"} >Mensajes</Text>
        </HStack>
        
        <Button mb="2"
                variant="solid"
                colorScheme="blue"
                rounded="50"
                rightIcon={<AddIcon/>}
                onClick = {() => router.push("/Admin/Mensajes/agregar_mensaje")}>
            Agregar Mensaje
        </Button>

        <Stack mt={30} width={"90%"} alignItems="center" rounded="16" backgroundColor="whiteAlpha.900" direction={['column']}>
            <Accordion allowToggle key={mensajes._id} width={"100%"} mt={5} mb={5}>
            {showMensajes()}
            </Accordion>
        </Stack>

    </Flex>
    );
};

export default MensajesAdmin;
