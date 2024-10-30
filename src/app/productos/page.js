"use client"

import {Affix, Box, Button, Center, Container, Group, Spoiler, Stack, Table, Text} from "@mantine/core"
import {useContext} from "react"
import {Context} from "@/app/providers"
import Image from "next/image"
import {useRouter} from "next/navigation"

// function downloadString(text, fileType, fileName) {
//   var blob = new Blob([text], { type: fileType });
//
//   var a = document.createElement('a');
//   a.download = fileName;
//   a.href = URL.createObjectURL(blob);
//   a.dataset.downloadurl = [fileType, a.download, a.href].join(':');
//   a.style.display = "none";
//   document.body.appendChild(a);
//   a.click();
//   document.body.removeChild(a);
//   setTimeout(function() { URL.revokeObjectURL(a.href); }, 1500);
// }

function downloadString(content, mimeType, filename){
  const a = document.createElement('a') // Create "a" element
  const blob = new Blob([content], {type: mimeType}) // Create a blob (file-like object)
  const url = URL.createObjectURL(blob) // Create an object URL from blob
  a.setAttribute('href', url) // Set "a" element link
  a.setAttribute('download', filename) // Set download filename
  a.click() // Start downloading
}

export default function Products() {
  const {products} = useContext(Context)
  const router = useRouter()

  const handleDownloadCsv = () => {
    let formData = new FormData();
    formData.append('email', 'alexiscedros@gmail.com');
    formData.append('json', JSON.stringify(products));

    fetch(
      "https://data.page/api/getcsv",
      {
        body: formData,
        method: "post"
      }
    )
      .then(x => x.text())
      .then(text => {
      downloadString(text, "text/csv", "productos.csv")
    })
  }

  const handleDownloadImages = async () => {
    // IcuIAwVeeCxm
    const images = products.map(x => "https://" + x.img.substr(2))

    let formData = new FormData();

    for (let i = 0; i < images.length; i++) {
      formData.append(`Files[${i}]`, images[i]);
    }

    formData.append('StoreFile', true);

    const file = await fetch(
      "https://v2.convertapi.com/convert/any/to/zip",
      {
        headers: {
          "Authorization": "Bearer secret_4AHzQGKCs0YMfWEY"
        },
        body: formData,
        method: "post"
      }).then(res => res.json())

    router.push(file.Files[0].Url)


    // let tempConvert = convertapi('secret_4AHzQGKCs0YMfWEY')
    // tempConvert.convert("zip", {
    //   Files: images
    // })

    // postRequest(
    //   "https://api.archiveapi.com/zip?secret=IcuIAwVeeCxm",
    //   {
    //     files: images,
    //     archiveName: "imagenes.zip",
    //   }
    // )
  }

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

      <Affix w="100vw" bg="white" p="md" style={{borderTop: "1px solid rgb(204, 204, 204)"}}>
        <Group>
          <Button size="xs" fullWidth flex={1} variant="outline" onClick={() => handleDownloadCsv()}>
             Descargar CSV
          </Button>

          <Button size="xs" fullWidth flex={1} variant="outline" onClick={() => handleDownloadImages()}>
            Descargar Imagenes
          </Button>
        </Group>
      </Affix>
    </Container>
  )
}
