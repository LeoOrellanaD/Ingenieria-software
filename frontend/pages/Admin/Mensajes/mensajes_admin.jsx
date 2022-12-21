import { useState, useEffect } from "react";
import { Flex, Text, Box, Stack , HStack, Accordion, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel, Button} from "@chakra-ui/react";
import axios from 'axios'
import { useRouter } from 'next/router'

const MensajesAdmin = () => {

const router = useRouter()
const [mensajes, setMensajes] = useState([])
    const getMensajes = async () => {
    try {
        const response = await axios.get(`${process.env.API_URL}/mensajes`)
    setMensajes(response.data)
    } catch (error) {

    }

    }
useEffect(() => {
    getMensajes()
}, [])

const showMensajes = () =>{
    return mensajes.map(mensajes =>{
        return (

                <AccordionItem key={mensajes._id}>
                <h2>
                <AccordionButton>
                <Box as="span" flex='1' textAlign='left' width={700}>
                    <Text><b>Fecha:</b> {mensajes.dia}/{mensajes.mes}/{mensajes.year}</Text>
                    <Text><b>Asunto:</b> {mensajes.asunto}</Text>
                </Box>
                <AccordionIcon />
                </AccordionButton>
                </h2>
        <AccordionPanel pb={4}>
            <Text> <b>De:</b> {mensajes.administrador.nombre} {mensajes.administrador.apellido} </Text>
            <Text> <b>Para: </b>
            {mensajes.vecino.map(vecinos=>{
                return "["+vecinos.nombre +" "+ vecinos.apellido+"] "
            })}
            </Text>
            <Text> <br /> </Text>
            <Text >{mensajes.contenido}</Text>

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



        <Text fontSize={50} color="white" mt={30} mb={30}>Mensajes</Text>
        <Button mb="2"
                variant="solid"
                colorScheme="blue"
                rounded="50"
                onClick = {() => router.push("/Admin/Mensajes/agregar_mensaje")}>
                    Agregar Mensaje</Button>
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
                    <Accordion allowToggle key={mensajes._id}width={700}>
                    {showMensajes()}
                    </Accordion>

                </Stack>
        </Box>
        </HStack>
        </Flex>
    );
};

export default MensajesAdmin;
