"use client"
import { useUser } from '@clerk/nextjs'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { UserDetailContext } from "./_context/UserDetailContext"
import Header from './dashboard/_components/Header'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'

function Provider({ children }) {
    const currentYear = new Date().getFullYear();

    const { user } = useUser()

    const [userDetail, setUserDetail] = useState([])

    useEffect(() => {
        user && VerifyUser()
    }, [user])

    const VerifyUser = async () => {
        const dataResult = await axios.post('/api/verify-user', {
            user: user
        })
        setUserDetail(dataResult.data.result)


    }

    return (
        <UserDetailContext.Provider value={{ userDetail, setUserDetail }} >
            <PayPalScriptProvider options={{ clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID }}>
                <Header />
                <div>{children}</div>
                <footer className="relative z-10 bg-indigo-300 py-10 bg-opacity-10 gradient-background2 p-10">
                    <div className="mx-auto px-4 text-center text-gray-200">
                        <p>© {currentYear} CodeNow101. All Rights Reserved</p>
                    </div>
                </footer>
            </PayPalScriptProvider>
        </UserDetailContext.Provider>

    )
}

export default Provider