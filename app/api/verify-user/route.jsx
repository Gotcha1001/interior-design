
import { db } from "@/config/db"
import { Users } from "@/config/schema"
import { eq } from "drizzle-orm"
import { NextResponse } from "next/server"

export async function POST(req) {
    const { user } = await req.json()

    try {

        // If user Already Exists
        const userInfo = await db.select().from(Users)
            .where(eq(Users.email, user?.primaryEmailAddress.emailAddress))
        console.log("User:", userInfo)

        //If not add new user to data base 
        if (userInfo?.length == 0) {
            const SaveResult = await db.insert(Users)
                .values({
                    name: user?.fullName,
                    email: user?.primaryEmailAddress.emailAddress,
                    imageUrl: user?.imageUrl,
                }).returning({ Users })

            return NextResponse.json({ 'result': SaveResult[0].Users })
        }
        return NextResponse.json({ 'result': userInfo[0] })

    } catch (error) {
        return NextResponse.json({ error: error })
    }
}