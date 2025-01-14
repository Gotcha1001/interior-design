"use client"
import Image from 'next/image'
import React, { useState } from 'react'

function ImageSelection({ selectedImage }) {

    const [file, setFile] = useState()


    const onFileSelected = (event) => {
        console.log(event.target.files[0])
        setFile(event.target.files[0])
        selectedImage(event.target.files[0])
    }

    return (
        <div>
            <label className='text-lg text-yellow-400'>Select Image Of Your Room</label>
            <div className='mt-3'>
                <label htmlFor="upload-image">
                    <div className={`p-28 border rounded-xl border-dotted flex justify-center border-indigo-600 bg-slate-200 cursor-pointer hover:opacity-50
                        ${file && 'p-0 hover:opacity-100 bg-white'}
                        `}>
                        {!file ? <Image
                            className='rounded-xl'
                            src={'/upload.jpg'} alt='Image Upload' height={200} width={200} />
                            : <Image
                                src={URL.createObjectURL(file)}
                                alt='Room Image'
                                width={300}
                                height={300}
                                className='w-[300px] h-[300px] object-contain'
                            />
                        }

                    </div>
                </label>
                <input
                    onChange={onFileSelected}
                    type="file" accept='image/*'
                    id="upload-image"
                    style={{ display: 'none' }} />
            </div>
        </div>
    )
}

export default ImageSelection