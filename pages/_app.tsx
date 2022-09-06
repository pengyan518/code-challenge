import '../styles/globals.css'
import '../styles/application.scss'
import type { AppProps } from 'next/app'
import {MainContext} from '../contexts/MainContext'

function MyApp({ Component, pageProps }: AppProps) {
  return  <MainContext><Component {...pageProps} /></MainContext>
}

export default MyApp
