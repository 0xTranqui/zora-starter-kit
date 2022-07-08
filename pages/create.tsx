import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'

const Create: NextPage = () => {
  return (
    <div className='flex flex-col justify-center h-screen min-h-screen'>
      <Header />
      <main className="flex flex-col items-center">        
        <h1 className="text-white">
          {'<<< CREATE >>>'}
        </h1>
      </main>
    </div>
  )
}

export default Create
