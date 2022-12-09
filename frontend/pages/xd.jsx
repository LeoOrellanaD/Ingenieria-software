
import { useState, useEffect } from 'react'
import { Button, Container, Input, Stack, Text, HStack, Table, Thead, Tbody, Tfoot, Tr, Th, Td, Heading, } from '@chakra-ui/react'
import axios from 'axios'
import { useRouter } from 'next/router'
import administrador from '../../backend/models/administrador'

export default function nuevapag() {

    //const code = localStorage.getItem('CodigoIngresoActual');


	const [products, setAdmin] = useState([])
	const router = useRouter()

	const getAdmin = async () => {
		const response = await axios.get(`${process.env.API_URL}/administrador/search/{code}`)
		setAdmin(response.data)
	}

	useEffect(() => {
		getAdmin()
	}, [])

	const showAdmin = () => {
	return products.map(administrador => {
			return (
				<Tr key={administrador._id}>
					<Td>{administrador.nombre}</Td>
					<Td>{administrador.apellido}</Td>
					<Td>{administrador.telefono}</Td>
				</Tr>
			)
        })
	}

	return (
		<Container maxW="container.xl" centerContent>
			<Heading textAlign={"center"} my={10}>INICIO DE ADMINISTRADOR</Heading>
			<Table variant="simple">
				<Thead>
					<Tr>
						<Td>Nombre</Td>
						<Td>Apellido</Td>
						<Td>Telefono</Td>
					</Tr>
				</Thead>
				<Tbody>
					{showAdmin()}
				</Tbody>
			</Table>
		</Container>
	)
}