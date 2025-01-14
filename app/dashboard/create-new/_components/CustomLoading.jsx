import React from 'react'
import {
    AlertDialog,
    AlertDialogContent,

} from "@/components/ui/alert-dialog"
import Image from 'next/image'


function CustomLoading({ loading, orgImage, aiImage }) {
    return (
        <AlertDialog open={loading}>
            <AlertDialogContent>
                <div className='gradient-background2 p-4 rounded-lg flex flex-col items-center my-10 justify-center'>
                    <Image src={'/loading.gif'} alt='Loading' height={500} width={500} />
                    <h2 className='text-indigo-600'>Redesigning Your Room....Dont Refresh</h2>
                </div>
            </AlertDialogContent>
        </AlertDialog>

    )
}

export default CustomLoading