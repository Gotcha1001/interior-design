"use client"

import { UserDetailContext } from "@/app/_context/UserDetailContext"
import { Button } from "@/components/ui/button"
import { db } from "@/config/db"
import { Users } from "@/config/schema"
import { PayPalButtons } from "@paypal/react-paypal-js"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useContext, useState } from "react"



function BuyCredits() {
    const creditsOption = [
        {
            credits: 5,
            amount: 0.99
        },
        {
            credits: 10,
            amount: 1.99
        },
        {
            credits: 25,
            amount: 3.99
        },
        {
            credits: 50,
            amount: 6.99
        },
    ]

    const [selectedOption, setSelectedOption] = useState(null)
    const { userDetail, setUserDetail } = useContext(UserDetailContext)
    const router = useRouter()

    const onPaymentSuccess = async () => {
        console.log("Payment Success....")
        //Update User Credits In DB
        const result = await db.update(Users)
            .set({
                credits: userDetail?.credits + selectedOption?.credits
            }).returning({ id: Users.id })

        if (result) {
            setUserDetail(prev => ({
                ...prev,
                credits: userDetail?.credits + selectedOption?.credits

            }))
            router.push('/dashboard')
        }
    }

    return (
        <div className="relative">
            <h2 className="font-bold text-4xl gradient-title text-center">Buy More Credits</h2>
            <p className="text-white text-center mt-5">Unlock Endless Possibilities: Buy More Credits And Transform Your House Today With Fantastic Inspirational AI Ideas</p>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-5 mt-10">
                {creditsOption.map((item, index) => {
                    return ( // Add return here
                        <div key={index} className={`flex flex-col gap-2 justify-center items-center ${selectedOption?.credits === item.credits ? 'border-indigo-600 p-1' : ''}`}>
                            <h2 className="font-bold text-3xl text-yellow-500">{item.credits}</h2>
                            <h2 className="font-medium text-xl text-white">Credits</h2>
                            <Button className="w-full" onClick={() => setSelectedOption(item)}>
                                Select
                            </Button>
                            <h2 className="font-bold text-yellow-500 mb-4">R{item.amount}</h2>
                        </div>
                    )
                })}
            </div>

            {/* paypal options */}
            <div className="mt-20">
                {selectedOption?.amount &&
                    <PayPalButtons style={{ layout: "horizontal" }}
                        onApprove={() => onPaymentSuccess()}
                        onCancel={() => console.log("Payment Cancel")}
                        createOrder={(data, actions) => {
                            return actions?.order.create({
                                purchase_units: [
                                    {
                                        amount: {
                                            value: selectedOption?.amount?.toFixed(2),
                                            currency_code: 'USD'
                                        }
                                    }
                                ]
                            })
                        }}
                    />}
            </div>

            {/* Before and After Images Section */}
            <div className="mt-10 flex flex-col items-center space-y-6 md:flex-row md:space-x-6 md:space-y-0 md:justify-center mb-10">
                {/* Before Image */}
                <div className="flex flex-col items-center">
                    <h3 className="font-semibold text-xl text-white mb-2">Before</h3>
                    <Image
                        className="hover:scale-105 transition-all rounded-lg border-2 border-indigo-500"
                        src="/before.jpg" alt="Before" width={500} height={500} />
                </div>

                {/* After Image */}
                <div className="flex flex-col items-center">
                    <h3 className="font-semibold text-xl text-white mb-2">After</h3>
                    <Image
                        className="hover:scale-105 transition-all rounded-lg border-2 border-indigo-500"
                        src="/after.jpg" alt="After" width={500} height={500} />
                </div>
            </div>
        </div>
    )
}

export default BuyCredits
