import { useState, useEffect  } from "react";
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  Box,
  Avatar,
  FormControl,
  Radio,
  RadioGroup,
  FormHelperText,
  InputRightElement,
  Head,
  Link 

} from "@chakra-ui/react";
import axios from 'axios'
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'



export default function Home() {


const router = useRouter()
const [values, setValues]= useState({
  codigo:''
})

const onSubmit= async(e) => {
  e.preventDefault()
  console.log(values)

  if(document.getElementById('admin').checked){
    try{

      const response = await axios.post(`${process.env.API_URL}/administrador/login`,values)
      console.log(response)

    console.log(response)
    if(response.status===200){
      Swal.fire({
        title:"Bienvenido",
        icon:'success',
        confirmButtonText:'OK'
      }).then((result)=>{
        console.log(values.codigo)

        router.push({pathname:'/Admin/inicio_admin',
        query:{codigo: values.codigo},
      });

      })
    }

  }
  catch(error){
    Swal.fire({
      title:"Codigo no valido",
      text:'Ingrese un codigo valido',
      icon:'error',
      confirmButtonText:'OK'
    })
  }
}
if(document.getElementById('vecino').checked){
  try{
    const response = await axios.post(`${process.env.API_URL}/vecino/login`,values)
    console.log(response)


  console.log(response)
  if(response.status===200){
    Swal.fire({
      title:"Bienvenido",
      icon:'success',
      confirmButtonText:'OK'
    }).then((result)=>{

      router.push({pathname:'/Vecino/inicio_vecino',
        query:{codigo: values.codigo},
      });
    })
}else{
    Swal.fire({
      title:"Codigo no valido",
      text:'Ingrese un codigo valido',
      icon:'error',
      confirmButtonText:'OK'
    })
  }

}
catch(error){
  console.log(error)
  if(error.response.status===401){
    Swal.fire({
      title:"Vecino Inhabilitado",
      text:"Por favor comunicarse con su Administrador",
      icon:'warning',
      confirmButtonText:"OK"
    })
  }else{
    Swal.fire({
      title:"Codigo no valido",
      text:'Este codigo no existe',
      icon:'error',
      confirmButtonText:'OK'
    })
  }

}
}
}

const onChange = (e) => {

    if(e.target.value.length>4){
      e.target.value=e.target.value.substring(0,4);
    }
    setValues({
      ...values,
      [e.target.name]:e.target.value
    })
    console.log(e.target.name,e.target.value);

}

useEffect(() => {
  document.title="Lavanderia 60 minutos";

  window.history.pushState(null,window.location.href);
  window.onpopstate=function(){
    window.history.pushState(null,window.location.href);
  }
}, []);



  return (
    
    <Flex
      flexDirection="column"
      width="100wh"
      height="auto"
      minH={"100vh"}
      backgroundColor="blue.200"
      justifyContent="center"
      alignItems="center"
    >
      
      <Link rel="icon" href="/frontend/public/vercel" type="image/x-icon" />
    
      
      <Box minW={{ base: "90%", md: "468px" }}  width={600} height={400} color="blue.500">
        <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        <Avatar bg="blue.500" />
        <Heading color="blue.500">Lavanderia 60 Minutos </Heading>
        <Box minW={{ base: "90%", md: "468px" } } >
        
            <Stack
              spacing={4}
              p="1rem"
              backgroundColor="whiteAlpha.900"
              boxShadow="md"
              rounded="16"
            >
              <FormControl>
                <InputGroup>
                  <InputLeftElement pointerEvents="none" />
                  <Input type="number" maxLength={4} placeholder="Codigo de Ingreso" name={"codigo"} onChange={onChange}/>
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement pointerEvents="none" color="gray.300" />
                  <RadioGroup>
                    <Stack spacing={5} direction="row">
                      <Radio colorScheme="blue" value="1" id="admin">
                        Administrador
                      </Radio>
                      <Radio colorScheme="blue" value="2" id="vecino">
                        Vecino
                      </Radio>
                    </Stack>
                  </RadioGroup>

                  <InputRightElement width="4.5rem"></InputRightElement>
                </InputGroup>
                <FormHelperText textAlign="right"></FormHelperText>
              </FormControl>
              <Button
                borderRadius={0}
                type="submit"
                variant="solid"
                colorScheme="blue"
                width="full"
                rounded="50"
                onClick={onSubmit}
              >
                Iniciar Sesion
              </Button>
            </Stack>
          
        </Box>
      </Stack>
      </Box>
      
    </Flex>
  );

}
