import React from 'react'
import Navbar from './Navbar/Navbar'
import Footer from './Footer/Footer'
import FooterM from './Footer/FooterM'

const Layout = ({children}) => {
  return (
   <>
    <div className='bg-main text-white'>
    <Navbar></Navbar>
    {children}
    <Footer></Footer>
    <FooterM></FooterM>
    </div>
   </>
  ) 
}

export default Layout