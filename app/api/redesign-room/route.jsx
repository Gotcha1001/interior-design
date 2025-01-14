import { db } from "@/config/db";
import { storage } from "@/config/FirebaseConfig";
import { AiGeneratedImage } from "@/config/schema";
import { useUser } from "@clerk/nextjs";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { NextResponse } from "next/server";
import Replicate from "replicate";
import axios from "axios";

const replicate = new Replicate({
    auth: process.env.NEXT_PUBLIC_REPLICATE_API_TOKEN
});

export async function POST(req) {
    const { imageUrl, roomType, designType, additionalReq, userEmail } = await req.json();
    console.log("Step 1: Received request data:", { imageUrl, roomType, designType, additionalReq });

    // Convert Image to AI image
    try {
        const input = {
            image: imageUrl,
            prompt: 'A ' + roomType + ' with a ' + designType + ' style interior ' + additionalReq
        };

        // Uncomment the following line when using Replicate for live processing
        const output = await replicate.run("adirik/interior-design:76604baddc85b1b4616e1c6475eca080da339c8875bd4996705440484a6eac38", { input });

        //test url
        // const output = "https://replicate.delivery/xezq/JSqouO53HU68PxTQZUmehZfMRRO8jQvyqc8VB8yerq9S3YJoA/out.png";
        // console.log("Step 2: AI output URL:", output);

        // Convert Output URL to Base64 image
        const base64Image = await ConvertImageToBase64(output);
        console.log("Step 3: Base64 Image (first 100 characters):", base64Image.substring(0, 100));

        // Save Base64 to Firebase
        const fileName = Date.now() + '.png';
        const storageRef = ref(storage, 'room-design/' + fileName);
        await uploadString(storageRef, base64Image, 'data_url');
        const downloadUrl = await getDownloadURL(storageRef);
        console.log("Step 4: Firebase download URL:", downloadUrl);

        // Save All to Database
        const dbResult = await db.insert(AiGeneratedImage).values({
            roomType: roomType,
            designType: designType,
            orgImage: imageUrl,
            aiImage: downloadUrl,
            userEmail: userEmail
        }).returning({ id: AiGeneratedImage.id });
        console.log("Step 5: DB Insert Result:", dbResult);

        return NextResponse.json({ 'result': downloadUrl });

    } catch (e) {
        console.error("Error occurred:", e);
        return NextResponse.json({ error: e.message, stack: e.stack });
    }
}

async function ConvertImageToBase64(imageUrl) {
    try {
        const resp = await axios.get(imageUrl, { responseType: 'arraybuffer' });
        const base64ImageRaw = Buffer.from(resp.data).toString('base64');
        return "data:image/png;base64," + base64ImageRaw;
    } catch (error) {
        console.error("Error converting image to Base64:", error);
        throw error;
    }
}
