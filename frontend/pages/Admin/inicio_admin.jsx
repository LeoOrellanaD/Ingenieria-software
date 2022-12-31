import { useState, useEffect } from "react";
import { useDisclosure,Text, Box, Stack, Button, HStack, Card, CardHeader, CardBody, CardFooter, Input, Drawer, DrawerFooter, DrawerOverlay,DrawerContent,DrawerHeader,DrawerBody } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { EditIcon } from '@chakra-ui/icons'
import axios from "axios";
import Swal from 'sweetalert2'
import { BsFillHouseFill,BsFillPersonFill,BsPower,BsWrench } from "react-icons/bs";


const Inicio_admin = () => {
    const router = useRouter();
    const { isOpen, onOpen, onClose } = useDisclosure()
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
    };

    useEffect(() => {
        document.title="Lavanderia 60 minutos";
        getAdmin();
        localStorage.setItem('reserva', 0)
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
                title:"Número de teléfono actualizado",
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
        title:"Numero de teléfono no valido",
        text:"Ingrese un Número de teléfono valido por favor",
        icon:'warning',
        confirmButtonText:"OK"
      })
    }
}

const [input, setInput] = useState("");

const Carga = (e) =>{
    if(e.target.value.length>8){
        e.target.value=e.target.value.substring(0,8);
    }
    setInput("+569"+e.target.value);
};

