import React from 'react'
import Header from './components/Header'
import { Container } from 'react-bootstrap'
import { Outlet } from 'react-router-dom'
import Footer from './components/Footer'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
<<<<<<< HEAD
=======
import './assets/styles/bootsrap-custom.css';
>>>>>>> 0032a5bf4b20ad41ea3c31cd86161952a7f4727b

const App = () => {
  return (
    <>
    <Header/>
    <main className='py-3'>
    <Container>
      <Outlet/>
    <h1>
<<<<<<< HEAD
      Dobro dosli u Skriptarnicu FTN!
    </h1>
=======
      Welcome to Wearify
    </h1>
    <p>
      Shopping made easy and enjoyable!
    </p>
>>>>>>> 0032a5bf4b20ad41ea3c31cd86161952a7f4727b
    </Container>
    </main>
    <Footer/>
    <ToastContainer />
    </>
  )
}

export default App
