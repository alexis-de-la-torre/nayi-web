"use client"

import {Alert, Button, Center, Container, Group, Progress, Stack, Text, Textarea, Title} from "@mantine/core"
import {useContext, useState} from "react"
import {Context} from "@/app/providers"
import {useRouter} from "next/navigation"
import {Copy, Info} from 'lucide-react';

export default function Home() {
  const [value, setValue] = useState('');
  const {setSkus} = useContext(Context)
  const router = useRouter()

  const handleSubmit = () => {
    setSkus(value.split("\n"))
    router.push("/procesando")
  }

  const handleTest = (qty) => {
    const testSkus = [
      "HD-20A",
      "CT-120",
      "EVAC-4",
      "VSCH-300AC1B",
      "PTRF-0035",
      "1024353",
      "1024297",
      "1023854",
      "WDR-1",
      "UWBF-1",
    ]

    setValue(testSkus.slice(0, qty).join("\n"))
  }

  return (
    <Container size="xs" m="lg">
      <Center h="100svh">
        <Stack w="100%">
          <Alert icon={<Info />}>Pega tu lista de SKUs y luego presiona <strong>Buscar</strong></Alert>

          <Text ta="center">👇</Text>

          <Textarea
            autosize
            minRows={10}
            value={value}
            onChange={(event) => setValue(event.currentTarget.value)}
          />

          <Button onClick={handleSubmit}>Buscar</Button>

          <Stack gap={0} mt="lg">
            <Button variant="subtle" size="xs" onClick={() => handleTest(1)}>
              <Group gap={6}>
                <Text inherit>Probar 1 SKU de ejemplo</Text>
                <Copy size={14} />
              </Group>
            </Button>

            <Button variant="subtle" size="xs" onClick={() => handleTest(5)}>
              <Group gap={6}>
                <Text inherit>Probar 5 SKUs de ejemplo</Text>
                <Copy size={14} />
              </Group>
            </Button>

            <Button variant="subtle" size="xs" onClick={() => handleTest(10)}>
              <Group gap={6}>
                <Text inherit>Probar 10 SKUs de ejemplo</Text>
                <Copy size={14} />
              </Group>
            </Button>
          </Stack>
        </Stack>
      </Center>
    </Container>
  )
}
