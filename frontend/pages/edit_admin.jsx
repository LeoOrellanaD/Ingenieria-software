import React from 'react'
import { Flex, Text, Box, Stack, Table, Thead,Tr,Td,Tbody, Button,VStack,HStack,Input} from "@chakra-ui/react";
import { useRouter } from "next/router";
import axios from 'axios'

const EditAdmin = () => {
return (
    <Flex
    flexDirection="column"
    width="100wh"
    height="100vh"
    backgroundColor="blue.400"
    alignItems="center">
        <Text fontSize={50} color="white" mt={30} mb={30}>Editar Perfil</Text>
        <Box
        spacing={4}
        p="1rem"
        backgroundColor="whiteAlpha.900"
        boxShadow="md"
        rounded="16"
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center">
            
            <HStack>
                <HStack>
                <Text></Text>
                <Input placeholder="Ejemplo: 20"></Input>
                </HStack>
                <HStack>
                <Text>Mes</Text>
                <Input placeholder="Ejemplo: 02"></Input>
                </HStack>
                <HStack>
                <Text>Año</Text>
                <Input placeholder="Ejemplo: 2022"></Input>
                </HStack>

            </HStack>
        </Box>
    </Flex>
)
}

export default EditAdmin;