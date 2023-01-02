import { useState, useEffect } from 'react'
import {  useDisclosure,DrawerOverlay,DrawerContent,DrawerHeader,DrawerBody,DrawerFooter,Drawer,Flex, Text, Box, Stack,Button,InputGroup, InputLeftElement,HStack, Input, Select  } from "@chakra-ui/react";
import axios from 'axios'
import Swal from 'sweetalert2'
import { useRouter } from "next/router";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { BsFillHouseFill,BsFillDoorClosedFill,BsWrench,BsFillPeopleFill, BsFillCreditCard2BackFill,BsCalendar3,BsFillEnvelopeFill, BsFillFileEarmarkExcelFill } from "react-icons/bs";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

const AgregarCobro = () =>{
    const { isOpen, onOpen, onClose } = useDisclosure()
    const today = new Date();
    const month= today.getMonth()+1;
    const year= today.getFullYear();
    const router = useRouter();

    const [values, setValues]= useState({
        multa_total:'',
        reserva_total:'',
        vecino:'',
        mes: month.toString(),
        year: year.toString()
    })

    const onChange = async (e) =>{
        if(e.target.name == "vecino"){
            const response = await axios.get(`${process.env.API_URL}/vecino/search/${e.target.value}`)
            setValues({
                ...values,
                [e.target.name]:response.data._id
            })
        }else if(e.target.name == "multa_total" || e.target.name == "reserva_total"){
            setValues({
                ...values,
                [e.target.name]: Number(e.target.value)
            })
            if(e.target.value.length > 5){
                e.target.value = e.target.value.substring(0,4);
            }
        }else{
            setValues({
                ...values,
                [e.target.name]:e.target.value
            })
        }
    }
    const [vecinos, setVecinos] = useState([])

    const getVecinos = async () =>{
        try {
            const response = await axios.get(`${process.env.API_URL}/vecinos`)
            setVecinos(response.data)
        } catch (error) {
            Swal.fire({
                text:'No existe registro de vecinos',
                icon:'warning',
                showCancelButton: true,
                showConfirmButton: false,
                cancelButtonText: 'Volver atras',
                cancelButtonColor: '#d33'
            }).then((result)=>{
                if(result.isDismissed){
                    router.push("/Admin/Gastos/gastos_admin")
                }
            })
        }

    }

    useEffect(() =>{
        getVecinos()
        localStorage.setItem('reserva', 0)
    }, []);

    const showVecinos= () =>{
        return vecinos.map(vecinos =>{
            if(vecinos.estado == 'activo'){
                return (
                    <option name = "vecino" value = {vecinos.codigo} key = {vecinos._id}>{vecinos.nombre} {vecinos.apellido}</option>
                )
            }
        })
    }

    const onSubmit= async(e) =>{
        e.preventDefault()
        try {
            const response = await axios.post(`${process.env.API_URL}/cobro/${vecino_select.value}`,values)

            if(response.status === 201){
                Swal.fire({
                    title:"Cobro Realizada",
                    icon:'success',
                    confirmButtonText:'OK'
                }).then(() =>{
                    window.location.reload();
                })
            }
        } catch (error) {
            Swal.fire({
                title:"No se pudo realizar el Cobro",
                text:'Por favor revise los datos ingresado',
                icon:'warning',
                confirmButtonText:'OK'
            })
        }
    }

    const cerrarSesion = async (e) => {
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
        alignItems = "center">
            <Box 
                backgroundColor = "blue.500" 
                w = {"100%"}
                h = "16">
                <Button
                    colorScheme = 'blue' 
                    onClick = {onOpen}
                    h = "16">
                    <AiOutlineMenu size = "20"/> 
                    &nbsp;  Menú
                </Button>
                <Button
                    colorScheme = 'blue'
                    marginLeft = "80%"
                    onClick = {cerrarSesion}
                    h = "16">
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
                onClick = {() => router.push("/Admin/Gastos/gastos_admin")}>
                Volver atrás
            </Button>

            <Drawer 
                placement = 'left'
                onClose = {onClose}
                isOpen = {isOpen}>
                    <DrawerOverlay />
                    <DrawerContent>
                        <DrawerHeader
                            backgroundColor = "blue.500"
                            color = "white"
                            alignItems = "center"
                            display = "flex"> 
                            <AiOutlineMenu size="20"/> &nbsp; Menú
                        </DrawerHeader>
                        <DrawerBody backgroundColor = "blue.300">
                            <Button width = {"100%"} colorScheme = "blue" mb = "2" height = "20" fontSize = "20" onClick = {() => router.push("/Admin/inicio_admin")}><BsFillHouseFill size="20"/>&nbsp;   Inicio</Button>
                            <Button width = {"100%"} colorScheme = "blue" mb = "2" height = "20" fontSize = "20" onClick = {() => router.push("/Admin/Reservas/reservas_admin")}><BsCalendar3 size="20"/>&nbsp; Reservas</Button>
                            <Button width = {"100%"} colorScheme = "blue" mb = "2" height = "20" fontSize = "20" onClick = {() => router.push("/Admin/Gastos/gastos_admin")}><BsFillCreditCard2BackFill size="20"/>&nbsp; Gastos</Button>
                            <Button width = {"100%"} colorScheme = "blue" mb = "2" height = "20" fontSize = "20" onClick = {() => router.push("/Admin/Mensajes/mensajes_admin")}><BsFillEnvelopeFill size="20"/>&nbsp; Mensajes</Button>
                            <Button width = {"100%"} colorScheme = "blue" mb = "2" height = "20" fontSize = "20" onClick = {() => router.push("/Admin/Multas/multas_admin")}><BsFillFileEarmarkExcelFill size="20"/>&nbsp; Multas</Button>
                            <Button width = {"100%"} colorScheme = "blue" mb = "2" height = "20" fontSize = "20" onClick = {() => router.push("/Admin/Mantenciones/mantenciones_admin")}><BsWrench size="20"/>&nbsp; Manteciones</Button>
                            <Button width = {"100%"} colorScheme = "blue" mb = "2" height = "20" fontSize = "20" onClick = {() => router.push("/Admin/Vecino/vecinos_admin")}><BsFillPeopleFill size="20"/>&nbsp; Vecinos</Button>
                        </DrawerBody>
                        <DrawerFooter backgroundColor = "blue.300">
                            <Button
                                mr = {3}
                                onClick = {onClose}
                                colorScheme = "blue">
                                <AiOutlineClose size="20"/>&nbsp;Cerrar
                            </Button>
                        </DrawerFooter>
                    </DrawerContent>
            </Drawer>
            <HStack mt = {30} mb = {30}>
                <BsFillCreditCard2BackFill color="white" size="50"/>
                <Text
                    fontSize = {50}
                    color = "white"
                    as = {"b"}
                    mt = {30}
                    mb = {30}
                >
                    Generar Cobro
                </Text>
            </HStack>
            <Stack
                spacing = {4}
                p = "1rem"
                backgroundColor = "whiteAlpha.900"
                boxShadow = "md"
                rounded = "16"
                flexDir = "column"
                mb = "2"
                justifyContent = "left"
                alignItems = "left">
                <HStack mt = {6}>
                    <Text 
                        width = {180}
                        color = {"blue.400"}
                        as = "b"
                    >
                        Fecha de Cobro:
                    </Text>
                    <Text width = {"full"}>{month}/{year}</Text>
                </HStack>
                <HStack>
                    <Text
                        width = {140}
                        color = {"blue.400"}
                        as = "b"
                    >
                        Multa Total:
                    </Text>
                    <InputGroup>
                        <InputLeftElement
                            pointerEvents = 'none'
                            fontSize = '1.2em'
                            children = '$'/>
                        <Input 
                            width = {"full"}
                            placeholder = {'0'}
                            type = {"number"}
                            name = {"multa_total"}
                            onChange = {onChange}>
                        </Input>
                    </InputGroup>
                </HStack>
                <HStack>
                    <Text
                        width = {180}
                        color = {"blue.400"}
                        as = "b"
                    >
                        Reserva Total:
                    </Text>
                    <InputGroup>
                        <InputLeftElement
                            pointerEvents = 'none'
                            fontSize = '1.2em'
                            children = '$'/>
                        <Input
                            width = {"full"}
                            placeholder = {'6000'}
                            type = {"number"}
                            name = {"reserva_total"} 
                            onChange = {onChange}>
                        </Input>
                    </InputGroup>
                </HStack>
                <HStack>
                    <Text
                        color = {"blue.400"}
                        as = "b"
                    >
                        Vecino:
                    </Text>
                    <Select  
                        width = {"full"}
                        id = "vecino_select"
                        placeholder = 'Vecinos'
                        name = "vecino"
                        onChange = {onChange}>
                        {showVecinos()}
                    </Select>
                </HStack>
                <Button
                    mb = {2}
                    variant = "solid"
                    colorScheme = "blue"
                    rounded = "50"
                    onClick = {onSubmit}
                >
                    Agregar
                </Button>
            </Stack>
        </Flex>
    )
}

export default AgregarCobro
