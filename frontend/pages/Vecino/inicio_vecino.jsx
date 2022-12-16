import { useState, useEffect } from "react";
import { Text, Box, Stack, Button, HStack, Card, CardHeader, CardBody, CardFooter} from "@chakra-ui/react";
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

    const setCookieFunction = (value) => {
        localStorage.setItem('codigo', value)
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
                <Text fontSize = {50} color = "white" mt = {30} mb = {30}>
                    Inicio
                </Text>
            </HStack>

            <Box minW = {{ base: "10%",  md: "50"}} width={600}>
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
                            Datos personales
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
                width = {800}
            >
                <Stack
                    minW = {{ base: "10%"}}
                    width={800}
                    spacing = {50}
                    p = "2rem"
                    direction={['column', 'row']}
                >

                    <Card textAlign={'center'} width={600} height={300}>
                        <CardHeader>
                            <Text textTransform={'uppercase'} as='b'>Historial Reservas</Text>
                        </CardHeader>

                        <CardBody>
                            <Text textAlign={'justify'}>
                                Despliegue detallado de reservas anteriormente realizadas.
                            </Text>
                        </CardBody>

                        <CardFooter justifyContent={'center'}>
                            <Button
                                borderRadius = {0}
                                variant = "solid"
                                colorScheme = "blue"
                                width = {160}
                                height={50}
                                rounded = "50"
                                onClick = {() => router1.push("/reservas_vecino")}
                            >
                                Ingresar
                            </Button>
                        </CardFooter>
                    </Card>

                    <Card textAlign={'center'} width={600} height={300}>
                        <CardHeader>
                            <Text textAlign={'center'} textTransform={'uppercase'} as='b' >Disponibilidad</Text>
                        </CardHeader>

                        <CardBody>
                            <Text textAlign={'justify'}>
                                Despliegue de calendario de disponibilidad de servicios para reservar.
                            </Text>
                        </CardBody>

                        <CardFooter justifyContent={'center'}>
                            <Button
                                borderRadius = {0}
                                variant = "solid"
                                colorScheme = "blue"
                                width = {160}
                                height={50}
                                rounded = "50"
                                onClick = {() => router1.push("/")}
                            >
                                Ingresar
                            </Button>
                        </CardFooter>
                    </Card>
                </Stack>

                <Stack
                    minW = {{ base: "10%"}}
                    width={800}
                    spacing = {50}
                    p = "2rem"
                    justifyContent = "center"
                    alignItems = "center"
                    direction={['column', 'row']}
                >
                    <Card textAlign={'center'} width={600} height={300}>
                        <CardHeader>
                            <Text textAlign={'center'} textTransform={'uppercase'} as='b' >Gastos</Text>
                        </CardHeader>

                        <CardBody>
                            <Text textAlign={'justify'}>
                                Despliegue detallado de gastos anteriormente realizados al reservar servicios
                            </Text>
                        </CardBody>

                        <CardFooter justifyContent={'center'}>
                            <Button
                                borderRadius = {0}
                                variant = "solid"
                                colorScheme = "blue"
                                width = {160}
                                height={50}
                                rounded = "50"
                                mr = {5}
                                ml = {5}
                            >
                                Ingresar
                            </Button>
                        </CardFooter>
                    </Card>

                    <Card textAlign={'center'} width={600} height={300}>
                        <CardHeader>
                            <Text textAlign={'center'} textTransform={'uppercase'} as='b' >Mensajes</Text>
                        </CardHeader>

                        <CardBody>
                            <Text textAlign={'justify'}>
                                Despliegue de los mensajes enviados por administrador.
                            </Text>
                        </CardBody>

                        <CardFooter justifyContent={'center'}>
                            <Button
                                borderRadius = {0}
                                variant = "solid"
                                colorScheme = "blue"
                                width = {160}
                                height={50}
                                rounded = "50"
                                mr = {5}
                                ml = {5}
                            >
                                Ingresar
                            </Button>
                        </CardFooter>
                    </Card>
                </Stack>
            </Box>
        </Stack>
    );
};

export default Inicio_vecino;
