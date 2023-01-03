import { useState, useEffect } from "react";
import { useDisclosure,Text, Box, Stack, Button, HStack, Card, CardHeader, CardBody, CardFooter, Flex, DrawerHeader,DrawerBody,DrawerFooter,Drawer,DrawerOverlay,DrawerContent  } from "@chakra-ui/react";
import { useRouter } from "next/router";
import axios from "axios";
import { BsFillHouseFill,BsFillDoorClosedFill,BsWrench,BsFillPersonFill, BsFillCreditCard2BackFill,BsCalendar3,BsFillEnvelopeFill, BsFillFileEarmarkExcelFill, } from "react-icons/bs";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

const Inicio_vecino = () => {
    const router = useRouter();
    const {
        query: { codigo },
    } = router;

    const props = {
        codigo,
    };

    const router1 = useRouter();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [vecino, setVecino] = useState([]);

    const setCookieFunction = (codigo) => {
        localStorage.setItem('codigo', codigo)
    }

    const getVecino = async () => {
        if(codigo){
            setCookieFunction(codigo)
            const response = await axios.get(`${process.env.API_URL}/vecino/search/${props.codigo}`)
            setVecino(response.data);
        }else{
            const response = await axios.get(`${process.env.API_URL}/vecino/search/${localStorage.getItem('codigo')}`)
            setVecino(response.data);
        }
    };

    useEffect(() => {
        getVecino();
    }, []);

    const showVecino = () => {
        const arreglo = [vecino.nombre, vecino.apellido, vecino.vivienda, vecino.permiso]
        return (
            arreglo
        );
    };

    const cerrarSesion = async (e) => {
        e.preventDefault()
        localStorage.clear();
        router.push("/")
    }

    return (
        <Flex
            flexDirection = "column"
            width="100wh"
      height="auto"
      minH={"100vh"}
            backgroundColor="blue.300"
            alignItems={"center"}
        >
            <Box backgroundColor="blue.500" w={"100%"} h="16">
                <Button colorScheme='blue' onClick={onOpen} h="16">
                <AiOutlineMenu size="20"/> &nbsp;  Menú
                </Button>
                <Button colorScheme='blue' position="absolute" right="0" onClick={cerrarSesion} h="16">
                <BsFillDoorClosedFill size="20"/> &nbsp; Cerrar Sesión
                </Button>
            </Box>


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

            <HStack mt = {30} mb = {30}>
                <BsFillHouseFill color="white" size="50"/>
                <Text fontSize = {50} color = "white"as='b'>
                    Inicio
                </Text>
            </HStack>

            <Box width = {"100%"} >
                <Stack
                    spacing = {4}
                    p = "1rem"
                    backgroundColor = "whiteAlpha.900"
                    boxShadow = "md"
                    flexDir = "column"
                    mb = "10"
                    justifyContent = "center"
                    alignItems = "center"
                >
                    <HStack>
                    <BsFillPersonFill style={{ color: '#3182CE' }} size="30"/>
                        <Text as='b' fontSize = {30} color = "blue.500">
                            Datos Personales
                        </Text>
                    </HStack>

                    <Stack fontSize = {25} direction={['column', 'row']} spacing={20} >
                        <Stack direction={['row']}>
                            <Text color = "blue.500" as='b'>Nombre:</Text>
                            <Text>{showVecino()[0]+" "+showVecino()[1]}</Text>
                        </Stack>
                        <Stack direction={['row']}>
                            <Text color = "blue.500" as='b'>Vivienda:</Text>
                            <Text>{showVecino()[2]}</Text>
                        </Stack>
                        <Stack direction={['row']}>
                            <Text color = "blue.500" as='b'>Permiso:</Text>
                            <Text as='b' color='green' textTransform={'uppercase'}>{showVecino()[3]}</Text>
                        </Stack>
                    </Stack>
                </Stack>
            </Box>

                <Stack
                    direction={['column', 'row']}
                    p={5}
                    spacing={5}
                    backgroundColor={"whiteAlpha.900"}
                    width={"100%"}
                >
                    <Stack width={"100%"} >
                    <Card rounded = "16" textAlign={'center'} backgroundColor="whiteAlpha.900" height={"full"}>
                    <CardHeader backgroundColor="blue.400" rounded = "16" alignItems="center">
                        <Text color = "whiteAlpha.900" textAlign={'center'} justifyContent="center" textTransform={'uppercase'} as='b' display="flex">
                        <BsCalendar3 size="20"/>
                        &nbsp; Historial Reservas
                        </Text>
                    </CardHeader>

                        <CardBody>
                            <Text textAlign={'justify'}>
                            Despliegue detallado de reservas anteriormente realizadas.</Text>
                        </CardBody>

                        <CardFooter justifyContent={'center'}>
                            <Button
                                variant = {"solid"}
                                colorScheme = "blue"
                                width = {"80%"}
                                rounded = "50"
                                onClick = {() => router1.push({pathname:'/Vecino/reservas_vecino', query:{codigo: vecino.codigo},})}
                            >
                                Ingresar
                            </Button>
                        </CardFooter>
                    </Card>
                    </Stack>

                    <Stack width={"100%"} >
                    <Card rounded = "16" textAlign={'center'} backgroundColor="whiteAlpha.900" height={"full"}>
                    <CardHeader backgroundColor="blue.400" rounded = "16" alignItems="center">
                        <Text color = "whiteAlpha.900" textAlign={'center'} justifyContent="center" textTransform={'uppercase'} as='b' display="flex">
                        <BsFillFileEarmarkExcelFill size="20"/>
                        &nbsp;Multas
                        </Text>
                    </CardHeader>

                        <CardBody>
                            <Text textAlign={'justify'}>
                            Despliegue detallado de multas obtenidas a través del tiempo.
                            </Text>
                        </CardBody>

                        <CardFooter justifyContent={'center'}>
                            <Button
                                variant = "solid"
                                colorScheme = "blue"
                                width = {"80%"}
                                rounded = "50"
                                onClick = {() => router1.push({pathname: '/Vecino/multas_vecino', query:{codigo: vecino.codigo},})}
                            >
                                Ingresar
                            </Button>
                        </CardFooter>
                    </Card>
                    </Stack>

                    <Stack width={"100%"}>
                    <Card rounded = "16" textAlign={'center'} backgroundColor="whiteAlpha.900" height={"full"}>
                    <CardHeader backgroundColor="blue.400" rounded = "16" alignItems="center">
                        <Text color = "whiteAlpha.900" textAlign={'center'} justifyContent="center" textTransform={'uppercase'} as='b' display="flex">
                        <BsFillCreditCard2BackFill size="20"/>
                        &nbsp;Gastos
                        </Text>
                    </CardHeader>

                        <CardBody>
                            <Text textAlign={'justify'}>
                            Despliegue detallado de gastos anteriormente realizados al reservar servicios
                            </Text>
                        </CardBody>

                        <CardFooter justifyContent={'center'}>
                            <Button
                                variant = "solid"
                                colorScheme = "blue"
                                width = {"80%"}
                                rounded = "50"
                                onClick = {() => router1.push("/Vecino/gastos_vecino")}
                            >
                                Ingresar
                            </Button>
                        </CardFooter>
                    </Card>
                    </Stack>

                    <Stack width={"100%"}>
                    <Card rounded = "16" textAlign={'center'} backgroundColor="whiteAlpha.900" height={"full"}>
                    <CardHeader backgroundColor="blue.400" rounded = "16" alignItems="center">
                        <Text color = "whiteAlpha.900" textAlign={'center'} justifyContent="center" textTransform={'uppercase'} as='b' display="flex">
                        <BsFillEnvelopeFill size="20"/>
                        &nbsp;Mensajes
                        </Text>
                    </CardHeader>

                        <CardBody>
                            <Text textAlign={'justify'}>
                            Despliegue de los mensajes enviados por administrador.
                            </Text>
                        </CardBody>

                        <CardFooter justifyContent={'center'}>
                            <Button
                                variant = "solid"
                                colorScheme = "blue"
                                width = {"80%"}
                                rounded = "50"
                                onClick = {() => router1.push("/Vecino/mensajes_vecino")}
                            >
                                Ingresar
                            </Button>
                        </CardFooter>
                    </Card>
                    </Stack>
                </Stack>
        </Flex>
    );
};

export default Inicio_vecino;