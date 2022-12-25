import { useState, useEffect } from 'react'
import { Flex, Text, Box, Stack,Button,VStack,HStack, Input, Select, Menu, MenuButton, MenuList,MenuItem  } from "@chakra-ui/react";
import axios from 'axios'
import Swal from 'sweetalert2'
import { useRouter } from "next/router";


const AgregarMulta = () => {


    const today = new Date();
    const day = today.getDate();
    const month= today.getMonth();
    const year= today.getFullYear();
    const router = useRouter();

    const [values, setValues]= useState({
        valor:'',
        tipo:'',
        dia:day.toString(),
        mes:month.toString(),
        year:year.toString(),
        vecino:''
      })

  const onChange =  async(e) => {

    if(e.target.name == "vecino"){
      const response = await axios.get(`${process.env.API_URL}/vecino/search/${e.target.value}`)
      setValues({
          ...values,
          [e.target.name]:response.data._id
          })
          console.log(e.target.name,response.data._id);
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
    if(vecinos.estado=='activo')
    return (
      <option name="vecino" key={vecinos._id} value={vecinos.codigo}>{vecinos.nombre} {vecinos.apellido}</option>

    )
})
}

const onSubmit= async(e) =>{
  e.preventDefault()
  console.log(values)

  try {

    const response = await axios.post(`${process.env.API_URL}/multa/${vecino_select.value}`,values)
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
                    <Select  id="vecino_select" placeholder='Vecinos' name="vecino" onChange={onChange}>
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
