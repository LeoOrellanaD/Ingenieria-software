import { useEffect, useRef, useState } from 'react'
import { useDisclosure, Flex, Text, Box, Stack,Button,HStack, Input, Select,InputGroup,InputLeftElement , Drawer,DrawerFooter, DrawerOverlay,DrawerContent,DrawerHeader,DrawerBody } from "@chakra-ui/react";
import Swal from 'sweetalert2'
import axios from 'axios'
import { useRouter } from "next/router";
import { ArrowBackIcon } from "@chakra-ui/icons";

const AgregarReserva=()=> {
    const [selectedOption, setSelectedOption] = useState('')
    const [valor, setValor] = useState('0')
    const [valor2, setValor2] = useState('0')
    const [open, setOpen] = useState(false)
    const refOne = useRef(null)
    const router = useRouter();
    const { isOpen, onOpen, onClose } = useDisclosure()

    const[semana, setSemana] = useState('null')
    const[findesemana, setFindesemana] = useState('null')

    const [values, setValues]= useState({
        dia:'',
        mes:'',
        year:'',
        hora:'',
        servicio:'',
        vecino:'',
        costo_base:'',
        costo_extra: 0
    })

    useEffect(() => {
        document.getElementById('semana').hidden=true
        document.getElementById('findesemana').hidden=true
        getVecinos()
        getServicios()
        document.addEventListener("keydown", hideOnEscape, true)
        document.addEventListener("click", hideOnClickOutside, true)
    }, [])

    const hideOnEscape = (e) => {
        console.log(e.key)
        if( e.key === "Escape" ) {
            setOpen(false)
        }
    }
    const hideOnClickOutside = (e) => {
        if( refOne.current && !refOne.current.contains(e.target) ) {
            setOpen(false)
        }
    }

    //posiblemente hay que eliminar



    const onChange = async (e) => {
        
        if(e.target.name=="servicio"){

            const response1 = await axios.get(`${process.env.API_URL}/servicio/search/${e.target.value}`)
            setValor(response1.data.costo)
            setValues({
                ...values,
                servicio:response1.data._id,
                costo_base:response1.data.costo
                })
                console.log(e.target.name, response1.data.costo);
        }else
        if(e.target.name == "vecino"){
            const response = await axios.get(`${process.env.API_URL}/vecino/search/${e.target.value}`)

            setValues({
                ...values,
                [e.target.name]:response.data._id
                })
                console.log(e.target.name,response.data._id);
        }else
        if(e.target.name != "vecino" || e.target.name != "servicio"){
            setValues({
                ...values,
                [e.target.name]:e.target.value
                })
                console.log(e.target.name,e.target.value);
        }
        if(e.target.name=="costo_extra"){
            console.log(e.target.value)
            if(!e.target.value)
            {
                setValues({
                    ...values,
                    costo_extra:0
                    })
                    console.log(e.target.name,e.target.value);
            }
            if(e.target.value.length>4){
              e.target.value=e.target.value.substring(0,4);
            }
        setValor2(e.target.value)
        }
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
                const fechaMaxima = (dateString3 + '-' + mes + '-' + dateString1)
            return fechaMaxima;
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


    const Actualizar = () =>{

        if(values.servicio.nombre=='lavadora'){
            setValues({...values,
                costo_base: "8000"});
        }
        if(values.servicio.nombre=='secadora'){
            setValues({...values,
                costo_base: "6000"});
        }
    }


    const onSubmit= async (e) =>{

        e.preventDefault()
        Actualizar();
        console.log(values)



        try {
        const response = await axios.post(`${process.env.API_URL}/reserva/${vecino_select.value}`,values)
        

        if(response.status===201){
            Swal.fire({
            title:"Reserva Registrada",
            icon:'success',
            confirmButtonText:'OK'
            }).then(()=>{
            window.location.reload();
        })
        }
        } catch (error) {
            console.log(error.status)
        Swal.fire({
            title:"No se pudo agendar la Reserva",
            text:'Por favor revise los datos ingresado',
            icon:'warning',
            confirmButtonText:'OK'
        })
        }
    }

    const [vecinos, setVecinos] = useState([])
    const getVecinos = async () => {
    const response = await axios.get(`${process.env.API_URL}/vecinos`)
    setVecinos(response.data)
    }

    const [servicios, setServicios] = useState([])
    const getServicios = async () => {
    const response = await axios.get(`${process.env.API_URL}/servicios`)
    setServicios(response.data)
    }

    const showVecinos= () =>{
        return vecinos.map(vecinos =>{
            if(vecinos.estado=='activo')
            return (
            <option name="vecino" key={vecinos._id} value={vecinos.codigo}>{vecinos.nombre} {vecinos.apellido}</option>

        )
    })
    }

    const showServicios= () =>{

        return servicios.map(servicios =>{
        return (

            <option name="servicio" key={servicios.nombre} value={servicios._id}>{servicios.nombre}</option>
        )
        })
    }

    const Tot = () => {
        if(!valor2)
        {
            const result = valor
            return result
        }
        const result = parseInt(valor, 10) + parseInt(valor2, 10)
        return result
    }

    const cerrarSesion = async (e) => {

        e.preventDefault()
        localStorage.clear();
        router.push("/")
    
    }


return (
    <Flex
            flexDirection="column"
            width="150wh"
            height="auto"
            minH={"100vh"}
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
              <Text fontSize={50} color="white" mt={30} mb={30}>Crear Reserva</Text>
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
                                    <Text width={"full"} color={"blue.400"}  as="b" >Hora:</Text>
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
                                    <Text width={"full"} color={"blue.400"} as="b"  >Hora:</Text>
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
                                        <Text color={"blue.400"} as="b" >Vecino: </Text>
                                        <Select id="vecino_select" placeholder='Vecinos' name="vecino" onChange={onChange}>
                                        {showVecinos()}
                                        </Select>
                                </HStack>
                                <HStack>
                                        <Text color={"blue.400"} as="b" >Costo del Servicio: </Text>(
                                        <Text name='costo_base'>{"$"+valor}</Text>)
    
                                </HStack>
                                <HStack >
                                        <Text width={120} color={"blue.400"} as="b" >Costo Extra: </Text>
                                        <InputGroup>
                                        <InputLeftElement
                                            pointerEvents='none'
                                            fontSize='1.2em'
                                            children='$'
                                        />
                                        <Input width={"full"} placeholder={'0'} type={"number"} maxLength={5} name={"costo_extra"} onChange={onChange} ></Input>
                                        </InputGroup>
                                </HStack>
                                <HStack>
                                        <Text color={"blue.400"} as="b" >Costo total: </Text>
                                        <Text name='costoTotal'> {"$"+Tot()} </Text>
                                </HStack>
                                    <Button mb={2}
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

export default AgregarReserva