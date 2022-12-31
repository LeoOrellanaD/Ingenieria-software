import { useState, useEffect } from "react";
import { useDisclosure,Flex, Text, Box, Table, Thead,Tr,Td,Tbody, Button,TableContainer,Drawer,DrawerFooter, DrawerOverlay,DrawerContent,DrawerHeader,DrawerBody} from "@chakra-ui/react";
import axios from 'axios'
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'
import { ArrowBackIcon, DeleteIcon, Search2Icon, AddIcon, EditIcon  } from "@chakra-ui/icons";


const VecinosAdmin= () => {

    const router = useRouter()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [vecinos, setVecinos] = useState([])
    const [reservas, setReservas] = useState([])

    const today = new Date();
    const meis = today.getMonth()+1

    const [fecha,setFecha] = useState({

        dia:today.getDate().toString(),
        mes:meis.toString(),
        anio:today.getFullYear().toString(),
    })

    const getVecinos = async () => {
    const response = await axios.get(`${process.env.API_URL}/vecinos`)
    setVecinos(response.data)
    }
    

    const deleteVecino = async (x) => {

    Swal.fire({
        title:'¿Estas seguro de eliminar a este vecino?',
        text:'No se podra deshacer esta acción',
        icon:'warning',
        showCancelButton:true,
        confirmButtonColor:'#8DDE7C',
        cancelButtonColor:'#F24343',
        confirmButtonText: 'Aceptar',
        cancelButtonText:'Cancelar'
    }).then(async (result)=>{
        if(result.value){
            
        const response = await axios.get(`${process.env.API_URL}/vecino/reservas/${x}`)
        const reservas = response.data
        console.log(response.data)
      
        // Iterar sobre las reservas y eliminar las que aún no han pasado
        for (const reserva of reservas) {
          const { dia, mes, year ,num_reserva } = reserva
          console.log(dia)
          console.log(mes)
          console.log(year)
          console.log(fecha.dia)
          console.log(fecha.mes)
          console.log(fecha.anio)
          if (year > fecha.anio || (year == fecha.anio && mes > fecha.mes) || (year == fecha.anio && mes == fecha.mes && dia > fecha.dia)) {
            // Eliminar la reserva
            await axios.delete(`${process.env.API_URL}/reserva/delete/${num_reserva}`)
            console.log("se elimino una reserva")
          }
        }
        // Eliminar al vecino
        const response1 = await axios.put(`${process.env.API_URL}/vecino/update/estado/${x}`)
        setVecinos(response1.data)
        window.location.reload();
        }


    })
}


    useEffect(() => {
        getVecinos()
    }, [])

    const showVecinos = () =>{
        return vecinos.map(vecinos =>{
            if(vecinos.estado=='activo')
            return (
                <Tr key={vecinos._id}>
                <Td>{vecinos.nombre}</Td>
                <Td>{vecinos.apellido}</Td>
                <Td>{vecinos.rut}</Td>
                <Td>{vecinos.vivienda}</Td>
                <Td>{vecinos.horas}</Td>
                <Td>{vecinos.permiso}</Td>
                <Td>{   <Button
                        id={vecinos.codigo}
                        variant="solid"
                        colorScheme="blue"
                        rounded="50"
                        width={"full"}
                        rightIcon={<EditIcon /> }
                        onClick={()=> router.push({pathname:'/Admin/Vecino/editar_vecino',
                    query:{codigo:vecinos.codigo}})}
                        >Editar</Button>}</Td>
                <Td>{   <Button
                        id={vecinos.codigo}
                        variant="solid"
                        colorScheme="blue"
                        rounded="50"
                        width={"80%"}
                        rightIcon={<DeleteIcon/>}
                        onClick={()=>deleteVecino(vecinos.codigo)}
                        >Eliminar</Button>}</Td>
                </Tr>
            )
        })
    }

    const cerrarSesion = async (e) => {

        e.preventDefault()
        localStorage.clear();
        router.push("/")
    
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
        Menu
       </Button>
       <Button colorScheme='blue'  marginLeft="80%" onClick={cerrarSesion} h="16">
        Cerrar Sesión
       </Button>
       </Box>

        <Button mt={10} name="atras" leftIcon={<ArrowBackIcon/>} colorScheme="blue" as="b" rounded="40" marginLeft="-60%"
        onClick={()=>router.push("/Admin/inicio_admin")}>
        Volver atrás</Button>

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

        <Text fontSize={50} color="white" as={"b"} mt={30} mb={30}>Vecinos</Text>
        <Button mb="2"
                variant="solid"
                colorScheme="blue"
                rounded="50"
                rightIcon={<AddIcon/>}
                onClick = {() => router.push("agregar_vecino")}>
                    Agregar Vecino</Button>
                    <TableContainer mt={30} rounded="16" width={"90%"}>
                    <Table variant={"simple"} colorScheme="blue" backgroundColor="whiteAlpha.900">
                        <Thead>
                        <Tr>
                            <Td bgColor={"blue.500"} color={"white"}>Nombre</Td>
                            <Td bgColor={"blue.500"} color={"white"}>Apellido</Td>
                            <Td bgColor={"blue.500"} color={"white"}>Rut</Td>
                            <Td bgColor={"blue.500"} color={"white"}>Vivienda</Td>
                            <Td bgColor={"blue.500"} color={"white"}>Horas</Td>
                            <Td bgColor={"blue.500"} color={"white"}>Permiso</Td>
                            <Td bgColor={"blue.500"} color={"white"}>Opciones</Td>
                            <Td bgColor={"blue.500"} color={"white"}></Td>
                        </Tr>
                        </Thead>
                        <Tbody>
                        {showVecinos()}
                    </Tbody>
                    </Table>
                    </TableContainer>
        </Flex>
    );
};

export default VecinosAdmin;