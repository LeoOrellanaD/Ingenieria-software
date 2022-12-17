import { useState, useEffect } from "react";
import { Text, Box, Stack, HStack, Button,Input,Select} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { EditIcon } from '@chakra-ui/icons'
import axios from "axios";
import Swal from 'sweetalert2'

 const EditarVecino = () => {

    const router = useRouter();
    const {
        query: { codigo },
    } = router;

    const props = {
        codigo,
    };

    const [visible, setVisible] = useState(false);

    const [vecino, setVecino] = useState([])
    const getVecino = async () => {
        const response = await axios.get(`${process.env.API_URL}/vecino/search/${props.codigo}`)
        setVecino(response.data)
        }

    useEffect(() => {
        getVecino()
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
          console.log(e.target.name,e.target.value);

        }

    const onSubmit = async(e) =>{
        e.preventDefault()
        console.log(values.horas)
        
        try {
            const response =await axios.put(`${process.env.API_URL}/vecino/update/${props.codigo}`,{permiso:values.permiso , horas:values.horas})
            console.log(response)
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
            console.log(error)
            Swal.fire({
                title:"No se pudo actualizar al vecino",
                text:'Por favor revise los datos ingresado',
                icon:'warning',
                confirmButtonText:'OK'
              })
        }

    }


return (
        <Stack
            flexDirection = "column"
            width = "100wh"
            height = "130vh"
            backgroundColor = "blue.400"
            alignItems = "center"
        >
            <HStack>
                <Text fontSize = {50} color = "white" mt = {30} mb = {30}>
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
                        <Text as='b'>Horas:</Text>
                        <Input type="number" name="horas" width={"24"} onChange={onChange} style={{display: visible ? 'inline' : 'none'}}></Input>
                        <Text style={{display: visible ? 'none' : 'inline'}} >{showVecino()[4]}</Text>
                        
                    </HStack>
                    <HStack>
                        <Text as='b'>Permiso:</Text>
                        <Text style={{display: visible ? 'none' : 'inline'}}>{showVecino()[5]}</Text>
                        <Select placeholder='Tipo de Multa' name="permiso" onChange={onChange} display={visible ? 'inline' : 'none'}>
                            <option color={"blue.400"} as="b">habilitado</option>
                            <option color={"blue.400"} as="b">inhabilitado</option>
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
                </Stack>
            </Box>
        </Stack>
)
}

export default EditarVecino
