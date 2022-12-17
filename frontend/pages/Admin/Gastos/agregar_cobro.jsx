import { useState, useEffect } from 'react'
import { Flex, Text, Box, Stack,Button,VStack,HStack, Input, Select } from "@chakra-ui/react";
import axios from 'axios'
import Swal from 'sweetalert2'

const AgregarCobro = () => {

    const today = new Date();
    const month= today.getMonth()+1;
    const year= today.getFullYear();

    const [values, setValues]= useState({
        multa_total:'',
        reserva_total:'',
        vecino:'',
        mes:month.toString(),
        year:year.toString()
    })

    const onChange = (e) => {
        
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
    const response = await axios.get(`${process.env.API_URL}/vecinos`)
    setVecinos(response.data)
    }

    useEffect(() => {
        getVecinos()
    }, []);

    const showVecinos= () =>{
        return vecinos.map(vecinos =>{
        return (
            <option name="vecino" key={vecinos._id} value={vecinos._id}>{vecinos.nombre} {vecinos.apellido}</option>
        )
    })
    }

    const onSubmit= async(e) =>{
        e.preventDefault()
        console.log(values)
        try {
        const response = await axios.post(`${process.env.API_URL}/cobro`,values)
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
            backgroundColor="blue.400"
            alignItems="center"
            >
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
                    <Select placeholder='Vecinos' name="vecino" onChange={onChange}>
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