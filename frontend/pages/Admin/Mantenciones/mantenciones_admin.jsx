import { useState, useEffect } from "react";
import { Button, Flex, Text, Box, Stack , HStack, Accordion, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel} from "@chakra-ui/react";
import axios from 'axios'
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'


const MantencionesAdmin = () =>{

    const router = useRouter()

const [mantenciones, setMantenciones] = useState([])
const getMantenciones = async () => {
    const response = await axios.get(`${process.env.API_URL}/mantenciones`)
    setMantenciones(response.data)
}
useEffect(()=> {
    getMantenciones()
},[])

const deleteMantencion = async (x)=> {

    Swal.fire({
        title:'¿Estas seguro de eliminar esta mantención?',
        text:'No se podra deshacer esta acción',
        icon:'warning',
        showCancelButton:true,
        confirmButtonColor:'#8DDE7C',
        cancelButtonColor:'#F24343',
        confirmButtonText: 'Aceptar',
        cancelButtonText:'Cancelar'
    }).then((result)=>{
        if(result.value){
            const response = axios.delete(`${process.env.API_URL}/mantencion/delete/${x}`)
            setMantenciones(response.data)
            window.location.reload();
        }
})}

const showMantenciones = () =>{
    return mantenciones.map(mantenciones =>{
    return (
        <AccordionItem key={mantenciones._id}>
                <h2>
                <AccordionButton>
                <Box as="span" flex='1' textAlign='left' width={700}>
                    <Text><b>Fecha:</b> {mantenciones.dia}/{mantenciones.mes}/{mantenciones.year}</Text>
                    <Text><b>Empresa:</b> {mantenciones.nombre_empresa} &nbsp;&nbsp; <b>N° de Mantención:</b> {mantenciones.num_mantencion}  </Text>
                </Box>
                <AccordionIcon />
                </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                    <Text> <b>Rut Empresa:</b> {mantenciones.rut_empresa} &nbsp;&nbsp; <b>Giro:</b> {mantenciones.giro} </Text>
                    <Text> <b>Hora: </b> {mantenciones.hora} </Text>
                    <Text> <b>Descripción: </b> {mantenciones.descripcion} </Text>
                    <Text> <b>Valor: </b> {mantenciones.valor} </Text>
                    <Text> <b>Observaciones: </b> {mantenciones.observaciones} </Text>
                    <Text> <br /> </Text>
                    <Text ></Text>
                    <Button
                        id={mantenciones.num_mantencion}
                        variant="solid"
                        colorScheme="blue"
                        rounded="50"
                        onClick={()=>deleteMantencion(mantenciones.num_mantencion)}
                        >Eliminar</Button>
                </AccordionPanel>
        </AccordionItem>
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

    <Text fontSize={50} color="white" mt={30} mb={30}>Mantenciones</Text>
    

    <Button mb="2"
                variant="solid"
                colorScheme="blue"
                rounded="50"
                onClick = {() => router.push("/Admin/Mantenciones/agregar_mantencion")}>
                    Agregar Mantencion</Button>

    <HStack>

        <Box  minW={{ base: "10%", md: "468px"}} width="700">
            <Stack spacing={4}
                p="1rem"
                backgroundColor="whiteAlpha.900"
                boxShadow="md"
                rounded="16"
                flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center">
                <Accordion allowToggle width={700}>
                {showMantenciones()}
                </Accordion>

            </Stack>
    </Box>
    </HStack>
    </Flex>
);

}

export default MantencionesAdmin;