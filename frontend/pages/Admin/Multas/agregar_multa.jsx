import { useState, useEffect } from 'react'
import { useDisclosure,DrawerOverlay,DrawerContent,DrawerHeader,DrawerBody,DrawerFooter,Drawer,Flex, Text, Box, Stack,Button,VStack,HStack, Input, Select, Menu, MenuButton, MenuList,MenuItem, InputGroup, InputLeftElement  } from "@chakra-ui/react";
import axios from 'axios'
import Swal from 'sweetalert2'
import { useRouter } from "next/router";
import { ArrowBackIcon, DeleteIcon, Search2Icon, AddIcon } from "@chakra-ui/icons";
import { BsFillHouseFill,BsFillPersonFill,BsFillDoorClosedFill,BsWrench,BsFillPeopleFill, BsFillCreditCard2BackFill,BsCalendar3,BsFillEnvelopeFill, BsFillFileEarmarkExcelFill } from "react-icons/bs";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

const AgregarMulta = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
    const today = new Date();
    const day = today.getDate();
    const month= today.getMonth()+1;
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
  }else{

    setValues({
      ...values,
      [e.target.name]:e.target.value
    })
  }

  if(e.target.name== "valor")
  {
    if(e.target.value.length>5){
      e.target.value=e.target.value.substring(0,4);
    }
  }  
}


const [vecinos, setVecinos] = useState([])
    const getVecinos = async () => {
    const response = await axios.get(`${process.env.API_URL}/vecinos`)
    setVecinos(response.data)
    }

useEffect(() => {
  getVecinos()
  localStorage.setItem('reserva', 0)
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

  try {

    const response = await axios.post(`${process.env.API_URL}/multa/${vecino_select.value}`,values)

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

const cerrarSesion = async (e) => {

  e.preventDefault()
  localStorage.clear();
  router.push("/")

}

return (
    <Flex
            flexDirection="column"
            width="100wh"
            height="100vh"
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

            <Button mt={10} 
                    name="atras" 
                    leftIcon={<ArrowBackIcon/>} 
                    colorScheme="blue" as="b" 
                    rounded="40" 
                    marginLeft="-60%"
                    onClick={()=>router.push("/Admin/Multas/multas_admin")}>
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
        <BsFillFileEarmarkExcelFill color="white" size="50"/>
        <Text fontSize={50} color="white" as={"b"}>Multas</Text>
      </HStack>

      <Box  minW={{ base: "10%", md: "468px"}} >
        <Stack spacing={4}
                p="1rem"
                backgroundColor="whiteAlpha.900"
                boxShadow="md"
                rounded="16"
                flexDir="column"
                mb="2"
                justifyContent="left"
                alignItems="left">
            <HStack mt={6}>
                  <Text color={"blue.400"} as="b" >Fecha</Text>
                  <Text width={"full"}>{day}/{month}/{year}</Text>
            </HStack>
            <HStack>
                  <Text color={"blue.400"} as="b" >Vecino</Text>
                  <Select  id="vecino_select" placeholder='Vecinos' name="vecino" onChange={onChange}>
                    {showVecinos()}
                  </Select>
            </HStack>
            <HStack>
                <Text color={"blue.400"} as="b" >Tipo</Text>
                <Select placeholder='Tipo de Multa'  name="tipo" onChange={onChange}>
                    <option color={"blue.400"} as="b" >sancion leve</option>
                    <option color={"blue.400"} as="b" >sancion media</option>
                    <option color={"blue.400"} as="b" >sancion alta</option>
                    <option color={"blue.400"} as="b" >por cancelacion</option>
                </Select>
            </HStack>
            <HStack>
                <Text color={"blue.400"} as="b">Valor</Text>
                <InputGroup>
                  <InputLeftElement
                      pointerEvents='none'
                      fontSize='1.2em'
                      children='$'
                    />
                  <Input width={60} placeholder={"min: 1000"} type={"text"} name={"valor"}onChange={onChange} ></Input>
                </InputGroup>
            </HStack>
                  <Button mb="2"
                          variant="solid"
                          colorScheme="blue"
                          rounded="50"
                          onClick={onSubmit}
                            >
                        Agregar
                  </Button>
          </Stack>
        </Box>

    </Flex>
  )
}
export default AgregarMulta
