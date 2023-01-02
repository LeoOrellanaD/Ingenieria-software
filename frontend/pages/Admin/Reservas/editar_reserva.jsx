import { useState, useEffect } from "react";
import { useDisclosure,Text, Box, Stack,Flex, HStack, Input,Button,Drawer,DrawerFooter, DrawerOverlay,DrawerContent,DrawerHeader,DrawerBody} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { ArrowBackIcon,EditIcon } from '@chakra-ui/icons'
import axios from "axios";
import Swal from 'sweetalert2'
import { BsFillHouseFill,BsFillDoorClosedFill,BsWrench,BsFillPeopleFill, BsFillCreditCard2BackFill,BsCalendar3,BsFillEnvelopeFill, BsFillFileEarmarkExcelFill,BsCalendarEvent } from "react-icons/bs";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";


const EditarReserva = () =>  {


    const router = useRouter();
    const {
        query: { num_reserva },
    } = router;

    const props = {
        num_reserva,
    };

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [visible, setVisible] = useState(false);
    const [reserva, setReserva] = useState({});
    const getReserva = async () => {
        const response = await axios.get(`${process.env.API_URL}/reserva/search/${props.num_reserva}`)
        setReserva(response.data)
        }

    useEffect(() => {
        getReserva()
        localStorage.setItem('reserva', 0)
    }, [])

    const [values, setValues]= useState({
        costo_extra:''
        })

    const showReserva = () => {
        const arreglo =[reserva.dia , reserva.mes, reserva.year , reserva.hora ,reserva.vecino?.nombre,reserva.vecino?.apellido, reserva.servicio?.nombre,reserva.num_reserva,reserva.costo_base, reserva.costo_extra]
        return(
            arreglo
        );
    };

    const onChange = (e) => {

        setValues({
            ...values,
            [e.target.name]:e.target.value
        })

    }

    const onSubmit = async(e) =>{
        e.preventDefault()

        try {
            const response =await axios.put(`${process.env.API_URL}/reserva/update/${props.num_reserva}`,{costo_extra:values.costo_extra})
            if(response.status===200){
                Swal.fire({
                title:"Reserva Actualizado",
                icon:'success',
                confirmButtonText:'OK'
                }).then(()=>{
                router.push("/Admin/Reservas/reservas_admin")
            })
            }
        } catch (error) {
            Swal.fire({
                title:"No se pudo actualizar la Reserva",
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
        width="100wh"
        height="auto"
        minH={"100vh"}
            backgroundColor="blue.300"
            alignItems = "center">
            

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
                    colorScheme="blue" as="b" 
                    rounded="40" 
                    marginLeft="-60%"
                    onClick={()=>router.push("/Admin/Reservas/reservas_admin")}>
                Volver atrás
            </Button>

      <Drawer placement='left'  onClose={onClose} isOpen={isOpen} >
        <DrawerOverlay />
        <DrawerContent>
            <DrawerHeader  
                backgroundColor="blue.500" 
                color="white" 
                alignItems="center" 
                display="flex"> 
                <AiOutlineMenu size="20"/> 
                &nbsp; Menú
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
                    <AiOutlineClose size="20"/>&nbsp;Cerrar
                </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

            <HStack mt = {30} mb = {30}>
                <BsCalendarEvent color="white" size="50"/>
                <Text fontSize = {50} color = "white" >
                    Reserva
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
                    alignItems = "le"
                >
                    <HStack >
                        <Text as='b' fontSize = {20} color = "blue.500" >
                            Datos de la Reserva
                        </Text>
                    </HStack>
                    <HStack>
                        <Text as='b'>Fecha:</Text>
                        <Text>{showReserva()[0]+"/"+showReserva()[1]+"/"+showReserva()[2]}</Text>
                    </HStack>
                    <HStack>
                        <Text as='b'>Hora:</Text>
                        <Text>{showReserva()[3]}</Text>
                    </HStack>
                    <HStack>
                        <Text as='b'>Vecino:</Text>
                        <Text>{showReserva()[4]+" "+showReserva()[5]}</Text>
                    </HStack>
                    <HStack>
                        <Text as='b'>Servicio:</Text>
                        <Text>{showReserva()[6]}</Text>
                    </HStack>
                    <HStack>
                        <Text as='b'>N° Reserva:</Text>
                        <Text>{showReserva()[7]}</Text>
                    </HStack>

                    <HStack>
                        <Text as='b'>Costo base:</Text>
                        <Text>{"$"+showReserva()[8]}</Text>
                    </HStack>
                    <HStack>
                        <Text as='b'>Costo extra:</Text>
                        <Input type="number" name="costo_extra" width={"24"} onChange={onChange} style={{display: visible ? 'inline' : 'none'}}></Input>
                        <Text style={{display: visible ? 'none' : 'inline'}}>{"$"+showReserva()[9]}</Text>
                        
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
                    <HStack>
                    <Button
                            borderRadius = {20}
                            type = "submit"
                            variant = "solid"
                            colorScheme = "blue"
                            width = "full"
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
                            width="full"
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
        </Flex>
    )


}


export default EditarReserva