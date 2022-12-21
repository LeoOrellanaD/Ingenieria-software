import { useState, useEffect } from "react";
import { Text, Box, Stack, Button, HStack, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon,} from "@chakra-ui/react";
import { useRouter } from "next/router";
import axios from "axios";

const Inicio_vecino = () => {
    const router = useRouter();
    const {
        query: { codigo },
    } = router;

    const props = {
        codigo,
    };

    const router1 = useRouter();

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

    return (
        <Stack
            flexDirection = "column"
            width = "full"
            height = "140vh"
            backgroundColor = "blue.400"
            alignItems = "center"
        >

            <HStack>
                <Text fontSize = {50} color = "white" mt = {30} mb = {30} as='b'>
                    INICIO
                </Text>
            </HStack>

            <Box minW = {{ base: "10%",  md: "50"}} width = {600}>
                <Stack
                    spacing = {4}
                    p = "1rem"
                    backgroundColor = "whiteAlpha.900"
                    boxShadow = "md"
                    rounded = "16"
                    flexDir = "column"
                    mb = "10"
                    justifyContent = "center"
                    alignItems = "center"
                >

                    <HStack>
                        <Text as='b' fontSize = {20} color = "blue.500">
                            DATOS PERSONALES
                        </Text>
                    </HStack>

                    <Stack direction={['column', 'row']}>
                        <Text as='b'>Nombre:</Text>
                        <Text>{showVecino()[0]+" "+showVecino()[1]}</Text>
                    </Stack>

                    <Stack direction={['column', 'row']}>
                        <Text as='b'>Vivienda:</Text>
                        <Text>{showVecino()[2]}</Text>
                        <Text as='b'>Permiso:</Text>
                        <Text as='b' color='green' textTransform={'uppercase'}>{showVecino()[3]}</Text>
                    </Stack>

                    <Button
                            borderRadius = {0}
                            type = "submit"
                            variant = "solid"
                            colorScheme = "blue"
                            width = {150}
                            height = {50}
                            rounded = "50"
                        >
                        Editar
                    </Button>
                </Stack>
            </Box>

            <Box
                backgroundColor = "whiteAlpha.900"
                boxShadow = "md"
                rounded = "16"
                minW = {{ base: "10%", width: "90"}}
                width = {900}
            >
                <HStack
                    minW = {{ base: "10%"}}
                    width={900}
                    spacing = {30}
                    p = "2rem"
                    direction={['column', 'row']}
                >
                    <Stack width = {700} height = {230} alignItems = 'center' boxShadow = "md" rounded = "16">
                    <Accordion allowToggle >
                            <AccordionItem>
                                <h2 >
                                    <AccordionButton width={260}>
                                        <Box as="span" flex='1' >
                                            <Text as='b' textTransform={'uppercase'} textAlign={'center'}>
                                                Historial Reservas
                                            </Text>
                                        </Box>
                                        <AccordionIcon />
                                    </AccordionButton>
                                </h2>
                                <Box>
                                <AccordionPanel textAlign={'justify'}>
                                    <Text height={90}>Despliegue detallado de reservas anteriormente realizadas.</Text>
                                </AccordionPanel>
                                </Box>
                            </AccordionItem>
                            </Accordion>
                            <Button
                                borderRadius = {0}
                                variant = "solid"
                                colorScheme = "blue"
                                width = {160}
                                height={50}
                                rounded = "50"
                                mt={60}
                                onClick = {() => router1.push({pathname:'/Vecino/reservas_vecino', query:{codigo: vecino.codigo},})}
                            >
                                Ingresar
                            </Button>
                    </Stack>

                    <Stack width={700} height={230} alignItems='center' boxShadow = "md" rounded = "16">
                        <Accordion allowToggle >
                            <AccordionItem>
                                <h2 >
                                    <AccordionButton width={260}>
                                        <Box as="span" flex='1' >
                                            <Text as='b' textTransform={'uppercase'} textAlign={'center'}>
                                                Multas
                                            </Text>
                                        </Box>
                                        <AccordionIcon />
                                    </AccordionButton>
                                </h2>
                                <Box>
                                <AccordionPanel textAlign={'justify'}>
                                    <Text height={90}>Despliegue detallado de multas obtenidas a través del tiempo.</Text>
                                </AccordionPanel>
                                </Box>
                            </AccordionItem>
                            </Accordion>
                            <Button
                                borderRadius = {0}
                                variant = "solid"
                                colorScheme = "blue"
                                width = {160}
                                height={50}
                                rounded = "50"
                                mt={60}
                                onClick = {() => router1.push({pathname: '/Vecino/multas_vecino', query:{codigo: vecino.codigo},})}
                            >
                                Ingresar
                            </Button>
                    </Stack>

                        <Stack width={700} height={230} alignItems='center' boxShadow = "md" rounded = "16">
                            <Accordion allowToggle>
                            <AccordionItem>
                                <h2 >
                                    <AccordionButton width={260}>
                                        <Box as="span" flex='1'>
                                            <Text as='b' textTransform={'uppercase'} textAlign={'center'}>
                                                Disponibilidad
                                            </Text>
                                        </Box>
                                    <AccordionIcon />
                                    </AccordionButton>
                                </h2>
                                <Box>
                                <AccordionPanel  textAlign={'justify'}>
                                    <Text height={90}>Despliegue de calendario de disponibilidad de servicios para reservar.</Text>
                                </AccordionPanel>
                                </Box>
                            </AccordionItem>
                            </Accordion>
                            <Button
                                borderRadius = {0}
                                variant = "solid"
                                colorScheme = "blue"
                                width = {160}
                                height={50}
                                rounded = "50"
                                mt={60}
                                onClick = {() => router1.push("/Vecino/disponibilidad_vecino")}
                            >
                                Ingresar
                            </Button>
                        </Stack>
                </HStack>

                <HStack
                    minW = {{ base: "10%"}}
                    width={900}
                    spacing = {30}
                    p = "2rem"
                    direction={['column', 'row']}
                    alignItems={'center'}
                >
                    <Stack width={900} height={230} alignItems='center' boxShadow = "md" rounded = "16">
                        <Accordion allowToggle>
                            <AccordionItem>
                                <h2 >
                                    <AccordionButton width={405}>
                                        <Box as="span" flex='1'>
                                            <Text as='b' textTransform={'uppercase'} textAlign={'center'}>
                                                Gastos
                                            </Text>
                                        </Box>
                                        <AccordionIcon />
                                    </AccordionButton>
                                </h2>
                                <Box>
                                <AccordionPanel textAlign={'justify'}>
                                    <Text height={90}>Despliegue detallado de gastos anteriormente realizados al reservar servicios</Text>
                                </AccordionPanel>
                                </Box>
                            </AccordionItem>
                        </Accordion>
                        <Button
                                    borderRadius = {0}
                                    variant = "solid"
                                    colorScheme = "blue"
                                    width = {160}
                                    height={50}
                                    rounded = "50"
                                    onClick = {() => router1.push("/Vecino/gastos_vecino")}
                                >
                                    Ingresar
                                </Button>
                    </Stack>

                    <Stack width={900} height={230} alignItems='center' boxShadow = "md" rounded = "16">
                        <Accordion allowToggle>
                            <AccordionItem>
                                <h2 >
                                    <AccordionButton width={405}>
                                        <Box as="span" flex='1'>
                                            <Text as='b' textTransform={'uppercase'} textAlign={'center'}>
                                                Mensajes
                                            </Text>
                                        </Box>
                                        <AccordionIcon />
                                    </AccordionButton>
                                </h2>
                                <AccordionPanel textAlign={'justify'}>
                                    <Text height={90}>Despliegue de los mensajes enviados por administrador.</Text>
                                </AccordionPanel>
                            </AccordionItem>
                        </Accordion>
                        <Button
                                    borderRadius = {0}
                                    variant = "solid"
                                    colorScheme = "blue"
                                    width = {160}
                                    height={50}
                                    rounded = "50"
                                    onClick = {() => router1.push("/Vecino/mensajes_vecino")}
                                >
                                    Ingresar
                        </Button>
                    </Stack>
                </HStack>
            </Box>
        </Stack>
    );
};

export default Inicio_vecino;
