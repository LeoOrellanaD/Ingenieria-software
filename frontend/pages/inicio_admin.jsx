import { useState, useEffect } from "react";
import { Text, Box, Stack, Button, HStack, Card, CardHeader, CardBody, CardFooter, Input } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { EditIcon } from '@chakra-ui/icons'
import axios from "axios";
import Swal from 'sweetalert2'


const Inicio_admin = () => {
    const router = useRouter();
    const {
        query: { codigo },
    } = router;

    const props = {
        codigo,
    };

    const router1 = useRouter();

    const [administrador, setAdmin] = useState([]);

    const setCookieFunction = (value) => {
        localStorage.setItem('codigo', value)
    }

    const getAdmin = async () => {
        if(codigo){
            setCookieFunction(codigo)
            const response = await axios.get(`${process.env.API_URL}/administrador/search/${props.codigo}`)
            setAdmin(response.data);
        }else{
            const response = await axios.get(`${process.env.API_URL}/administrador/search/${localStorage.getItem('codigo')}`)
            setAdmin(response.data);
        }
        console.log(administrador)
    };

    useEffect(() => {
        getAdmin();
    }, []);

    const showAdmin = () => {
        const arreglo = [administrador.nombre, administrador.apellido, administrador.telefono, administrador.codigo]
        return (
            arreglo
        );
    };


const [visible, setVisible] = useState(false);

const onSubmit = async(e) => {
    e.preventDefault()
        console.log(input)
        const inputType = typeof input;
        console.log(inputType);
    try{
        const response =await axios.put(`${process.env.API_URL}/administrador/update/${props.codigo}`,{telefono:input})

        if (response.status===200){
            Swal.fire({
                title:"Numero de telefono actualizado",
                icon:'success',
                confirmButtonText:'OK'
            }).then(()=>{
                setVisible(true)
                window.location.reload();
            })



        }
    }
    catch(error){
       console.log(error.status)
       Swal.fire({
        title:"numero no valido",
        text:"Ingrese un numero valido por favor",
        icon:'warning',
        confirmButtonText:"OK"
      })
    }
}

const [input, setInput] = useState("");

const Carga = (e) =>{
    setInput("+569"+e.target.value);
};




    return (
        <Stack
            flexDirection = "column"
            width = "100wh"
            height = "130vh"
            backgroundColor = "blue.400"
            alignItems = "center"
        >

            <HStack>
                <Text fontSize = {50} color = "white" mt = {30} mb = {30}>
                    Inicio
                </Text>
            </HStack>

            <Box minW = {{ base: "10%", md: "50" }} width={600}>
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

                    <HStack >
                        <Text as='b' fontSize = {20} color = "blue.500" >
                            Datos personales
                        </Text>
                    </HStack>

                    <HStack>
                        <Text as='b'>Nombre:</Text>
                        <Text>{showAdmin()[0]+" "+showAdmin()[1]}</Text>
                    </HStack>

                    <HStack>
                        <Text as='b'>Telefono:</Text>
                        <Text id="numero" style={{display: visible ? 'none' : 'inline'}}>{showAdmin()[2]}</Text>
                        <Text id="n" style={{display: visible ? 'inline' : 'none'}}> +569</Text>
                        <Input type="number" id="nu" onChange={Carga} style={{display: visible ? 'inline' : 'none'}}></Input>
                    </HStack>

                    <Button
                            borderRadius = {20}
                            type = "submit"
                            variant = "solid"
                            colorScheme = "blue"
                            width = "30%"
                            rounded = "50"
                            rightIcon={<EditIcon /> }
                            id="editar"
                            onClick={() => setVisible(true)}
                            style={{display: visible ? 'none' : 'inline'}}
                        >
                        Editar
                    </Button>
                    <Button
                            borderRadius = {20}
                            type = "submit"
                            variant = "solid"
                            colorScheme = "blue"
                            width = "30%"
                            rounded = "50"
                            rightIcon={<EditIcon /> }
                            id="guardar"
                            onClick={onSubmit}
                            style={{display: visible ? 'inline' : 'none'}}
                        >
                        Guardar
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
                            <Text textTransform={'uppercase'} as='b'>Reservas</Text>
                        </CardHeader>

                        <CardBody>
                            <Text textAlign={'justify'}>
                                Despliegue detallado de reservas realizadas por los usuarios.
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
                                onClick = {() => router1.push("/reservas_admin")}
                            >
                                Ingresar
                            </Button>
                        </CardFooter>
                    </Card>

                    <Card textAlign={'center'} width={600} height={300}>
                    <CardHeader>
                            <Text textAlign={'center'} textTransform={'uppercase'} as='b' >Gastos</Text>
                        </CardHeader>

                        <CardBody>
                            <Text textAlign={'justify'}>
                                Despliegue de gastos realizados por los usuarios.
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
                                onClick = {() => router1.push("/gastos_admin")}
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
                                Despliegue de página para enviar mensajes a usuarios.
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
                                onClick = {() => router1.push("/mensajes_admin")}
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
                    direction={['column', 'row']}
                >
                    <Card textAlign={'center'} width={600} height={300}>
                    <CardHeader>
                            <Text textAlign={'center'} textTransform={'uppercase'} as='b' >Multas</Text>
                        </CardHeader>

                        <CardBody>
                            <Text textAlign={'justify'}>
                                Despliegue de multas aplicadas a usuarios.
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
                                onClick = {() => router1.push("/multas_admin")}
                            >
                                Ingresar
                            </Button>
                        </CardFooter>
                    </Card>

                    <Card textAlign={'center'} width={600} height={300}>
                    <CardHeader>
                            <Text textAlign={'center'} textTransform={'uppercase'} as='b' >Mantenciones</Text>
                        </CardHeader>

                        <CardBody>
                            <Text textAlign={'justify'}>
                                Despliegue de mantenciones realizadas con anterioridad.
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
                                onClick = {() => router1.push("/mantenciones_admin")}
                            >
                                Ingresar
                            </Button>
                        </CardFooter>
                    </Card>

                    <Card textAlign={'center'} width={600} height={300}>
                    <CardHeader>
                            <Text textAlign={'center'} textTransform={'uppercase'} as='b' >Vecinos</Text>
                        </CardHeader>

                        <CardBody>
                            <Text textAlign={'justify'}>
                                Despliegue detallada de usuarios del sistema.
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
                                onClick = {() => router1.push("/vecinos_admin")}
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

export default Inicio_admin;
