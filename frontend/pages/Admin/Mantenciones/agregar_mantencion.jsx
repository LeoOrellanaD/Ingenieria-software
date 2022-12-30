import { useEffect, useRef, useState } from 'react'
import { Flex, Text, Box, Stack,Button,VStack,HStack, Input, Select, Textarea, Menu, MenuButton, MenuList,MenuItem  } from "@chakra-ui/react";
import Swal from 'sweetalert2'
import axios from 'axios'
import { useRouter } from "next/router";


const agregarMantencion = () => {

    const [fecha , setFecha] = useState(
        {
            dia: '',
            mes: '',
            year:''
        }
    )
    const router = useRouter();

    const [values, setValues]= useState({
        nombre_empresa:'',
        rut_empresa:'',
        giro:'',
        descripcion:'',
        valor:'',
        dia:'',
        mes:'',
        year:'',
        hora:'',
        observaciones:''
      })
  // open close
    const [open, setOpen] = useState(false)

  // get the target element to toggle
    const refOne = useRef(null)

    useEffect(() => {
        
        document.addEventListener("keydown", hideOnEscape, true)
        document.addEventListener("click", hideOnClickOutside, true)
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
            <Button mt={10} name="atras" colorScheme="blue" as="b" rounded="40" style={{
            position: "fixed",
            top: "20px",
            left: "200px",
            zIndex: 1,
            }}
            onClick={()=>router.push("/Admin/Mantenciones/mantenciones_admin")}>
            Volver atrás</Button>
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
                                    <Textarea
                                        placeholder='Escribe la descripci처n de la mantencion'
                                        width={60}
                                        type={"text"}
                                        name={"descripcion"}
                                        minLength={10}
                                        maxLength={200}
                                        onChange={onChange}>
                                    </Textarea>
                            </HStack>
                            <HStack>
                                    <Text color={"blue.400"} as="b" >valor </Text>
                                    <Input width={60} type={"number"} name={"valor"}onChange={onChange} ></Input>
                            </HStack>
                            <HStack>
                                    <Text color={"blue.400"} as="b" >Fecha</Text>
                                    <Input type="date" id="start"
                                        date={new Date()}
                                        onChange={DateSetter}
                                        min={castMin()} max={castMax()}></Input>
                                
                            </HStack>
                            <HStack>
                                    <Text color={"blue.400"} as="b" >Observaciones </Text>
                                    <Textarea
                                            placeholder='Escribe las observaciones de la mantencion'
                                            width={60} type={"text"}
                                            minLength={10}
                                            maxLength={200}
                                            name={"observaciones"}onChange={onChange} >
                                    </Textarea>
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

export default agregarMantencion