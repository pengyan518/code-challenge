import type {NextPage} from 'next'
import Head from 'next/head'
// import {MainContext} from '../contexts/MainContext'
import {MainHome} from '../components/templates/MainHome'
import {Drawer} from '../components/Search/Drawer'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainHome />
      <Drawer />
    </div>
  )
}

export default Home
