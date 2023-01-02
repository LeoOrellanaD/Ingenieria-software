import { useEffect, useRef, useState } from 'react'
import { useDisclosure,DrawerOverlay,DrawerContent,DrawerHeader,DrawerBody,DrawerFooter,Drawer,Flex,InputGroup, InputLeftElement, Text, Box, Stack,Button,VStack,HStack, Input, Select} from "@chakra-ui/react";
import Swal from 'sweetalert2'
import axios from 'axios'
import { useRouter } from "next/router";
import { ArrowBackIcon, DeleteIcon, Search2Icon, AddIcon } from "@chakra-ui/icons";
import { BsFillHouseFill,BsFillDoorClosedFill, BsFillCalendar2PlusFill,BsFillCreditCard2BackFill,BsCalendar3,BsFillEnvelopeFill, BsFillFileEarmarkExcelFill,BsMenuApp } from "react-icons/bs";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

const AgregarReserva = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const router = useRouter();
    const {
        query: { codigo },
    } = router;

    const props = {
        codigo,
    };
    const setCookieFunction = (codigo) => {
        localStorage.setItem('codigo', codigo)
    }

    const [vecino1, setVecino] = useState([])

    const getVecino = async () => {
        if (codigo) {
          setCookieFunction(codigo);
          const response = await axios.get(
            `${process.env.API_URL}/vecino/search/${props.codigo}`
          );
          setVecino(response.data);
        } else {
          const response = await axios.get(
            `${process.env.API_URL}/vecino/search/${localStorage.getItem("codigo")}`
          );
          setVecino(response.data);
        }
      };

    const [selectedOption, setSelectedOption] = useState('')
    const [valor, setValor] = useState('0')
    const [open, setOpen] = useState(false)
    const refOne = useRef(null)

    const[semana, setSemana] = useState('null')
    const[findesemana, setFindesemana] = useState('null')

    const [values, setValues]= useState({
        dia:'',
        mes:'',
        year:'',
        hora:'',
        servicio:'',
        vecino: getVecino(),
        costo_base:'',
        costo_extra: 0
    })

    useEffect(() => {
        document.getElementById('semana').hidden=true
        document.getElementById('findesemana').hidden=true
        getServicios()
        getVecino()
        document.addEventListener("keydown", hideOnEscape, true)
        document.addEventListener("click", hideOnClickOutside, true)
    }, [])

    const hideOnEscape = (e) => {
        if( e.key === "Escape" ) {
            setOpen(false)
        }
    }
    const hideOnClickOutside = (e) => {
        if( refOne.current && !refOne.current.contains(e.target) ) {
            setOpen(false)
        }
    }

    const onChange = async (e) => {

        if(e.target.name=="servicio"){
            if(e.target.value){
            const response1 = await axios.get(`${process.env.API_URL}/servicio/search/${e.target.value}`)
            setValor(response1.data.costo)
            setValues({
                ...values,
                servicio:response1.data._id,
                costo_base:response1.data.costo
                })
        }else{
            setValor(0)
            setValues({
                ...values,
                 servicio:'',costo_base:0
                })
        }
        }

        if( e.target.name != "servicio")
            setValues({
                ...values,
                [e.target.name]:e.target.value,vecino: vecino1._id
                })
    }

    /**Funcion que permite agregar los valores de: Día, Mes y Año
     */
    const DateSetter = (e) =>
    {
        CastTime(e)
        const string = e.target.value
        const year = string.substring(0,4)
        const mes = string.substring(5,7)
        const dia = string.substring(8,10)

        setValues({...values,dia,mes,year});
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

    /**
     *Funciones que permiten establecer las fechas limites para un input Date
     *
     */
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
            const fechaMaxima = (dateString3 + '-' + '0'+mes + '-' + dateString1)
            return fechaMaxima;
        }
    }



    const onSubmit= async (e) =>{

        e.preventDefault()
        try {
        const response = await axios.post(`${process.env.API_URL}/reserva/${localStorage.getItem("codigo")}`,values)
       

        if(response.status===201){
            Swal.fire({
            title:"Reserva Registrada",
            icon:'success',
            confirmButtonText:'OK'
            }).then(() =>{
                window.location.reload();
              })
        }
        } catch (error) {
        Swal.fire({
            title:"No se pudo agendar la Reserva",
            text:'Por favor revise los datos ingresado',
            icon:'warning',
            confirmButtonText:'OK'
        })
        }
    }

    

    const [servicios, setServicios] = useState([])
    const getServicios = async () => {
    const response = await axios.get(`${process.env.API_URL}/servicios`)
    setServicios(response.data)
    }

    const showServicios= () =>{

        return servicios.map(servicios =>{
        return (

            <option name="servicio" key={servicios.nombre} value={servicios._id}>{servicios.nombre}</option>
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
                <AiOutlineMenu size="20"/> &nbsp;  Menú
                </Button>
                <Button colorScheme='blue'  marginLeft="80%" onClick={cerrarSesion} h="16">
                <BsFillDoorClosedFill size="20"/> &nbsp; Cerrar Sesión
                </Button>
            </Box>

            <Button mt={10} name="atras" leftIcon={<ArrowBackIcon/>} colorScheme="blue" as="b" rounded="40" marginLeft="-60%"
        onClick={()=>router.push("/Vecino/reservas_vecino")}>
        Volver atrás</Button>

            <Drawer placement='left'  onClose={onClose} isOpen={isOpen} >
        <DrawerOverlay />
        <DrawerContent>
        <DrawerHeader  backgroundColor="blue.500" color="white" alignItems="center" display="flex"> 
  <AiOutlineMenu size="20"/> 
  &nbsp; 
  Menú
</DrawerHeader>
          <DrawerBody backgroundColor="blue.300">
          <Button width={"100%"} colorScheme="blue" mb="2" height="20" fontSize="20" onClick={() => router.push("/Vecino/inicio_vecino")}><BsFillHouseFill size="20"/>&nbsp;   Inicio</Button>
            <Button width={"100%"} colorScheme="blue" mb="2" height="20" fontSize="20" onClick={() => router.push("/Vecino/reservas_vecino")}><BsCalendar3 size="20"/>&nbsp; Reservas</Button>
            <Button width={"100%"} colorScheme="blue" mb="2" height="20" fontSize="20" onClick={() => router.push("/Vecino/multas_vecino")}><BsFillFileEarmarkExcelFill size="20"/>&nbsp; Multas</Button>
            <Button width={"100%"} colorScheme="blue" mb="2" height="20" fontSize="20" onClick={() => router.push("/Vecino/gastos_vecino")}><BsFillCreditCard2BackFill size="20"/>&nbsp; Gastos</Button>
            <Button width={"100%"} colorScheme="blue" mb="2" height="20" fontSize="20" onClick={() => router.push("/Vecino/mensajes_vecino")}><BsFillEnvelopeFill size="20"/>&nbsp; Mensajes</Button>


          </DrawerBody>
          <DrawerFooter backgroundColor="blue.300">
            <Button mr={3} onClick={onClose} colorScheme="blue">
            <AiOutlineClose size="20"/>&nbsp;Cerrar
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      <HStack mt={30} mb={30}>
       <BsFillCalendar2PlusFill color='white' size="50"/>
       <Text fontSize={50} color="white" >Crear Reserva</Text>
      </HStack>
              <Box  minW={{ base: "10%", md: "468px"}} >
                    <Stack
                        spacing={4}
                        p="1rem"
                        backgroundColor="whiteAlpha.900"
                        boxShadow="md"
                        rounded="16"
                        flexDir="column"
                        mb="2"
                        justifyContent="left"
                        alignItems="left">
                                <HStack mt={6}>
                                        <Text color={"blue.400"} as="b">Fecha:</Text>
                                        <Input type="date" id="start"
                                            date={new Date()}
                                            onChange={DateSetter}
                                            min={castMin()} max={castMax()}></Input>
                                </HStack>
    
                                <HStack id='semana'>
                                    <Text color={"blue.400"}  as="b" >Hora:</Text>
                                    <Select placeholder='Hora'  name="hora"   onChange={onChange}>
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
                                    <Text color={"blue.400"} as="b"  >Hora:</Text>
                                    <Select placeholder='Hora'  name="hora"   onChange={onChange}>
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
                                        <Text  value={selectedOption} color={"blue.400"} name="servicio" as="b" >Servicio:</Text>
                                        <Select placeholder='Seleccione servicio' name="servicio" onChange={onChange}>
                                            {showServicios()}
                                        </Select>
                                </HStack>
                                <HStack>
                                        <Text color={"blue.400"} as="b" >Costo del Servicio: </Text>(
                                        <Text name='costo_base'>{"$"+valor}</Text>)
    
                                </HStack>
                                    <Button mb={2}
                                        variant="solid"
                                        colorScheme="blue"
                                        rounded="50"
                                        onClick={onSubmit}
                                        >
                                            Crear
                                    </Button>
                    </Stack>
            </Box>

            </Flex>
)
}

export default AgregarReserva
