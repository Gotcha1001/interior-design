import { Button } from '@/components/ui/button'

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function EmptyState() {
    return (
        <div className='flex items-center justify-center mt-10 flex-col'>
            <Image
                className='rounded-lg border-2 p-2 border-indigo-600 hover:scale-105 transition-all'
                src={'/RoomAi2.jpg'} alt='Room' height={400} width={400} />
            <h2 className='mt-4 font-medium text-xl text-indigo-200 '>Create New AI Interior Design For Your Room</h2>
            <Link href="/dashboard/create-new">
                <Button className='mt-5 mb-20'>+ Redesign Room</Button>
            </Link>

        </div>
    )
}

export default EmptyState