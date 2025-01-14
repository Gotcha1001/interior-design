"use client"
import React, { useContext, useState } from 'react'
import ImageSelection from "./_components/ImageSelection"
import MotionWrapperDelay from '@/app/_components/MotionStuff/MotionWrapperDelay'
import RoomType from './_components/RoomType'
import DesignType from './_components/DesignType'
import AdditionalReq from './_components/AdditionalReq'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { storage } from "@/config/FirebaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useUser } from '@clerk/nextjs'
import CustomLoading from './_components/CustomLoading'
import AiOutputDialog from '../_components/AiOutputDialog'
import { db } from '@/config/db'
import { UserDetailContext } from '@/app/_context/UserDetailContext'
import { Users } from '@/config/schema'
import { eq } from 'drizzle-orm'



function CreateNew() {

    const [formData, setFormData] = useState([])
    const { user } = useUser()

    const [loading, setLoading] = useState(false)
    const [aiOutputImage, setAiOutputImage] = useState()
    const [openOutputDialog, setOpenOutputDialog] = useState(false)
    const [orgImage, setOrgImage] = useState()


    const { userDetail, setUserDetail } = useContext(UserDetailContext)

    // const [outputResult, setOutputResult] = useState()

    const onHandleInputChange = (value, fieldName) => {
        setFormData(prev => ({
            ...prev,
            [fieldName]: value
        }))
        console.log("FORMDATA:", formData)
    }

    const GeneratedAiImage = async () => {
        setLoading(true)
        const rawImageUrl = await SaveRawImageToFirebase()
        const result = await axios.post('/api/redesign-room', {
            imageUrl: rawImageUrl,
            roomType: formData?.roomType,
            designType: formData.designType,
            additionalReq: formData?.additionalReq,
            userEmail: user?.primaryEmailAddress?.emailAddress
        });
        console.log("RESULT FORMDATA:", result)
        await updateUserCredits()
        setAiOutputImage(result.data.result) //Output Image URL
        setOpenOutputDialog(true)

        setLoading(false)

    }

    const SaveRawImageToFirebase = async () => {
        //Save image to firebase 
        const fileName = Date.now() + "_raw.png";
        const imageRef = ref(storage, 'room-design/' + fileName);

        await uploadBytes(imageRef, formData.image).then(resp => {
            console.log("File Uploaded...")
        })

        // Uploaded File Image URL which we need to get 
        const downloadUrl = await getDownloadURL(imageRef)
        console.log(downloadUrl)
        setOrgImage(downloadUrl)
        return downloadUrl;
    }

    const updateUserCredits = async () => {
        const result = await db
            .update(Users)
            .set({
                credits: userDetail?.credits - 1
            })
            .where(eq(Users.email, user?.primaryEmailAddress?.emailAddress)) // Add this WHERE clause
            .returning({
                id: Users.id,
                credits: Users.credits,
                email: Users.email
            });

        if (result && result.length > 0) {
            setUserDetail(prev => ({
                ...prev,
                credits: userDetail?.credits - 1
            }));
            return result[0].id;
        }

        console.log("Credit update completed for user:", result[0].email, "New credits:", result[0].credits);
    };

    return (
        <div>
            <MotionWrapperDelay
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.7, delay: 0.7 }}
                variants={{
                    hidden: { opacity: 0, x: 100 },
                    visible: { opacity: 1, x: 0 },
                }}
            >
                <h2 className='gradient-title font-bold text-5xl text-center '>Experience The Magic Of AI Remodeling</h2>
            </MotionWrapperDelay>
            <p className='text-center text-slate-200'>Transform any room with a click, Select a space, choose a style, and watch as AI instantly reimagines your environment.</p>
            <div className='grid grid-cols-1 md:grid-cols-2  mt-10 gap-10 '>

                {/* Image Selection */}
                <ImageSelection selectedImage={(value) => onHandleInputChange(value, 'image')} />

                {/* Form Input Section */}
                <div>

                    {/*1 Room Type */}
                    <RoomType selectedRoomType={(value) => onHandleInputChange(value, 'roomType')} />

                    {/*2 Design Type */}
                    <DesignType selectedDesignType={(value) => onHandleInputChange(value, 'designType')} />

                    {/*3 Additional Requirement Text Area (optional) */}
                    <AdditionalReq additionalRequirementInput={(value) => onHandleInputChange(value, 'additionalReq')} />

                    {/*4 Button to Generate the Image */}
                    <Button
                        className='w-full mt-5'
                        onClick={GeneratedAiImage}
                    >Generate</Button>
                    <p className='text-xs text-center text-gray-400 mb-52'>NOTE: 1 Credit To Redesign Your Room</p>
                </div>
            </div>
            <CustomLoading loading={loading} />
            <AiOutputDialog openDialog={openOutputDialog} closeDialog={() => setOpenOutputDialog(false)}
                orgImage={orgImage}
                aiImage={aiOutputImage}
            />
        </div>
    )
}

export default CreateNew