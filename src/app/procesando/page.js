"use client"

import {useContext, useState} from "react"
import {Context} from "@/app/providers"
import {fetchScrappedProduct} from "@/http/recepcion"
import useSWR from "swr"
import {Box, Center, Group, Loader, Progress, Stack, Text, Title} from "@mantine/core"
import {useCounter} from "@mantine/hooks"
import {useRouter} from "next/navigation"

export default function SKUs() {
  const {skus, setProducts} = useContext(Context)
  const [completed, {increment}] = useCounter(0)
  const [current, setCurrent] = useState("")

  const router = useRouter()

  const {data, error, trigger} =
    useSWR(skus, async () => {
      // setTest("before")

      let acc = []

      for (const sku of skus) {
        setCurrent(sku)
        const product = await fetchScrappedProduct(sku)
        acc.push(product)
        increment()
      }

      setProducts(acc)

      router.push("/productos")

      return acc
    })

  return (
    <Stack h="100svh" p="xl">
      <Box flex={1}/>

      <Title>Recopilando datos de productos en inmeza.com</Title>

      <Group c="gray.7" gap="xs">
        <Text>{completed} de {skus.length}</Text>
        <Text>•</Text>
        <Text>{current}</Text>
      </Group>

      <Group w="100%">
        <Progress value={completed / skus.length * 100} flex={1} />
      </Group>
    </Stack>
  )
}
