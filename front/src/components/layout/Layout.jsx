import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../footer/index'
import Navbar from '../navbar/index'
import { FooterSpace } from '../common/commonStyles'
import EmailAlert from '../emailAlert/EmailAlert.container'

const Layout = () => {
  return (
    <>
        <EmailAlert />
        <Navbar />
        <main>
            <Outlet />
        </main>
        <FooterSpace />
        <Footer />
    </>
  )
}

export default Layout