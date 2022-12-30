import { useState, useEffect } from 'react'
import { Flex, Text, Box, Stack,Button,VStack,HStack, Input, Select, Menu, MenuButton, MenuList,MenuItem  } from "@chakra-ui/react";
import axios from 'axios'
import Swal from 'sweetalert2'
import { useRouter } from "next/router";

const AgregarCobro = () => {

    const today = new Date();
    const month= today.getMonth()+1;
    const year= today.getFullYear();
    const router = useRouter();

    const [values, setValues]= useState({
        multa_total:'',
        reserva_total:'',
        vecino:'',
        mes:month.toString(),
        year:year.toString()
    })

    const onChange = async (e) => {

        if(e.target.name == "vecino"){
            const response = await axios.get(`${process.env.API_URL}/vecino/search/${e.target.value}`)
            setValues({
                ...values,
                [e.target.name]:response.data._id
                })
                console.log(e.target.name,response.data._id);
        }else
        if(e.target.name=="multa_total" || e.target.name=="reserva_total"){
            setValues({
                ...values,
                [e.target.name]:Number(e.target.value)
                })
                console.log(e.target.name,e.target.value);

        }else{
            setValues({
                ...values,
                [e.target.name]:e.target.value
                })
                console.log(e.target.name,e.target.value);
        }

    }
    const [vecinos, setVecinos] = useState([])
    const getVecinos = async () => {
        try {
            const response = await axios.get(`${process.env.API_URL}/vecinos`)
            setVecinos(response.data)
        } catch (error) {

        }

    }

    useEffect(() => {
        getVecinos()
    }, []);

    const showVecinos= () =>{
        return vecinos.map(vecinos =>{
            if(vecinos.estado=='activo')
        return (
            <option name="vecino" value={vecinos.codigo} key={vecinos._id}>{vecinos.nombre} {vecinos.apellido}</option>
        )
    })
    }

    const onSubmit= async(e) =>{
        e.preventDefault()
        console.log(values)
        try {
        const response = await axios.post(`${process.env.API_URL}/cobro/${vecino_select.value}`,values)
        console.log(response)

        if(response.status===201){
            Swal.fire({
            title:"Cobro Realizada",
            icon:'success',
            confirmButtonText:'OK'
            }).then(()=>{
            window.location.reload();
        })
        }
        } catch (error) {
            console.log(error.status)
        Swal.fire({
            title:"No se pudo realizar el Cobro",
            text:'Por favor revise los datos ingresado',
            icon:'warning',
            confirmButtonText:'OK'
})
        }
 }

return (
    <Flex
            flexDirection="column"
            width="100wh"
            height="100vh"
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
                    <MenuItem color="blue.400" as="b"  onClick={() => router.push("/Admin/Reservas/reservas_admin")} >Reservas</MenuItem>
                    <MenuItem color="blue.400" as="b" onClick={() => router.push("/Admin/Gastos/gastos_admin")}>Gastos</MenuItem>
                    <MenuItem color="blue.400" as="b" onClick={() => router.push("/Admin/Mensajes/mensajes_admin")}>Mensajes</MenuItem>
                    <MenuItem color="blue.400" as="b" onClick={() => router.push("/Admin/Multas/multas_admin")}>Multas</MenuItem>
                    <MenuItem color="blue.400" as="b" onClick={() => router.push("/Admin/Mantenciones/mantenciones_admin")}>Manteciones</MenuItem>
                    <MenuItem color="blue.400" as="b" onClick={() => router.push("/Admin/Vecino/vecinos_admin")}>Vecinos</MenuItem>
                </MenuList>
                </Menu>
            </Box>

            <Button mt={10} name="atras" colorScheme="blue" as="b" rounded="40" style={{
            position: "fixed",
            top: "20px",
            left: "200px",
            zIndex: 1,
            }}
            onClick={()=>router.push("/Admin/Gastos/gastos_admin")}>
            Volver atrás</Button>

            <Text fontSize={50} color="white" mt={30} mb={30}>Generar Cobro</Text>
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
                <HStack>
                    <VStack spacing={7}>
                        <Text color={"blue.400"} as="b" >Fecha de Cobro:</Text>
                        <Text color={"blue.400"} as="b" >Multa Total</Text>
                        <Text color={"blue.400"} as="b" >Reserva Total</Text>
                        <Text color={"blue.400"} as="b" >Vecino</Text>
                    </VStack>
                    <VStack spacing={3}>
                    <Text width={60}>{month}/{year}</Text>
                    <Input width={60} type={"number"} name={"multa_total"}onChange={onChange}></Input>
                    <Input width={60} type={"number"} name={"reserva_total"}onChange={onChange} ></Input>
                    <Select  id="vecino_select" placeholder='Vecinos' name="vecino" onChange={onChange}>
                    {showVecinos()}
                    </Select>
                    </VStack>
                    </HStack>
                            <Button mb="2"
                            variant="solid"
                            colorScheme="blue"
                            rounded="50"
                            onClick={onSubmit}
                            >
                    Agregar</Button>
                </Stack>
            </form>
        </Box>

            </Flex>
)
}

export default AgregarCobro