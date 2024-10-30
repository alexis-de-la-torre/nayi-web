"use client"

import {createContext, useState} from "react"
import {MantineProvider, createTheme, rem} from '@mantine/core';
import {Inter} from 'next/font/google'

const inter = Inter({subsets: ['latin']})

const theme = createTheme({
  fontFamily: inter.style.fontFamily,

  lineHeights: {
    xs: '1.25',
    sm: '1.35',
    md: '1.35',
    lg: '1.55',
    xl: '1.60',
  },

  headings: {
    sizes: {
      h1: { lineHeight: "1.1" },
      h2: { lineHeight: "1.1" },
    }
  }
})

export const Context = createContext({})

export function Providers({children}) {
  const [skus, setSkus] = useState([])
  const [products, setProducts] = useState([])

  return (
    <Context.Provider value={{skus, setSkus, products, setProducts}}>
      <MantineProvider theme={theme}>
          {children}
      </MantineProvider>
    </Context.Provider>
  )
}

