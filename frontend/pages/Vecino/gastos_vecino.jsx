import { useState, useEffect } from "react";
import { useDisclosure,HStack,DrawerOverlay,DrawerContent,DrawerHeader,DrawerBody,DrawerFooter,Drawer,Flex, Text, Box,Table, Thead,Tr,Td,Tbody, Button,TableContainer} from "@chakra-ui/react";
import { useRouter } from "next/router";
import axios from 'axios'
import Swal from 'sweetalert2'
import { BsFillHouseFill,BsFillDoorClosedFill, BsFillCreditCard2BackFill,BsCalendar3,BsFillEnvelopeFill, BsFillFileEarmarkExcelFill } from "react-icons/bs";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { ArrowBackIcon } from "@chakra-ui/icons";


const GastosVecino= () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const router = useRouter();
    const {
        query: { codigo },
    } = router;

    const props = {
        codigo,
    };

    const [cobros, setCobros] = useState([]);

    const setCookieFunction = (value) => {
        localStorage.setItem('codigo', value)
    }

    const getCobros = async () => {
        if(codigo){
            setCookieFunction(codigo)
            try {
                const response = await axios.get(`${process.env.API_URL}/vecino/cobros/${props.codigo}`)
                setCobros(response.data);
            } catch (error) {
                Swal.fire({
                    text:'Vecino no tiene historial de gastos',
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
                const response = await axios.get(`${process.env.API_URL}/vecino/cobros/${localStorage.getItem('codigo')}`)
                setCobros(response.data);
            } catch (error) {
                Swal.fire({
                    text:'Vecino no tiene historial de gastos',
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
    getCobros()
}, [])

const cerrarSesion = async (e) => {

    e.preventDefault()
    localStorage.clear();
    router.push("/")

}

const showCobros = () => {return cobros.map(cobros => {
        return (
            <Tr key={cobros._id}>
                <Td>{cobros.mes+"/"+cobros.year}</Td>
                <Td>{"$"+cobros.reserva_total}</Td>
				<Td>{"$"+cobros.multa_total}</Td>
				<Td>{"$"+cobros.costo_total}</Td>
                <Td>{cobros.num_cobro}</Td>
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
                <Button colorScheme='blue' position="absolute" right="0" onClick={cerrarSesion} h="16">
                <BsFillDoorClosedFill size="20"/> &nbsp; Cerrar Sesión
                </Button>
            </Box>

            <Button mt={10} name="atras" leftIcon={<ArrowBackIcon/>} colorScheme="blue" as="b" rounded="40" marginLeft="-60%"
                onClick={()=>router.push("/Vecino/inicio_vecino")}>
                Volver atrás
            </Button>
            
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
                <BsFillCreditCard2BackFill color = "white" size = "50"/>
                <Text 
                    fontSize = {50} 
                    color = "white" 
                    as = {"b"} 
                    mt = {30} 
                    mb = {30}
                >
                    Cobros
                </Text>
            </HStack>
    <TableContainer rounded="16" width={"90%"}>

    
                <Table variant={"simple"} colorScheme="blue" backgroundColor="whiteAlpha.900">
                    <Thead>
                    <Tr>
						<Td bgColor={"blue.500"} color={"white"}>Mes/Año</Td>
						<Td bgColor={"blue.500"} color={"white"}>Servicios</Td>
						<Td bgColor={"blue.500"} color={"white"}>Multas</Td>
						<Td bgColor={"blue.500"} color={"white"}>Total</Td>
						<Td bgColor={"blue.500"} color={"white"}>N° de Boleta</Td>
					</Tr>
                    </Thead>
                    <Tbody>
                    {showCobros()}
				</Tbody>
                </Table>
                </TableContainer>
    </Flex>
);
};

export default GastosVecino;