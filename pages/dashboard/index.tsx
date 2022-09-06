import type {NextPage} from 'next'
import Head from 'next/head'
import {Drawer} from '../../search/Drawer'
import {Dashboard} from '../../dashboard/Dashboard'
import {Header} from '../../templates/Header'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <main className="mainHome__body main mx-auto">
          <Header />
          <Dashboard />
        </main>
        <Drawer />
    </div>
  )
}

export default Home
