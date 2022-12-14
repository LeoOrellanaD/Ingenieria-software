import { useState, useEffect } from "react";
import { Divider,HStack, useDisclosure,DrawerOverlay,DrawerContent,DrawerHeader,DrawerBody,DrawerFooter,Drawer,Flex, Text, Box, Stack , Button, Accordion, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel} from "@chakra-ui/react";
import axios from 'axios'
import Swal from 'sweetalert2'
import { useRouter } from "next/router";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { BsFillHouseFill,BsFillDoorClosedFill, BsFillCreditCard2BackFill,BsCalendar3,BsFillEnvelopeFill, BsFillFileEarmarkExcelFill} from "react-icons/bs";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

const MensajesVecino = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const router = useRouter();
    const {
        query: { codigo },
    } = router;

    const props = {
        codigo,
    };

    const [mensajes, setMensajes] = useState([]);

    const setCookieFunction = (value) => {
        localStorage.setItem('codigo', value)
    }

    const getMensajes = async () => {
        if(codigo){
            setCookieFunction(codigo)
            try {
                const response = await axios.get(`${process.env.API_URL}/vecino/mensajes/${props.codigo}`)
                setMensajes(response.data);
            } catch (error) {
                Swal.fire({
                    text:'Vecino no tiene historial de mensajes',
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
                const response = await axios.get(`${process.env.API_URL}/vecino/mensajes/${localStorage.getItem('codigo')}`)
                setMensajes(response.data);
            } catch (error) {
                Swal.fire({
                    text:'Vecino no tiene historial de mensajes',
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
    getMensajes()
}, [])

const cerrarSesion = async (e) => {

    e.preventDefault()
    localStorage.clear();
    router.push("/")

}

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
                <AccordionIcon />
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
                <AiOutlineMenu size="20"/> &nbsp;  Men??
                </Button>
                <Button colorScheme='blue' position="absolute" right="0" onClick={cerrarSesion} h="16">
                <BsFillDoorClosedFill size="20"/> &nbsp; Cerrar Sesi??n
                </Button>
            </Box>

            <Button mt={10} name="atras" leftIcon={<ArrowBackIcon/>} colorScheme="blue" as="b" rounded="40" marginLeft="-60%"
        onClick={()=>router.push("/Vecino/inicio_vecino")}>
        Volver atr??s</Button>

            <Drawer placement='left'  onClose={onClose} isOpen={isOpen} >
        <DrawerOverlay />
        <DrawerContent>
        <DrawerHeader  backgroundColor="blue.500" color="white" alignItems="center" display="flex"> 
  <AiOutlineMenu size="20"/> 
  &nbsp; 
  Men??
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
            <BsFillEnvelopeFill color="white" size="50"/>
            <Text fontSize={50} color="white" as={"b"} >Mensajes</Text>
        </HStack>
        <Stack mt={30} width={"90%"} alignItems="center" rounded="16" backgroundColor="whiteAlpha.900" direction={['column']}>

                    <Accordion allowToggle key={mensajes._id} width={"100%"} mt={5} mb={5}>
                    {showMensajes()}
                    </Accordion>

        </Stack>
        </Flex>
    );
};

export default MensajesVecino;