const cerrarSesion = async (e) => {

    e.preventDefault()
    localStorage.clear();
    router.push("/")

}




    return (
        <Stack
        flexDirection = "column"
        width="150wh"
        height="auto"
        minH={"100vh"}
        backgroundColor = "blue.300"
        alignItems = "center"
        >
            <Box backgroundColor="blue.500" w={"100%"} h="16">
                <Button colorScheme='blue' onClick={onOpen} h="16">
                    Menu
                </Button>
                <Button colorScheme='blue'  marginLeft="80%" onClick={cerrarSesion} h="16">
                <BsPower size="20"/> &nbsp; Cerrar Sesión
                </Button>
            </Box>

            <Drawer placement='left'  onClose={onClose} isOpen={isOpen} >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader  backgroundColor="blue.500" color="white">Menu</DrawerHeader>
          <DrawerBody backgroundColor="blue.300">
            <Button width={"100%"} colorScheme="blue" mb="2" height="20" fontSize="20">Inicio</Button>
            <Button width={"100%"} colorScheme="blue" mb="2" height="20" fontSize="20">Reservas</Button>
            <Button width={"100%"} colorScheme="blue" mb="2" height="20" fontSize="20">Gastos</Button>
            <Button width={"100%"} colorScheme="blue" mb="2" height="20" fontSize="20">Mensajes</Button>
            <Button width={"100%"} colorScheme="blue" mb="2" height="20" fontSize="20">Multas</Button>
            <Button width={"100%"} colorScheme="blue" mb="2" height="20" fontSize="20">Manteciones</Button>
            <Button width={"100%"} colorScheme="blue" mb="2" height="20" fontSize="20">Vecinos</Button>


          </DrawerBody>
          <DrawerFooter backgroundColor="blue.300">
            <Button mr={3} onClick={onClose} colorScheme="blue">
              Cerrar
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      <HStack>
  <BsFillHouseFill color="white" size="50"/>
  <Text fontSize={50} color="white" as={"b"} mt={30} mb={30}>
    Inicio
  </Text>
</HStack>

            <Box minW = {{ base: "10%", md: "50" }} width={"100%"}>
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
                    <HStack >
                    <BsFillPersonFill style={{ color: '#3182CE' }} size="30"/>
                        <Text as='b' fontSize = {30} color = "blue.500" >
                            Datos personales
                        </Text>
                    </HStack>

                    <Stack fontSize = {25} direction={['column', 'row']} spacing={20}>
                        <Stack direction={['row']}>
                            <Text color = "blue.500" as='b'>Nombre:</Text>
                            <Text>{showAdmin()[0]+" "+showAdmin()[1]}</Text>
                        </Stack>
                        <Stack direction={['row']}>
                            <Text color = "blue.500" as='b'>Telefono:</Text>
                            <Text id="numero" style={{display: visible ? 'none' : 'inline'}}>{showAdmin()[2]}</Text>
                            <Text id="n" style={{display: visible ? 'inline' : 'none'}}>+569</Text>
                            <Input boxShadow={"outline"}  type="number" id="nu" onChange={Carga} style={{display: visible ? 'inline' : 'none'}}></Input>
                        </Stack>
                    </Stack>

                    <Button
                            type = "submit"
                            variant = "solid"
                            colorScheme = "blue"
                            width = {150}
                            height = {50}
                            rounded = "50"
                            rightIcon={<EditIcon /> }
                            id="editar"
                            onClick={() => setVisible(true)}
                            style={{display: visible ? 'none' : 'inline'}}
                        >
                        Editar
                    </Button>

                    <HStack>
                    <Button
                            borderRadius = {20}
                            type = "submit"
                            variant = "solid"
                            colorScheme = "blue"
                            width = {150}
                            height = {50}
                            rounded = "50"
                            rightIcon={<EditIcon /> }
                            id="guardar"
                            onClick={onSubmit}
                            style={{display: visible ? 'inline' : 'none'}}
                            direction="row"
                        >
                        Guardar
                    </Button>
                    <Button
                            borderRadius={20}
                            variant="solid"
                            colorScheme="blue"
                            width = {150}
                            height = {50}
                            rounded="50"
                            id="cancelar"
                            onClick={() => setVisible(false)}
                            style={{display: visible ? 'inline' : 'none'}}
                            direction="row"
                        >
                        Cancelar
                    </Button>
                    </HStack>
                </Stack>
            </Box>


            <Stack
                direction={['column', 'row']}
                p={5}
                spacing={5}
                backgroundColor={"whiteAlpha.900"}
                width={"100%"}
            >
                <Stack width={"100%"}>
                <Card rounded = "16" textAlign={'center'} backgroundColor="whiteAlpha.900" height={"full"}>
                    <CardHeader backgroundColor="blue.400" rounded = "16">
                            <Text color = "whiteAlpha.900" textTransform={'uppercase'} as='b'>Reservas</Text>
                        </CardHeader>

                        <CardBody>
                            <Text textAlign={'justify'}>
                                Despliegue detallado de reservas realizadas por los usuarios.
                            </Text>
                        </CardBody>

                        <CardFooter justifyContent={'center'}>
                            <Button
                                variant = {"solid"}
                                colorScheme = "blue"
                                width = {"80%"}
                                rounded = "50"
                                onClick = {() => router1.push("/Admin/Reservas/reservas_admin")}
                            >
                                Ingresar
                            </Button>
                        </CardFooter>
                    </Card>
                </Stack>
                    
                <Stack width={"100%"}>
                <Card rounded = "16" textAlign={'center'} backgroundColor="whiteAlpha.900" height={"full"}>
                    <CardHeader backgroundColor="blue.400" rounded = "16">
                            <Text color = "whiteAlpha.900" textAlign={'center'} textTransform={'uppercase'} as='b' >Gastos</Text>
                        </CardHeader>

                        <CardBody>
                            <Text textAlign={'justify'}>
                                Despliegue de gastos realizados por los usuarios.
                            </Text>
                        </CardBody>

                        <CardFooter justifyContent={'center'}>
                            <Button
                                variant = {"solid"}
                                colorScheme = "blue"
                                width = {"80%"}
                                rounded = "50"
                                onClick = {() => router1.push("/Admin/Gastos/gastos_admin")}
                            >
                                Ingresar
                            </Button>
                        </CardFooter>
                    </Card>
                </Stack>
                    
                <Stack width={"100%"}>
                <Card rounded = "16" textAlign={'center'} backgroundColor="whiteAlpha.900" height={"full"}>
                    <CardHeader backgroundColor="blue.400" rounded = "16">
                            <Text color = "whiteAlpha.900" textAlign={'center'} textTransform={'uppercase'} as='b' >Mensajes</Text>
                        </CardHeader>

                        <CardBody>
                            <Text textAlign={'justify'}>
                                Despliegue de página para enviar mensajes a usuarios.
                            </Text>
                        </CardBody>

                        <CardFooter justifyContent={'center'}>
                            <Button
                                variant = {"solid"}
                                colorScheme = "blue"
                                width = {"80%"}
                                rounded = "50"
                                onClick = {() => router1.push("/Admin/Mensajes/mensajes_admin")}
                            >
                                Ingresar
                            </Button>
                        </CardFooter>
                    </Card>
                </Stack>
                    
                    <Stack width={"100%"}>
                    <Card rounded = "16" textAlign={'center'} backgroundColor="whiteAlpha.900" height={"full"}>
                    <CardHeader backgroundColor="blue.400" rounded = "16">
                            <Text color = "whiteAlpha.900" textAlign={'center'} textTransform={'uppercase'} as='b' >Multas</Text>
                        </CardHeader>

                        <CardBody>
                            <Text textAlign={'justify'}>
                                Despliegue de multas aplicadas a usuarios.
                            </Text>
                        </CardBody>

                        <CardFooter justifyContent={'center'}>
                            <Button
                                variant = {"solid"}
                                colorScheme = "blue"
                                width = {"80%"}
                                rounded = "50"
                                onClick = {() => router1.push("/Admin/Multas/multas_admin")}
                            >
                                Ingresar
                            </Button>
                        </CardFooter>
                    </Card>
                    </Stack>
                    
                    <Stack width={"100%"}>
                    <Card rounded = "16" textAlign={'center'} backgroundColor="whiteAlpha.900" height={"full"}>
                    <CardHeader backgroundColor="blue.400" rounded = "16">
                            <Text color = "whiteAlpha.900"  textAlign={'center'} textTransform={'uppercase'} as='b' > < BsWrench size="20"/>Mantenciones</Text>
                        </CardHeader>

                        <CardBody>
                            <Text textAlign={'justify'}>
                                Despliegue de mantenciones realizadas con anterioridad.
                            </Text>
                        </CardBody>

                        <CardFooter justifyContent={'center'}>
                            <Button
                                variant = {"solid"}
                                colorScheme = "blue"
                                width = {"80%"}
                                rounded = "50"
                                onClick = {() => router1.push("/Admin/Mantenciones/mantenciones_admin")}
                            >
                                Ingresar
                            </Button>
                        </CardFooter>
                    </Card>
                    </Stack>
                    
                    <Stack width={"100%"}>
                    <Card rounded = "16" textAlign={'center'} backgroundColor="whiteAlpha.900" height={"full"}>
                    <CardHeader backgroundColor="blue.400" rounded = "16">
                            <Text color = "whiteAlpha.900" textAlign={'center'} textTransform={'uppercase'} as='b' >Vecinos</Text>
                        </CardHeader>

                        <CardBody>
                            <Text textAlign={'justify'}>
                                Despliegue detallada de usuarios del sistema.
                            </Text>
                        </CardBody>

                        <CardFooter justifyContent={'center'}>
                            <Button
                                variant = {"solid"}
                                colorScheme = "blue"
                                width = {"80%"}
                                rounded = "50"
                                onClick = {() => router1.push("/Admin/Vecino/vecinos_admin")}
                            >
                                Ingresar
                            </Button>
                        </CardFooter>
                    </Card>
                    </Stack>
            </Stack>
            
        </Stack>
    );
};

export default Inicio_admin;
