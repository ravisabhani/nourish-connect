import React from 'react'
import '../index.css'
import { Donate } from '../component/User/Donate'
import { Header } from '../component/User/Header'
import { Work } from '../component/User/Work'
import { Mission } from '../component/User/Mission'
import { Vision } from '../component/User/Vision'
import { Contact } from '../component/User/Contact'
import { Testimonials } from '../component/User/Testimonial'
import {Footer} from '../component/User/Footer'

export const Home = () => {
    return (
        <>
            <Header />
            <Donate />
            <Work />
            <Mission />
            <Vision />
            <Contact />
            <Testimonials/>
            <Footer/>
        </>
    )
}


