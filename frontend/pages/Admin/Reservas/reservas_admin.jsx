import { useState, useEffect} from "react";
import { useDisclosure ,Flex, Text, Box, Stack, Table, Thead,Tr,Td,Tbody, Button,VStack,HStack, Input, TableContainer,Drawer,DrawerFooter, DrawerOverlay,DrawerContent,DrawerHeader,DrawerBody} from "@chakra-ui/react";
import axios from 'axios'
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'
import { ArrowBackIcon, DeleteIcon, Search2Icon, AddIcon,EditIcon } from "@chakra-ui/icons";
import { BsFillHouseFill,BsFillDoorClosedFill,BsWrench,BsFillPeopleFill, BsFillCreditCard2BackFill,BsCalendar3,BsFillEnvelopeFill, BsFillFileEarmarkExcelFill,BsMenuApp } from "react-icons/bs";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";




const ReservasAdmin= () => {

    const router = useRouter()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [reservas, setReservas] = useState([])
    const getReservas = async () => {
        if(localStorage.getItem('reserva')==0){
            try {
                const response = await axios.get(`${process.env.API_URL}/reservas`)
                setReservas(response.data)
            } catch (error) {
                Swal.fire({
                    text:'No existe registro de reservas',
                    icon:'warning',
                    showCancelButton: true,
                    showConfirmButton: true,
                    cancelButtonText: 'Volver atras',
                    confirmButtonText:'Crear reserva',
                    reverseButtons: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33'
                }).then((result) =>{
                    if(result.isDismissed){
                        router.push("/Admin/inicio_admin")
                    }
                    if(result.isConfirmed){
                        router.push("/Admin/Reservas/agregar_reserva")
                    }
                })
            }
        }else
        if(localStorage.getItem('reserva')==1){
            try {
                const response = await axios.get(`${process.env.API_URL}/reserva/search/${values.mes}/${values.year}`)
                setReservas(response.data)
                if(response.data.length == 0){
                    Swal.fire({
                        title:"No se encotraron reservas",
                        text:'Por favor intente otra fecha',
                        icon:'warning',
                        confirmButtonText:'OK'
                    })
                }
            } catch (error) {
                
            }
        }else
        if(localStorage.getItem('reserva')==2){
            try {
                const response = await axios.get(`${process.env.API_URL}/reserva/search/${values.dia}/${values.mes}/${values.year}`)
            setReservas(response.data)
            if(response.data.length == 0){
                Swal.fire({
                    title:"No se encotraron reservas",
                    text:'Por favor intente otra fecha',
                    icon:'warning',
                    confirmButtonText:'OK'
                })
            }
            } catch (error) {
            }
        }
    }

    const [values, setValues]= useState({
        dia:'',
        mes:'',
        year:''
    })





    const deleteReserva = async (x) => {
        Swal.fire({
            title:'¿Estas seguro de eliminar esta reserva?',
            text:'No se podra deshacer esta acción',
            icon:'warning',
            showCancelButton:true,
            confirmButtonColor:'#8DDE7C',
            cancelButtonColor:'#F24343',
            confirmButtonText: 'Aceptar',
            cancelButtonText:'Cancelar'
        }).then((result)=>{
            if(result.value){
                const response =axios.delete(`${process.env.API_URL}/reserva/delete/${x}`)
                setReservas(response.data)
                window.location.reload();
            }
        })

}

useEffect(() => {
    getReservas()
    document.title = "Lavanderia 60 minutos";
}, [])

const onChange = async (e) => {

    setValues({
        ...values,
        [e.target.name]:e.target.value
        })
}

const onSubmit = async(e) => {
    e.preventDefault()
    if(values.dia=='' && values.mes=="" && values.year==""){
        localStorage.setItem('reserva',0)
        getReservas()
    }else
    if(values.mes=="" || values.year==""){
        Swal.fire({
            title:'Los campos mes y año son obligatarios',
            text:'Por favor relleno los campos',
            icon:'warning',
            confirmButtonColor:'#8DDE7C',
            confirmButtonText: 'Aceptar',
        })
    }else
    if(values.dia==''){
        localStorage.setItem('reserva', 1)
        getReservas()
    }else{
        localStorage.setItem('reserva',2)
        getReservas()
    }
}

const cerrarSesion = async (e) => {

    e.preventDefault()
    localStorage.clear();
    router.push("/")

}


const showreservas = () => {
    const validateDate =(y,m,d)=>{
        const fecha = new Date();
        const year = fecha.getFullYear();
        const mes= fecha.getMonth()+1;
        const dia = fecha.getDate();
        const year1 = (parseInt(y))
        const mes1= (parseInt(m))
        const dia1= (parseInt(d))
        if (year1>=year){
            if(mes1>=mes-1 || year1>=year){
                if(dia1>=dia){
                    return true;
                }
            }
        }
    return false;
}



	return reservas.map(reservas => {
		return (
            <Tr key = {reservas._id}>
                <Td>{reservas.dia+"/"+reservas.mes+"/"+reservas.year}</Td>
				<Td>{reservas.hora}</Td>
				<Td>{reservas.servicio.nombre}</Td>
                <Td>{reservas.vecino.nombre+" "+reservas.vecino.apellido}</Td>
				<Td>{reservas.num_reserva}</Td>
                <Td>
                        {validateDate(reservas.year,reservas.mes,reservas.dia) ? (<Button
                id={reservas.num_reserva}
                    variant="solid"
                    colorScheme="blue"
                    rounded="50"
                    rightIcon={<EditIcon /> }
                    onClick={()=> router.push({pathname:"/Admin/Reservas/editar_reserva",
                    query:{num_reserva:reservas.num_reserva}})}
                    >Editar</Button>) :  <Button
                    id={reservas.num_reserva}
                        variant="solid"
                        colorScheme="blue"
                        rounded="50"
                        disabled
                        rightIcon={<EditIcon /> }
                        >Editar</Button>
                        }
                    </Td>
                    <Td>
                        {validateDate(reservas.year,reservas.mes,reservas.dia) ? (<Button
                id={reservas.num_reserva}
                    variant="solid"
                    colorScheme="blue"
                    rounded="50"
                    rightIcon={<DeleteIcon /> }
                    onClick={()=> deleteReserva(reservas.num_reserva)}
                    >Eliminar</Button>) :  <Button
                    id={reservas.num_reserva}
                        variant="solid"
                        colorScheme="blue"
                        rounded="50"
                        disabled
                        rightIcon={<DeleteIcon /> }
                        >Eliminar</Button>
                        }
                    </Td>
            </Tr>
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
                    onClick={()=>router.push("/Admin/inicio_admin")}>
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
      <HStack mt={30} mb={30}>
        <BsCalendar3 color="white" size="50"/>
        <Text fontSize={50} color="white"  fontFamily="inherit" >Reservas de Servicio</Text>
      </HStack>
      
      <Button
            variant = "solid"
            colorScheme = "blue"
            rounded = "40"
            mb={10}
            rightIcon={<AddIcon/>}
            onClick = {() => router.push("/Admin/Reservas/agregar_reserva")}
        >Agregar Reserva
      </Button>
    <Stack mb={30}>
    <Box  minW={{ base: "10%", md: "468px"}}>
        
            <Stack spacing={4}
                p="1rem"
                backgroundColor="whiteAlpha.900"
                boxShadow="md"
                rounded="16"
                flexDir="column"
                mb="2"
                justifyContent="center"
                alignItems="center">

                <Stack direction={['column', 'row']}>
                <VStack>
                <Text color={"blue.400"} as="b">Día</Text>
                <Input placeholder="Ejemplo: 20" onChange={onChange} name="dia" ></Input>
                </VStack>
                <VStack>
                <Text color={"blue.400"} as="b">Mes *</Text>
                <Input placeholder="Ejemplo: 02" onChange={onChange} name="mes" ></Input>
                </VStack>
                <VStack>
                <Text color={"blue.400"} as="b">Año *</Text>
                <Input placeholder="Ejemplo: 2022" onChange={onChange} name="year" ></Input>
                </VStack>
            </Stack>
            <Button
                        variant = "solid"
                        colorScheme = "blue"
                        width = "30%"
                        rounded = "40"
                        mt={10}
                        rightIcon={<Search2Icon /> }
                        onClick={onSubmit}
                        >Buscar
            </Button>
                <Text color={"blue.400"} as="b">* Campos obligatorios</Text>
            </Stack>
            
        
        </Box>
    </Stack>
                <TableContainer rounded="16" width={"90%"}>
                <Table variant={"simple"} colorScheme="blue" backgroundColor="whiteAlpha.900">
                    <Thead>
                    <Tr >
						<Td bgColor={"blue.500"} color={"white"}>Fecha</Td>
						<Td bgColor={"blue.500"} color={"white"}>Hora</Td>
						<Td bgColor={"blue.500"} color={"white"}>Servicio</Td>
                        <Td bgColor={"blue.500"} color={"white"}>Vecino</Td>
						<Td bgColor={"blue.500"} color={"white"}>N° de reserva</Td>
						<Td bgColor={"blue.500"} color={"white"}>Opciones</Td>
                        <Td bgColor={"blue.500"} color={"white"}></Td>
					</Tr>
                    </Thead>
                    <Tbody>
                    {showreservas()}
				</Tbody>
                </Table>
                </TableContainer>

</Flex>
);
};

export default ReservasAdmin;