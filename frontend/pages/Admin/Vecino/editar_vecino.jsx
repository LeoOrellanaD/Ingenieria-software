import { useState, useEffect } from "react";
import { useDisclosure,Text, Box,Flex, Stack, HStack, Button,Input,Select, Drawer,DrawerFooter, DrawerOverlay,DrawerContent,DrawerHeader,DrawerBody} from "@chakra-ui/react";
import { useRouter } from "next/router";
import axios from "axios";
import Swal from 'sweetalert2'
import { ArrowBackIcon, EditIcon } from "@chakra-ui/icons";
import { BsFillHouseFill,BsFillDoorClosedFill,BsWrench,BsFillPeopleFill,BsFillPersonFill, BsFillCreditCard2BackFill,BsCalendar3,BsFillEnvelopeFill, BsFillFileEarmarkExcelFill } from "react-icons/bs";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

const EditarVecino = () => {

    const router = useRouter();
    const {
        query: { codigo },
    } = router;

    const props = {
        codigo,
    };

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [visible, setVisible] = useState(false);
    const [vecino, setVecino] = useState([])
    const getVecino = async () => {
        const response = await axios.get(`${process.env.API_URL}/vecino/search/${props.codigo}`)
        setVecino(response.data)
        }

    useEffect(() => {
        getVecino()
        localStorage.setItem('reserva', 0)
    }, [])

    const showVecino = () => {
        const arreglo = [vecino.nombre, vecino.apellido, vecino.rut, vecino.vivienda, vecino.horas,vecino.permiso]
        return (
            arreglo
        );
    };

    const [values, setValues]= useState({
        horas:'',
        permiso:''
        })

    const onChange = (e) => {

        setValues({
            ...values,
            [e.target.name]:e.target.value
          })

        }

    const onSubmit = async(e) =>{
        e.preventDefault()
        
        try {
            const response =await axios.put(`${process.env.API_URL}/vecino/update/${props.codigo}`,{permiso:values.permiso , horas:values.horas})
           
            if(response.status===200){
                Swal.fire({
                  title:"Vecino Actualizado",
                  icon:'success',
                  confirmButtonText:'OK'
                }).then(()=>{
                  router.push("/Admin/Vecino/vecinos_admin")
              })
              }
        } catch (error) {
            Swal.fire({
                title:"No se pudo actualizar al vecino",
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
            flexDirection = "column"
            width = "100wh"
            height = "130vh"
            backgroundColor="blue.300"
            alignItems = "center"
        >
       <Box backgroundColor="blue.500" w={"100%"} h="16">
            <Button colorScheme='blue' onClick={onOpen} h="16">
                <AiOutlineMenu size="20"/> &nbsp;  Menu
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

            <HStack>
                <BsFillPersonFill color="white" size="50"/>
                <Text as={'b'} fontSize = {50} color = "white" mt = {30} mb = {30}>
                    Vecino
                </Text>
            </HStack>

            <Box minW = {{ base: "10%", md: "50" }} width={600}>
                <Stack
                    spacing = {4}
                    p = "1rem"
                    backgroundColor = "whiteAlpha.900"
                    boxShadow = "md"
                    rounded = "16"
                    flexDir = "column"
                    mb = "10"
                    justifyContent = "center"
                    alignItems = "center"
                >
                    <HStack >
                        <Text as='b' fontSize = {20} color = "blue.500" >
                            Datos del Vecino
                        </Text>
                    </HStack>
                    <HStack>
                        <Text as='b'>Nombre:</Text>
                        <Text>{showVecino()[0]}</Text>
                    </HStack>
                    <HStack>
                        <Text as='b'>Apellido:</Text>
                        <Text>{showVecino()[1]}</Text>
                    </HStack>
                    <HStack>
                        <Text as='b'>Rut:</Text>
                        <Text>{showVecino()[2]}</Text>
                    </HStack>
                    <HStack>
                        <Text as='b'>Vivienda:</Text>
                        <Text>{showVecino()[3]}</Text>
                    </HStack>
                    <HStack>
                        <Text as='b'>*Horas:</Text>
                        <Input  required type="number" name="horas" width={"24"} onChange={onChange} style={{display: visible ? 'inline' : 'none'}}></Input>
                        <Text style={{display: visible ? 'none' : 'inline'}} >{showVecino()[4]}</Text>
                        
                    </HStack>
                    <HStack>
                        <Text as='b'>*Permiso:</Text>
                        <Text style={{display: visible ? 'none' : 'inline'}}>{showVecino()[5]}</Text>
                        <Select required placeholder='Tipo de permiso' name="permiso" onChange={onChange} display={visible ? 'inline' : 'none'}>
                            <option color={"blue.400"} as="b">Habilitado</option>
                            <option color={"blue.400"} as="b">Inhabilitado</option>
                        </Select>
                    </HStack>
                    <Button
                            borderRadius = {20}
                            type = "submit"
                            variant = "solid"
                            colorScheme = "blue"
                            width = "30%"
                            rounded = "50"
                            rightIcon={<EditIcon /> }
                            id="editar"
                            onClick={() => setVisible(true)}
                            style={{display: visible ? 'none' : 'inline'}}
                        >
                        Editar
                    </Button>
                    <HStack>
                    <Button
                            borderRadius = {20}
                            type = "submit"
                            variant = "solid"
                            colorScheme = "blue"
                            width = "full"
                            rounded = "50"
                            rightIcon={<EditIcon /> }
                            id="guardar"
                            onClick={onSubmit}
                            style={{display: visible ? 'inline' : 'none'}}
                            direction="row"
                        >
                        Guardar
                    </Button>
                    <Button
                            borderRadius={20}
                            variant="solid"
                            colorScheme="blue"
                            width="full"
                            rounded="50"
                            id="cancelar"
                            onClick={() => setVisible(false)}
                            style={{display: visible ? 'inline' : 'none'}}
                            direction="row"
                        >
                        Cancelar
                    </Button>
                    </HStack>
                    <Text>*Campos obligatorios</Text>
                </Stack>
            </Box>
        </Flex>
)
}

export default EditarVecino
