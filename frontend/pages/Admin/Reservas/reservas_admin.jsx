import { useState, useEffect } from "react";
import { Flex, Text, Box, Stack, Table, Thead,Tr,Td,Tbody, Button,VStack,HStack, Input, TableContainer, Menu, MenuButton, MenuList,MenuItem} from "@chakra-ui/react";
import axios from 'axios'
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'



const ReservasAdmin= () => {

    const router = useRouter()
    const [reservas, setReservas] = useState([])
    const getReservas = async () => {
        if(localStorage.getItem('reserva')==0){
            try {
                const response = await axios.get(`${process.env.API_URL}/reservas`)
            setReservas(response.data)
            } catch (error) {
            }
        }else
        if(localStorage.getItem('reserva')==1){
            console.log(1)
            try {
                const response = await axios.get(`${process.env.API_URL}/reserva/search/${values.mes}/${values.year}`)
            setReservas(response.data)
            } catch (error) {
            }
        }else
        if(localStorage.getItem('reserva')==2){
            console.log(2)
            try {
                const response = await axios.get(`${process.env.API_URL}/reserva/search/${values.dia}/${values.mes}/${values.year}`)
            setReservas(response.data)
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
    document.title="Lavanderia 60 minutos";
    console.log(localStorage.getItem('reserva'))
}, [])

const onChange = async (e) => {

    setValues({
        ...values,
        [e.target.name]:e.target.value
        })
        console.log(e.target.name,e.target.value);

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
        console.log(localStorage.getItem('reserva'))
        getReservas()
    }else{
        localStorage.setItem('reserva',2)
        console.log(localStorage.getItem('reserva'))
        getReservas()
    }
}


const showreservas = () => {

    const validateDate =(y,m,d)=>{
        const fecha = new Date();
        const year = fecha.getFullYear();
        const mes= fecha.getMonth()+1;
        const dia = fecha.getDate();
        // console.log(fecha)
        // console.log(year)
        // console.log(mes)
        // console.log(dia)
        const year1 = (parseInt(y))
        const mes1= (parseInt(m))
        const dia1= (parseInt(d))
        // console.log(year1)
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
            <Tr key={reservas._id}>
                <Td>{reservas.dia}</Td>
                <Td>{reservas.mes}</Td>
                <Td>{reservas.year}</Td>
				<Td>{reservas.hora}</Td>
				<Td>{reservas.servicio.nombre}</Td>
                <Td>{reservas.vecino.nombre}</Td>
                <Td>{reservas.vecino.apellido}</Td>
				<Td>{reservas.num_reserva}</Td>
                    <Td>
                        {validateDate(reservas.year,reservas.mes,reservas.dia) ? (<Button
                id={reservas.num_reserva}
                    variant="solid"
                    colorScheme="blue"
                    rounded="50"
                    onClick={()=> deleteReserva(reservas.num_reserva)}
                    >Eliminar</Button>) :  <Button
                    id={reservas.num_reserva}
                        variant="solid"
                        colorScheme="blue"
                        rounded="50"
                        disabled
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
    <Box backgroundColor="blue.500" w={"100%"} h="10">
    <Menu>
  <MenuButton  color="white" w="10%" h="10" background={"blue.600"}>
    Menú
  </MenuButton>
  <MenuList >
    <MenuItem color="blue.400" as="b"  onClick={() => router.push("/Admin/inicio_admin")} >Inicio</MenuItem>
    <MenuItem color="blue.400" as="b" onClick={() => router.push("/Admin/Gastos/gastos_admin")}>Gastos</MenuItem>
    <MenuItem color="blue.400" as="b" onClick={() => router.push("/Admin/Mensajes/mensajes_admin")}>Mensajes</MenuItem>
    <MenuItem color="blue.400" as="b" onClick={() => router.push("/Admin/Multas/multas_admin")}>Multas</MenuItem>
    <MenuItem color="blue.400" as="b" onClick={() => router.push("/Admin/Mantenciones/mantenciones_admin")}>Manteciones</MenuItem>
    <MenuItem color="blue.400" as="b" onClick={() => router.push("/Admin/Vecino/vecinos_admin")}>Vecinos</MenuItem>
  </MenuList>
</Menu>
    </Box>
    <Text fontSize={50} color="white" mt={30} mb={30}>Reservas de Servicio</Text>
    <Stack mb={30}>
    <Box  minW={{ base: "10%", md: "468px"}}>
        <form>
            <Stack spacing={4}
                p="1rem"
                backgroundColor="whiteAlpha.900"
                boxShadow="md"
                rounded="16"
                flexDir="column"

        mb="2"
        justifyContent="center"
        alignItems="center">
            <HStack>
                <VStack>
                <Text>Dia</Text>
                <Input placeholder="Ejemplo: 20" onChange={onChange} name="dia" ></Input>
                </VStack>
                <VStack>
                <Text>Mes</Text>
                <Input placeholder="Ejemplo: 02" onChange={onChange} name="mes" ></Input>
                </VStack>
                <VStack>
                <Text>Año</Text>
                <Input placeholder="Ejemplo: 2022" onChange={onChange} name="year" ></Input>
                </VStack>

            </HStack>
            <Button
                        variant = "solid"
                        colorScheme = "blue"
                        width = "30%"
                        rounded = "40"
                        mt={10}
                        onClick={onSubmit}
                        >Buscar
                </Button>
            </Stack>

        </form>
        </Box>
    </Stack>
    <HStack>
        <Box  minW={{ base: "10%", md: "468px"}} >
        <form>
            <Stack spacing={4}
                p="1rem"
                backgroundColor="whiteAlpha.900"
                boxShadow="md"
                rounded="16"
                flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center">
                <Text fontSize={30} color="blue.400" mt={30} mb={30}>Reservas</Text>
                <Button mb="2"
                variant="solid"
                colorScheme="blue"
                rounded="50"
                onClick = {() => router.push("/Admin/Reservas/agregar_reserva")}>
                Agregar Reserva</Button>

                <TableContainer>
                <Table variant={"simple"} colorScheme="blue">
                    <Thead>
                    <Tr >
						<Td bgColor={"blue.500"} color={"white"}>Dia</Td>
						<Td bgColor={"blue.500"} color={"white"}>Mes</Td>
						<Td bgColor={"blue.500"} color={"white"}>Año</Td>
						<Td bgColor={"blue.500"} color={"white"}>Hora</Td>
						<Td bgColor={"blue.500"} color={"white"}>Servicio</Td>
                        <Td bgColor={"blue.500"} color={"white"}>Vecino</Td>
                        <Td bgColor={"blue.500"} color={"white"}>        </Td>
						<Td bgColor={"blue.500"} color={"white"}>N° de reserva</Td>
						<Td bgColor={"blue.500"} color={"white"}>Acciones</Td>
					</Tr>
                    </Thead>
                    <Tbody>
                    {showreservas()}
				</Tbody>
                </Table>
                </TableContainer>

            </Stack>
        </form>
    </Box>
    </HStack>
    </Flex>
);
};

export default ReservasAdmin;