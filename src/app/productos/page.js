"use client"

import {Box, Center, Container, Spoiler, Stack, Table, Text} from "@mantine/core"
import {useContext} from "react"
import {Context} from "@/app/providers"
import Image from "next/image"

export default function Products() {
  const {products} = useContext(Context)

  return (
    <Container size="xs">
      <Stack m="md">
        {products.map(product => (
          <Table key={product.sku} withColumnBorders withTableBorder>
            <Table.Tbody>
              <Table.Tr>
                <Table.Td bg="gray.0" fw={700}>Imagen</Table.Td>
                <Table.Td>
                  <Center w="100%">
                    <Image
                      src={"https://" + product.img.substr(2)}
                      alt={product.title}
                      width={80}
                      height={80}
                    />
                  </Center>
                </Table.Td>
              </Table.Tr>

              <Table.Tr>
                <Table.Td bg="gray.0" fw={700}>Titulo</Table.Td>
                <Table.Td>{product.title}</Table.Td>
              </Table.Tr>

              <Table.Tr>
                <Table.Td bg="gray.0" fw={700}>SKU</Table.Td>
                <Table.Td>{product.sku}</Table.Td>
              </Table.Tr>

              <Table.Tr>
                <Table.Td bg="gray.0" fw={700}>Precio</Table.Td>
                <Table.Td>{product.price}</Table.Td>
              </Table.Tr>

              <Table.Tr>
                <Table.Td bg="gray.0" fw={700}>Marca</Table.Td>
                <Table.Td>{product.brand}</Table.Td>
              </Table.Tr>

              <Table.Tr>
                <Table.Td bg="gray.0" fw={700}>Tipo</Table.Td>
                <Table.Td>{product.type}</Table.Td>
              </Table.Tr>

              <Table.Tr>
                <Table.Td bg="gray.0" fw={700}>Medidas</Table.Td>
                <Table.Td>{product.size}</Table.Td>
              </Table.Tr>

              <Table.Tr>
                <Table.Td bg="gray.0" fw={700}>Peso</Table.Td>
                <Table.Td>{product.weight}</Table.Td>
              </Table.Tr>

              <Table.Tr>
                <Table.Td bg="gray.0" fw={700}>Descripcion</Table.Td>
                <Table.Td>
                  <Spoiler maxHeight={150} showLabel="Ver Mas" hideLabel="Ocultar">
                    <Box maw="50vw" dangerouslySetInnerHTML={{__html: product.description}}/>
                  </Spoiler>
                </Table.Td>
              </Table.Tr>
            </Table.Tbody>
          </Table>
        ))}
      </Stack>
    </Container>
  )
}
