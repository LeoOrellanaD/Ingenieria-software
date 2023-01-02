import { useState, useEffect } from 'react'
import {useDisclosure, Flex, Text, Box, Stack,HStack, Button, Input, Select,  Drawer,DrawerFooter, DrawerOverlay,DrawerContent,DrawerHeader,DrawerBody} from "@chakra-ui/react";
import axios from 'axios'
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'
import { ArrowBackIcon} from "@chakra-ui/icons";
import { BsFillHouseFill,BsFillPersonPlusFill,BsFillDoorClosedFill,BsWrench,BsFillPeopleFill, BsFillCreditCard2BackFill,BsCalendar3,BsFillEnvelopeFill, BsFillFileEarmarkExcelFill,BsMenuApp,BsFillCalendar2PlusFill } from "react-icons/bs";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

const AgregarVecino = () => {
  
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [values, setValues] = useState({
    nombre:'',
    apellido:'',
    rut:'',
    vivienda:'',
    horas:'',
    permiso:'',
    codigo:''
  })

  useEffect(() => {
    localStorage.setItem('reserva', 0)
}, [])

  const onChange = (e) => {

    if(e.target.name=="vivienda" || e.target.name=="horas"){
      if(e.target.value.length>2){
        e.target.value=e.target.value.substring(0,2);
      }
    }
    if(e.target.name=="codigo"){
      if(e.target.value.length>4){
        e.target.value=e.target.value.substring(0,4);
      }
    }

    setValues({
      ...values,
      [e.target.name]:e.target.value
    })

}

const onSubmit= async(e) =>{
  e.preventDefault()

  try {
    console.log(values)
    const response = await axios.post(`${process.env.API_URL}/vecino`,values)

    if(response.status===201){
      Swal.fire({
        title:"Vecino Agregado",
        icon:'success',
        confirmButtonText:'OK'
      }).then(()=>{
        window.location.reload();
    })
    }
  } catch (error) {
    Swal.fire({
      title:"No se pudo agregar el vecino",
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
                <AiOutlineMenu size="20"/> &nbsp;  Menu
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
                    onClick={()=>router.push("/Admin/Vecino/vecinos_admin")}>
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
                &nbsp; Menu
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
              <BsFillPersonPlusFill color='white' size="50"/>
              <Text fontSize={50} color="white" >Agregar Vecino</Text>
              </HStack>
              
              <Box  minW={{ base: "10%", md: "468px"}} >
           
                <Stack spacing={4}
                        p="1rem"
                        backgroundColor="whiteAlpha.900"
                        boxShadow="md"
                        rounded="16"
                        mb="2"
                        width={"full"}>
                          <HStack>
                          <Text color={"blue.400"} as="b">Nombre:</Text>
                          <Input width={"full"} placeholder={"Ejemplo: Agustín"} type={"text"} maxLength={20} name={"nombre"} onChange={onChange} ></Input>
                          </HStack>
                      <HStack>
                      <Text color={"blue.400"} as="b">Apellido:</Text>
                      <Input width={"full"} placeholder={"Ejemplo: Pereira"} type={"text"} maxLength={20} name={"apellido"} onChange={onChange}></Input>
                      </HStack>
                      <HStack>
                      <Text color={"blue.400"} as="b"  >Rut:</Text>
                      <Input width={"full"} placeholder={"XX.XXX.XXX-X"} type={"text"} maxLength={12} name={"rut"} onChange={onChange}></Input>
                      </HStack>
                      <HStack>
                      <Text color={"blue.400"} as="b" >Vivienda:</Text>
                      <Input width={"full"} placeholder={"Ejemplo: 20"} type={"number"} maxLength={2} name={"vivienda"} onChange={onChange}></Input>
                      </HStack>
                      <HStack>
                      <Text color={"blue.400"} as="b"  >Horas:</Text>
                      <Input width={"full"} placeholder={"[15-20]"} type={"number"} maxLength={2} name={"horas"} onChange={onChange}></Input>
                      </HStack>
                      <HStack>
                      <Text color={"blue.400"} as="b" >Permiso:</Text>
                      <Select width={"full"} placeholder='Permiso'  name="permiso" onChange={onChange}>
                        <option color={"blue.400"} as="b" >Habilitado</option>
                        <option color={"blue.400"} as="b" >Inhabilitado</option>
                      </Select>
                      </HStack>
                      <HStack>
                      <Text color={"blue.400"} as="b" >Codigo:</Text>
                      <Input width={"full"} placeholder={"[2001-3000]"} type={"number"} maxLength={4} name={"codigo"} onChange={onChange}></Input>
                      </HStack>
                          <Button mb="2"
                            variant="solid"
                            colorScheme="blue"
                            rounded="50"
                            onClick={onSubmit}
                            >
                          Agregar</Button>
                </Stack>
        </Box>

            </Flex>
  )
}

export default AgregarVecino
