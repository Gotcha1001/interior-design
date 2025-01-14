import React, { useState } from 'react'
import FeatureMotionWrapper from '@/app/_components/MotionStuff/FeatureMotionWrapperMap'
import Image from 'next/image'

function DesignType({ selectedDesignType }) {

    const Designs = [
        {
            name: 'Modern',
            image: '/modern.jpg',
        },
        {
            name: 'Industrial',
            image: '/industrial.jpg',
        },
        {
            name: 'Bohemian',
            image: '/bohemian.jpg',
        },
        {
            name: 'Traditional',
            image: '/traditional.jpg',
        },
        {
            name: 'Rustic',
            image: '/rustic.jpg',
        },
        {
            name: 'Minimalyst',
            image: '/minamalyst.jpg',
        },
        {
            name: 'Gothic',
            image: '/gothic.jpg',
        },
        {
            name: 'Punk',
            image: '/punk.jpg',
        },
    ]

    const [selectedOption, setSelectedOption] = useState()

    return (
        <div className='mt-5'>
            <label className='text-gray-200'>Select Interior Design Type</label>
            <div className='mt-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
                {Designs.map((design, index) => (
                    <FeatureMotionWrapper key={index} index={index}>

                        <div
                            className='flex flex-col items-center'
                            onClick={() => { setSelectedOption(design.name); selectedDesignType(design.name) }} >
                            <Image src={design.image} alt='Room' width={100} height={100} className={`h-[70px] rounded-lg hover:scale-125 transition-all cursor-pointer ${design.name == selectedOption && 'border-2 border-indigo-500 p-1'}`} />
                            <h2 className='text-yellow-500 '>{design.name}</h2>
                        </div>
                    </FeatureMotionWrapper>
                ))}
            </div>
        </div>
    )
}

export default DesignType