// app/room-design/[id]/page.js
"use client"
import { useEffect, useState } from 'react';
import { db } from '@/config/db';
import { AiGeneratedImage } from '@/config/schema';
import { eq } from 'drizzle-orm';
import ReactBeforeSliderComponent from 'react-before-after-slider-component';
import 'react-before-after-slider-component/dist/build.css';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const SharedRoomDesign = ({ params }) => {
    const [design, setDesign] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDesign = async () => {
            try {
                const result = await db
                    .select()
                    .from(AiGeneratedImage)
                    .where(eq(AiGeneratedImage.id, parseInt(params.id)))
                    .limit(1);

                if (result.length > 0) {
                    setDesign(result[0]);
                }
            } catch (error) {
                console.error('Error fetching design:', error);
            } finally {
                setLoading(false);
            }
        };

        if (params.id) {
            fetchDesign();
        }
    }, [params.id]);

    if (loading) {
        return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
    }

    if (!design) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen gap-4">
                <h1 className="text-2xl font-bold">Design not found</h1>
                <Link href="/dashboard">
                    <Button>Return to Dashboard</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto">
                <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6 rounded-lg shadow-xl">
                    <h1 className="text-3xl font-bold text-white mb-6 text-center">Room Transformation</h1>

                    <div className="mb-6">
                        <ReactBeforeSliderComponent
                            firstImage={{
                                imageUrl: design.aiImage
                            }}
                            secondImage={{
                                imageUrl: design.orgImage
                            }}
                        />
                    </div>

                    <div className="bg-white bg-opacity-10 p-4 rounded-lg backdrop-blur-sm">
                        <div className="grid grid-cols-2 gap-4 text-white">
                            <div>
                                <h2 className="font-semibold">Room Type</h2>
                                <p className="text-indigo-200">{design.roomType}</p>
                            </div>
                            <div>
                                <h2 className="font-semibold">Design Style</h2>
                                <p className="text-indigo-200">{design.designType}</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 text-center">
                        <Link href="/dashboard">
                            <Button className="bg-white text-indigo-600 hover:bg-indigo-100">
                                Create Your Own Design
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SharedRoomDesign;