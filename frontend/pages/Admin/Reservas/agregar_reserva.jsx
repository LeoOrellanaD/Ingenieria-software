import { useEffect, useRef, useState } from 'react'
import { Flex, Text, Box, Stack,Button,VStack,HStack, Input, Select,Label } from "@chakra-ui/react";
import { Calendar } from 'react-date-range';
import format from 'date-fns/format'
import Swal from 'sweetalert2'
import axios from 'axios'

import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'

const AgregarReserva=()=> {


    const [selectedOption, setSelectedOption] = useState('')
    const [valor, setValor] = useState('0')
    const [open, setOpen] = useState(false)
    const [calendar, setCalendar] = useState('')
    const refOne = useRef(null)

    const [values, setValues]= useState({
        dia:'',
        mes:'',
        year:'',
        hora:'',
        servicio:'',
        vecino:'',
        costo_base:'',
        costo_extra:''
    })

    useEffect(() => {
        getVecinos()
        getServicios()
        setCalendar(format(new Date(), 'dd/MM/yyyy'))
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
    const handleSelect = (date) => {
        setCalendar(format(date, 'dd/MM/yyyy'))
        //console.log(date)
        const a=date.getDate();
        const b=date.getMonth()+1;
        const c=date.getFullYear();
        const dia=  a.toString();
        const mes=  b.toString();
        const year= c.toString();
        setValues({...values,dia,mes,year});
    }


    const onChange = (e) => {

        if(e.target.name=="servicio"){

            if(e.target.value=='6383fdffc30aa7d98e884a0b'){
                setValor(8000)
                setValues({...values,
                    servicio:e.target.value, costo_base: "8000"});
            }
        if(e.target.value=='6383fdeac30aa7d98e884a09'){
            setValor(6000)
            setValues({...values,
                servicio:e.target.value,costo_base: "6000"});
        }
        }else{
            setValues({
                ...values,
                [e.target.name]:e.target.value
                })
                console.log(e.target.name,e.target.value);


        }


    }


    const Actualizar = () =>{

        if(values.servicio=='6383fdffc30aa7d98e884a0b'){
            setValues({...values,
                costo_base: "8000"});
        }
        if(values.servicio=='6383fdeac30aa7d98e884a09'){
            setValues({...values,
                costo_base: "6000"});
        }
    }


    const onSubmit= async (e) =>{

        e.preventDefault()
        Actualizar();
        console.log(values)



        try {
        const response = await axios.post(`${process.env.API_URL}/reserva`,values)
        console.log(response)

        if(response.status===201){
            Swal.fire({
            title:"Mantención Registrada",
            icon:'success',
            confirmButtonText:'OK'
            }).then(()=>{
            window.location.reload();
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
            return (
            <option name="vecino" key={vecinos._id} value={vecinos._id}>{vecinos.nombre} {vecinos.apellido}</option>

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

return (
    <Flex
            flexDirection="column"
            width="100wh"
            height="100vh"
            backgroundColor="blue.400"
            alignItems="center"
            >
              <Text fontSize={50} color="white" mt={30} mb={30}>Crear Reserva</Text>
              <Box  minW={{ base: "10%", md: "468px"}} >
            <form>
                <Stack spacing={4}
                    p="1rem"
                    backgroundColor="whiteAlpha.900"
                    boxShadow="md"
                    rounded="16"
                    flexDir="column"
            mb="2"
            justifyContent="left"
            alignItems="left">
                <HStack>
                    <VStack spacing={6}>
                            <HStack>
                                    <Text color={"blue.400"} as="b" >Fecha:</Text>
                                    <Input
                                        value={ calendar }
                                        readOnly
                                        onClick={ () => setOpen(open => !open) }
                                    />
                                    <Box ref={refOne} flexDirection="column">
                                    {open &&
                                    <Calendar
                                    direction='horizontal'
                                    date={ new Date()}
                                    onChange = {handleSelect}
                                    className="calendarElement"
                                />
                                }
                                </Box>
                            </HStack>
                            <HStack>
                                    <Text color={"blue.400"} as="b" >Hora:</Text>
                                    <Input width={60} type="datetime-local" name={"hora"} onChange={onChange} step={3600}></Input>
                            </HStack>
                            <HStack>
                                    <Text  value={selectedOption} color={"blue.400"} name="servicio" as="b" >Servicio:</Text>
                                    <Select placeholder='seleccione servicio' name="servicio" onChange={onChange}>
                                        {showServicios()}
                                    </Select>
                            </HStack>
                            <HStack>
                                    <Text color={"blue.400"} as="b" >Vecino</Text>
                                    <Select placeholder='Vecinos' name="vecino" onChange={onChange}>
                                    {showVecinos()}
                                    </Select>
                            </HStack>
                            <HStack>
                                    <Text color={"blue.400"} as="b" >Costo del Servicio</Text>(
                                    <Text name='costo_base'>{valor}</Text>)

                            </HStack>
                            <HStack>
                                    <Text color={"blue.400"} as="b" >Costo Extra </Text>
                                    <Input width={60} type={"number"} name={"costo_extra"}onChange={onChange} ></Input>
                            </HStack>
                            <HStack>
                                    <Text color={"blue.400"} as="b" >Costo total </Text>
                                    <Text></Text>
                            </HStack>
                    </VStack>

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
            </form>
        </Box>

            </Flex>
)
}

export default AgregarReserva