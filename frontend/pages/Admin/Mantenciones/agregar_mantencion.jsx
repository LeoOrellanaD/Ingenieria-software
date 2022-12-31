import { useEffect, useRef, useState } from 'react'
import { useDisclosure, Flex, Text, Box, Stack,Button,VStack,HStack, Input, Select, Textarea,Drawer,DrawerFooter, DrawerOverlay,DrawerContent,DrawerHeader,DrawerBody, InputGroup, InputLeftElement   } from "@chakra-ui/react";
import Swal from 'sweetalert2'
import axios from 'axios'
import { useRouter } from "next/router";
import { ArrowBackIcon, DeleteIcon, Search2Icon, AddIcon } from "@chakra-ui/icons";

const agregarMantencion = () => {

    const [fecha , setFecha] = useState(
        {
            dia: '',
            mes: '',
            year:''
        }
    )
    const today = new Date();
    const day = today.getDate();
    const month= today.getMonth()+1;
    const year= today.getFullYear();
    const router = useRouter();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const[semana, setSemana] = useState('null')
    const[findesemana, setFindesemana] = useState('null')
    const [veci,setVeci]=useState([]);


    const [administrador, setAdmin] = useState([])

    const getAdmin = async()=>{
    const response = await axios.get(`${process.env.API_URL}/administrador/search/${localStorage.getItem('codigo')}`)
    setAdmin(response.data);
    setMensaje({...mensaje,administrador: response.data._id})
    console.log(response.data._id)
}
const [vecinos, setVecinos] = useState([])

  const getVecinos = async () => {
    const response = await axios.get(`${process.env.API_URL}/vecinos`)
    console.log(response.data)
    const vecinosIds = response.data.map(vecino => vecino._id)
    console.log(vecinosIds)
     setVecinos(vecinosIds);
     setMensaje({...mensaje, vecino: vecinosIds});

  }

    const [values, setValues]= useState({
        nombre_empresa:'',
        rut_empresa:'',
        giro:'',
        descripcion:'',
        valor:'',
        hora:'',
        dia:'',
        mes:'',
        year:'',
        observaciones:''
      })

      
      const [mensaje,setMensaje]= useState({
        vecino:vecinos,
        administrador:administrador._id,
        dia:day.toString(),
        mes:month.toString(),
        year:year.toString(),
        asunto:'Notificación de Mantención',
        contenido:''
      })


  // open close
    const [open, setOpen] = useState(false)

  // get the target element to toggle
    const refOne = useRef(null)

    useEffect(() => {
      document.getElementById('semana').hidden=true
        document.getElementById('findesemana').hidden=true
        getVecinos()
        getAdmin()
    }, [])

  // hide dropdown on ESC press
    const hideOnEscape = (e) => {
        console.log(e.key)
        if( e.key === "Escape" ) {
            setOpen(false)
        }
    }

  // Hide on outside click
    const hideOnClickOutside = (e) => {
        if( refOne.current && !refOne.current.contains(e.target) ) {
            setOpen(false)
        }
    }

    const CastTime = (e) =>
    {
        const fechaSelecionada = new Date(e.target.value);
        const diaS=fechaSelecionada.getDay()+1

        if(diaS<=5)
        {
            document.getElementById('semana').hidden= false
            document.getElementById('findesemana').hidden= true
        }else
        {
            document.getElementById('semana').hidden= true
            document.getElementById('findesemana').hidden= false
        }
    }

    function castMin()
    {
        const currentDate = new Date();
        const dateString1 = currentDate.toLocaleDateString('es-ES', { day: '2-digit' });
        const dateString2 = currentDate.toLocaleDateString('es-ES', { month: '2-digit' });
        const dateString3 = currentDate.toLocaleDateString('es-ES', { year: 'numeric' });

        const fechaMinima = (dateString3 + '-' + dateString2 + '-' + dateString1)
        return fechaMinima;
    }

    function castMax()
    {
        const currentDate = new Date();
        const dateString1 = currentDate.toLocaleDateString('es-ES', { day: '2-digit' });
        const dateString2 = currentDate.toLocaleDateString('es-ES', { month: '2-digit' });
        const dateString3 = currentDate.toLocaleDateString('es-ES', { year: 'numeric' });
        const dia2='01'
        const mes2='01'
        const mes= (parseInt(dateString2, 10)+1);
        const year2 = (parseInt(dateString3, 10)+1);

        if(dateString2==12)
        {
                const fechaMaxima = (year2 + '-' + mes2 + '-' + dia2)
            return fechaMaxima;
        }else
        {
                const fechaMaxima = (dateString3 + '-' + mes + '-' + dateString1)
            return fechaMaxima;
        }
    }


    const DateSetter = (e) =>
    {
        CastTime(e)
        const string = e.target.value
        const timestamp = Date.parse(string)
        const date2 = new Date(timestamp)

        const a=date2.getDate()+1;
        const b=date2.getMonth()+1;
        const c=date2.getFullYear();
        const dia=  a.toString();
        const mes=  b.toString();
        const year= c.toString();

        setValues({...values,dia,mes,year});
        setMensaje({...mensaje,
        contenido:`Mediante este mensaje se notifica a todos los vecinos que se realizara una mantención el dia ${dia}/${mes}/${year}`})
    }


    const onChange = (e) => {

      
      setValues({
        ...values,
        [e.target.name]:e.target.value
      })
      console.log(e.target.name,e.target.value);

      if(e.target.name=="valor")
      {
        if(e.target.value.length>5){
          e.target.value=e.target.value.substring(0,6);
        }
      }

      setMensaje({...mensaje, vecino: vecinos});
  }

    const onSubmit= async(e) =>{
        e.preventDefault()
        console.log(values)
        try {
          const response = await axios.post(`${process.env.API_URL}/mantencion`,values)
          console.log(response)
      
          if(response.status===201){
            Swal.fire({
              title:"Mantención Registrada",
              icon:'success',
              confirmButtonText:'OK'
            }).then(async ()=>{
              try {
                console.log(vecinos)
                console.log(mensaje)
                  const response1 = await axios.post(`${process.env.API_URL}/mensaje`,mensaje)
                  console.log(response1.status)
                  Swal.fire({
                    title:"Mensajes Enviado",
                    icon:'success',
                    confirmButtonText:'OK'
                  })
              } catch (error) {
                
              }
          })
          }
        } catch (error) {
            console.log(error.status)
          Swal.fire({
            title:"No se pudo agendar la Mantención",
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
            <Button width={"100%"} colorScheme="blue" mb="2" height="20" fontSize="20" onClick={() => router.push("/Admin/inicio_admin")}>Inicio</Button>
            <Button width={"100%"} colorScheme="blue" mb="2" height="20" fontSize="20" onClick={() => router.push("/Admin/Reservas/reservas_admin")}>Reservas</Button>
            <Button width={"100%"} colorScheme="blue" mb="2" height="20" fontSize="20" onClick={() => router.push("/Admin/Gastos/gastos_admin")}>Gastos</Button>
            <Button width={"100%"} colorScheme="blue" mb="2" height="20" fontSize="20" onClick={() => router.push("/Admin/Mensajes/mensajes_admin")}>Mensajes</Button>
            <Button width={"100%"} colorScheme="blue" mb="2" height="20" fontSize="20" onClick={() => router.push("/Admin/Multas/multas_admin")}>Multas</Button>
            <Button width={"100%"} colorScheme="blue" mb="2" height="20" fontSize="20" onClick={() => router.push("/Admin/Mantenciones/mantenciones_admin")}>Manteciones</Button>
            <Button width={"100%"} colorScheme="blue" mb="2" height="20" fontSize="20" onClick={() => router.push("/Admin/Vecino/vecinos_admin")}>Vecinos</Button>


        </DrawerBody>
        <DrawerFooter backgroundColor="blue.300">
            <Button mr={3} onClick={onClose} colorScheme="blue">
              Cerrar
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
              <Text fontSize={50} color="white" mt={30} mb={30}>Crear Mantencion</Text>
              <Box  minW={{ base: "20%", md: "250px"}} >
           
                <Stack spacing={4}
                        p="1rem"
                        backgroundColor="whiteAlpha.900"
                        boxShadow="md"
                        rounded="16"
                        mb="2"
                        width={"full"}>
                            <HStack>
                                    <Text position={"left"}  color={"blue.400"} as="b" >Nombre Empresa:</Text>
                                    <Input width={"full"} type={"text"} name={"nombre_empresa"}onChange={onChange} ></Input>
                            </HStack>
                            <HStack>
                                    <Text  color={"blue.400"} as="b" >Rut Empresa:</Text>
                                    <Input width={"full"} type={"text"} name={"rut_empresa"}onChange={onChange} ></Input>
                            </HStack>
                            <HStack>
                                    <Text  color={"blue.400"} as="b" >Giro Empresa:</Text>
                                    <Input width={"full"} type={"text"} name={"giro"}onChange={onChange} ></Input>
                            </HStack>
                            <HStack>
                              <Text color={"blue.400"} as="b" >Descripcion Mantención:</Text>
                              
                                    
                                    <Textarea
                                        placeholder='Escribe la descripción de la mantencion'
                                        width={"full"}
                                        type={"text"}
                                        name={"descripcion"}
                                        minLength={10}
                                        maxLength={200}
                                        onChange={onChange}>
                                    </Textarea>
                            </HStack>
                            <HStack>
                              <Text color={"blue.400"} as="b">Valor</Text>
                                <InputGroup>
                                  <InputLeftElement
                                    pointerEvents='none'
                                    fontSize='1.2em'
                                    children='$'
                                  />
                                <Input width={"full"} type={"text"} name={"valor"}onChange={onChange} ></Input>
                                </InputGroup>
                            </HStack>
                            <HStack>
                                    <Text  color={"blue.400"} as="b" >Fecha:</Text>
                                    <Input width={"full"} type="date" id="start"
                                        date={new Date()}
                                        onChange={DateSetter}
                                        min={castMin()} max={castMax()}></Input>
                            </HStack>
                            <HStack id='semana'>
                                    <Text  color={"blue.400"}  as="b" >Hora:</Text>
                                    <Select width={"full"} placeholder='Hora'  name="hora"   onChange={onChange}>
                                        <option name="7:00" value={"7:00"} >    7:00</option>
                                        <option name="8:00" value={"8:00"} >    8:00</option>
                                        <option name="9:00" value={"9:00"} >    9:00</option>
                                        <option name="10:00" value={"10:00"} > 10:00</option>
                                        <option name="11:00" value={"11:00"} > 11:00</option>
                                        <option name="12:00" value={"12:00"} > 12:00</option>
                                        <option name="13:00" value={"13:00"} > 13:00</option>
                                        <option name="14:00" value={"14:00"} > 14:00</option>
                                        <option name="15:00" value={"15:00"} > 15:00</option>
                                        <option name="16:00" value={"16:00"} > 16:00</option>
                                        <option name="17:00" value={"17:00"} > 17:00</option>
                                        <option name="18:00" value={"18:00"} > 18:00</option>
                                        <option name="19:00" value={"19:00"} > 19:00</option>
                                    </Select>
                            </HStack >

                            <HStack id='findesemana'>
                                    <Text  color={"blue.400"} as="b"  >Hora:</Text>
                                    <Select width={"full"} placeholder='Hora'  name="hora"   onChange={onChange}>
                                        <option name="8:00"  value={"8:00"} >   8:00</option>
                                        <option name="9:00"  value={"9:00"} >   9:00</option>
                                        <option name="10:00" value={"10:00"} > 10:00</option>
                                        <option name="11:00" value={"11:00"} > 11:00</option>
                                        <option name="12:00" value={"12:00"} > 12:00</option>
                                        <option name="13:00" value={"13:00"} > 13:00</option>
                                        <option name="14:00" value={"14:00"} > 14:00</option>
                                        <option name="15:00" value={"15:00"} > 15:00</option>
                                        <option name="16:00" value={"16:00"} > 16:00</option>
                                        <option name="17:00" value={"17:00"} > 17:00</option>
                                        <option name="18:00" value={"18:00"} > 18:00</option>
                                        <option name="19:00" value={"19:00"} > 19:00</option>
                                        <option name="20:00" value={"20:00"} > 20:00</option>
                                        <option name="21:00" value={"21:00"} > 21:00</option>
                                        <option name="22:00" value={"22:00"} > 22:00</option>
                                    </Select>
                            </HStack>

                            <HStack>
                                    <Text  color={"blue.400"} as="b" >Observaciones:</Text>
                                    <Textarea
                                            placeholder='Escribe las observaciones de la mantencion'
                                            width={"full"} type={"text"}
                                            minLength={10}
                                            maxLength={200}
                                            name={"observaciones"}onChange={onChange} >
                                    </Textarea>
                            </HStack>
                                <Button mb="2"
                                    variant="solid"
                                    colorScheme="blue"
                                    rounded="50"
                                    onClick={onSubmit}
                                    >
                                        CREAR
                                </Button>
                </Stack>
        </Box>

            </Flex>



)
}

export default agregarMantencion