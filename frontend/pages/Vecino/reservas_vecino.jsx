import { useState, useEffect , React} from "react";
import { useDisclosure,DrawerOverlay,DrawerContent,DrawerHeader,DrawerBody,DrawerFooter,Drawer,Flex,TableContainer, Text, Box, Stack, Table, Thead,Tr,Td,Tbody, Button,VStack,HStack, Input} from "@chakra-ui/react";
import { useRouter } from "next/router";
import axios from 'axios'
import Swal from 'sweetalert2'
import { ArrowBackIcon, AddIcon } from "@chakra-ui/icons";
import { BsFillHouseFill,BsFillDoorClosedFill,BsFillCreditCard2BackFill,BsCalendar3,BsFillEnvelopeFill, BsFillFileEarmarkExcelFill,BsMenuApp } from "react-icons/bs";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

const ReservasVecino = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const router = useRouter();
    const {
        query: { codigo },
    } = router;

    const props = {
        codigo,
    };

    const [reservas, setReservas] = useState([]);

    const setCookieFunction = (value) => {
        localStorage.setItem('codigo', value)
    }

    const getReservas = async () => {
        try {
            if(codigo){
                setCookieFunction(codigo)
                    const response = await axios.get(`${process.env.API_URL}/vecino/reservas/${props.codigo}`)
                    setReservas(response.data);
            }else{
                    const response = await axios.get(`${process.env.API_URL}/vecino/reservas/${localStorage.getItem('codigo')}`)
                    setReservas(response.data);
            }
        } catch (error) {
            Swal.fire({
                text:'Vecino no tiene historial de reservas',
                icon:'warning',
                showCancelButton: true,
                showConfirmButton: true,
                cancelButtonText: 'Volver atras',
                confirmButtonText:'Crear reserva',
                reverseButtons: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33'
            }).then((result)=>{
                if(result.isDismissed){
                    router.push({pathname:'/Vecino/inicio_vecino', query:{codigo: codigo},});
                }
                if(result.isConfirmed){
                    router.push({pathname:'/Vecino/agregar_reserva', query:{codigo: codigo},});
                }
            })
        }
    };

    const deleteReserva = async (x) => {
        Swal.fire({
            title:'¿Estas seguro de eliminar esta reserva?',
            text:'No se podra deshacer esta acción',
            icon:'warning',
            showCancelButton:true,
            confirmButtonColor:'#8DDE7C',
            cancelButtonColor:'#F24343',
            reverseButtons: true,
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
    }, [])

    //AGREGAR CONDICION DEL SHOWBUTTON PARA COMPARAR FECHAS
    const showreservas = () => {
        const validateDate = (y, m, d)=>{
            const fecha = new Date();
            const year = fecha.getFullYear();
            const mes = fecha.getMonth()+1;
            const dia = fecha.getDate();
            const year1 = (parseInt(y))
            const mes1 = (parseInt(m))
            const dia1 = (parseInt(d))
            if (year1 >= year){
                if(mes1 >= mes-1 || year1 >= year){
                    if(dia1 >= dia){
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
                    <Td>{"$"+reservas.servicio.costo}</Td>
                    <Td>{reservas.num_reserva}</Td>
                </Tr>
            )
        })
    }

    const cerrarSesion = async (e) => {

        e.preventDefault()
        localStorage.clear();
        router.push("/")
    
    }

    return(
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
                <Button colorScheme='blue' position="absolute" right="0" onClick={cerrarSesion} h="16">
                <BsFillDoorClosedFill size="20"/> &nbsp; Cerrar Sesión
                </Button>
            </Box>

            <Button mt={10} name="atras" leftIcon={<ArrowBackIcon/>} colorScheme="blue" as="b" rounded="40" marginLeft="-60%"
        onClick={()=>router.push("/Vecino/inicio_vecino")}>
        Volver atrás</Button>


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

      <HStack mt={30} mb={30}>
        <BsCalendar3 color="white" size="50"/>
        <Text fontSize={50} color="white" as={"b"} >Reservas de Servicio</Text>
      </HStack>
      <Button
            variant = "solid"
            colorScheme = "blue"
            rounded = "40"
            mb={10}
            rightIcon={<AddIcon/>}
            onClick = {() => router.push("/Vecino/agregar_reserva")}
        >Agregar Reserva
      </Button>
                <TableContainer rounded="16" width={"90%"}>
                <Table variant={"simple"} colorScheme="blue" backgroundColor="whiteAlpha.900">
                    <Thead>
                    <Tr >
						<Td bgColor={"blue.500"} color={"white"}>Fecha</Td>
						<Td bgColor={"blue.500"} color={"white"}>Hora</Td>
						<Td bgColor={"blue.500"} color={"white"}>Servicio</Td>
                        <Td bgColor={"blue.500"} color={"white"}>Costo</Td>
						<Td bgColor={"blue.500"} color={"white"}>N° de reserva</Td>
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

export default ReservasVecino;