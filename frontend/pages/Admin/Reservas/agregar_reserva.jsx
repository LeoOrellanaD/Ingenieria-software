import { useEffect, useRef, useState } from 'react'
import { Flex, Text, Box, Stack,Button,VStack,HStack, Input, Select } from "@chakra-ui/react";
import { Calendar } from 'react-date-range';
import format from 'date-fns/format'
import Swal from 'sweetalert2'
import axios from 'axios'

import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'

const AgregarReserva=()=> {

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
    const [open, setOpen] = useState(false)
    const [calendar, setCalendar] = useState('')
    const refOne = useRef(null)

    useEffect(() => {
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
        setFecha({a ,b , c});
        setValues({...values,dia,mes,year});
    }
    const onChange = (e) => {
        setValues({
        ...values,
        [e.target.name]:e.target.value
        })
        console.log(e.target.name,e.target.value);
    }

    const onSubmit= async(e) =>{
        e.preventDefault()
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

return (
    <Flex
            flexDirection="column"
            width="100wh"
            height="100vh"
            backgroundColor="blue.400"
            alignItems="center"
            >
              <Text fontSize={50} color="white" mt={30} mb={30}>Crear Mantencion</Text>
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
                                    <Text color={"blue.400"} as="b" >Fecha</Text>
                                    <Input
                                        value={ calendar }
                                        readOnly
                                        onClick={ () => setOpen(open => !open) }
                                    />
                                    <Box ref={refOne} flexDirection="column">
                                    {open &&
                                    <Calendar
                                    date={ new Date()}
                                    onChange = {handleSelect}
                                    className="calendarElement"
                                />
                                }
                                </Box>
                            </HStack>
                            <HStack>
                                    <Text color={"blue.400"} as="b" >Nombre de empresa</Text>
                                    <Input width={60} type={"text"} name={"nombre_empresa"}onChange={onChange} ></Input>
                            </HStack>
                            <HStack>
                                    <Text color={"blue.400"} as="b" >rut de empresa</Text>
                                    <Input width={60} type={"text"} name={"rut_empresa"}onChange={onChange} ></Input>
                            </HStack>
                            <HStack>
                                    <Text color={"blue.400"} as="b" >giro de empresa</Text>
                                    <Input width={60} type={"text"} name={"giro"}onChange={onChange} ></Input>
                            </HStack>
                            <HStack>
                                    <Text color={"blue.400"} as="b" >descripcion de mantencion</Text>
                                    <Input width={60} type={"text"} name={"descripcion"}onChange={onChange} ></Input>
                            </HStack>
                            <HStack>
                                    <Text color={"blue.400"} as="b" >valor </Text>
                                    <Input width={60} type={"number"} name={"valor"}onChange={onChange} ></Input>
                            </HStack>
                            
                            <HStack>
                                    <Text color={"blue.400"} as="b" >Observaciones </Text>
                                    <Input width={60} type={"text"} minLength={10} maxLength={200} name={"observaciones"}onChange={onChange} ></Input>
                            </HStack>
                            <HStack>
                                    <Text color={"blue.400"} as="b" >NÂ° mantencion</Text>
                                    <Input width={60} type={"number"} name={"num_mantencion"} onChange={onChange} ></Input>
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