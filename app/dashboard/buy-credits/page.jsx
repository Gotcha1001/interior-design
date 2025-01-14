"use client"
import { UserDetailContext } from "@/app/_context/UserDetailContext"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useContext, useState } from "react"
import { toast } from "react-toastify"

function BuyCredits() {
    const creditsOption = [
        {
            credits: 5,
            amount: 29.99  // Changed to ZAR
        },
        {
            credits: 10,
            amount: 44.99  // Changed to ZAR
        },
        {
            credits: 25,
            amount: 89.99  // Changed to ZAR
        },
        {
            credits: 50,
            amount: 149.99  // Changed to ZAR
        },
    ]

    const [selectedOption, setSelectedOption] = useState(null)
    const { userDetail } = useContext(UserDetailContext)
    const router = useRouter()

    const initiatePayment = async () => {
        if (!selectedOption) {
            toast.error("Please select a credit package")
            return
        }

        try {
            const response = await fetch("/api/create-payment", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    amount: selectedOption.amount,
                    credits: selectedOption.credits,
                    userEmail: userDetail.email,
                    itemName: `${selectedOption.credits} AI Design Credits`
                }),
            })

            if (!response.ok) {
                toast.error("Failed to initiate payment")
                return
            }

            const data = await response.json()
            if (data.url) {
                window.location.href = data.url
            } else {
                toast.error("Failed to initiate payment")
            }
        } catch (error) {
            toast.error("Error initiating payment")
            console.error(error)
        }
    }

    return (
        <div className="relative">
            <h2 className="font-bold text-4xl gradient-title text-center">Buy More Credits</h2>
            <p className="text-white text-center mt-5">Unlock Endless Possibilities: Buy More Credits And Transform Your House Today With Fantastic Inspirational AI Ideas</p>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-5 mt-10">
                {creditsOption.map((item, index) => {
                    return (
                        <div
                            key={index}
                            className={`flex flex-col gap-2 justify-center items-center ${selectedOption?.credits === item.credits ? 'border-indigo-600 p-1' : ''
                                }`}
                        >
                            <h2 className="font-bold text-3xl text-yellow-500">{item.credits}</h2>
                            <h2 className="font-medium text-xl text-white">Credits</h2>
                            <Button
                                className="w-full"
                                onClick={() => setSelectedOption(item)}
                            >
                                Select
                            </Button>
                            <h2 className="font-bold text-yellow-500 mb-4">R{item.amount}</h2>
                        </div>
                    )
                })}
            </div>

            <div className="mt-20 flex justify-center">
                {selectedOption?.amount && (
                    <Button
                        className="w-full md:w-1/2 lg:w-1/3 p-6 bg-green-600 hover:bg-green-700 text-white font-bold"
                        onClick={initiatePayment}
                    >
                        Pay with PayFast
                    </Button>
                )}
            </div>

            {/* Before and After Images Section */}
            <div className="mt-10 flex flex-col items-center space-y-6 md:flex-row md:space-x-6 md:space-y-0 md:justify-center mb-10">
                {/* Before Image */}
                <div className="flex flex-col items-center">
                    <h3 className="font-semibold text-xl text-white mb-2">Before</h3>
                    <Image
                        className="hover:scale-105 transition-all rounded-lg border-2 border-indigo-500"
                        src="/before.jpg"
                        alt="Before"
                        width={500}
                        height={500}
                    />
                </div>

                {/* After Image */}
                <div className="flex flex-col items-center">
                    <h3 className="font-semibold text-xl text-white mb-2">After</h3>
                    <Image
                        className="hover:scale-105 transition-all rounded-lg border-2 border-indigo-500"
                        src="/after.jpg"
                        alt="After"
                        width={500}
                        height={500}
                    />
                </div>
            </div>
        </div>
    )
}

export default BuyCredits