"use client"
import { Button } from '@/components/ui/button'
import { useUser } from '@clerk/nextjs'
import React, { useEffect, useState } from 'react'
import EmptyState from "./_components/EmptyState"
import Link from 'next/link'
import { db } from '@/config/db'
import { AiGeneratedImage } from '@/config/schema'
import { eq } from 'drizzle-orm'
import RoomDesignCard from './_components/RoomDesignCard'
import FeatureMotionWrapper from '../_components/MotionStuff/FeatureMotionWrapperMap'

function Listing() {

    const { user } = useUser()
    const [userRoomList, setUserRoomList] = useState([])

    useEffect(() => {
        user && GetUserRoomList()
    }, [user])

    const GetUserRoomList = async () => {
        const result = await db.select().from(AiGeneratedImage)
            .where(eq(AiGeneratedImage.userEmail, user?.primaryEmailAddress?.emailAddress))


        setUserRoomList(result)
        console.log("Users Rooms,", result)
    }

    return (
        <div>
            <div className='flex gap-2 items-center justify-between'>
                <h2 className='font-bold text-4xl gradient-title '>Hello, {user?.fullName}</h2>
                <Link href="/dashboard/create-new">
                    <Button>Redesign Room</Button>
                </Link>
            </div>


            {userRoomList?.length == 0 ?

                < EmptyState />
                :
                <div className='mt-10'>
                    <h2 className='text-yellow-400  font-bold text-2xl mb-10 p-1 rounded-lg text-center border-2 border-indigo-600 hover:scale-105 transition-all hover:bg-indigo-600'>AI Room Studio</h2>
                    {/* Listing */}
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-96'>
                        {userRoomList.map((room, index) => (
                            <FeatureMotionWrapper key={index} index={index}>
                                <RoomDesignCard room={room} />
                            </FeatureMotionWrapper>
                        ))}
                    </div>
                </div>
            }

        </div>
    )
}

export default Listing