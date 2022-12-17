import { useState, useEffect } from 'react'
import { Flex, Text, Box, Stack,Button,VStack,HStack, Input, Select } from "@chakra-ui/react";
import axios from 'axios'
import Swal from 'sweetalert2'


const AgregarMulta = () => {


    const today = new Date();
    const day = today.getDate();
    const month= today.getMonth();
    const year= today.getFullYear();


    const [values, setValues]= useState({
        valor:'',
        tipo:'',
        dia:day.toString(),
        mes:month.toString(),
        year:year.toString(),
        vecino:''
      })

  const onChange = (e) => {
    setValues({
      ...values,
      [e.target.name]:e.target.value
    })
    console.log(e.target.name,e.target.value);
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

    const response = await axios.post(`${process.env.API_URL}/multa`,values)
    console.log(response)

    if(response.status===201){
      Swal.fire({
        title:"Multa Realizada",
        icon:'success',
        confirmButtonText:'OK'
      }).then(()=>{
        window.location.reload();
    })
    }
  } catch (error) {
    Swal.fire({
      title:"No se pudo realizar la Multa",
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
              <Text fontSize={50} color="white" mt={30} mb={30}>Multar Vecino</Text>
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
                    <VStack spacing={6}>
                      <Text color={"blue.400"} as="b" >Fecha</Text>
                      <Text color={"blue.400"} as="b" >Vecino</Text>
                      <Text color={"blue.400"} as="b" >Tipo</Text>
                      <Text color={"blue.400"} as="b" >Valor</Text>
                    </VStack>
                    <VStack>
                    <Text width={60}>{day}/{month}/{year}</Text>
                    <Select placeholder='Vecinos' name="vecino" onChange={onChange}>
                    {showVecinos()}
                      </Select>
                    <Select placeholder='Tipo de Multa'  name="tipo" onChange={onChange}>
                        <option color={"blue.400"} as="b" >sancion leve</option>
                        <option color={"blue.400"} as="b" >sancion media</option>
                        <option color={"blue.400"} as="b" >sancion alta</option>
                        <option color={"blue.400"} as="b" >por cancelacion</option>
                      </Select>
                    <Input width={60} type={"text"} name={"valor"}onChange={onChange} ></Input>
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
export default AgregarMulta
