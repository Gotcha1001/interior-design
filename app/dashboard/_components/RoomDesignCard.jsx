import React, { useState } from 'react';
import ReactBeforeSliderComponent from 'react-before-after-slider-component';
import 'react-before-after-slider-component/dist/build.css';
import AiOutputDialog from './AiOutputDialog';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const RoomDesignCard = ({ room }) => {
    const [openDialog, setOpenDialog] = useState(false);
    const shareUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}/room-design/${room.id}`;

    const onClickHandler = () => {
        setOpenDialog(true);
    };

    const copyToClipboard = async (e) => {
        e.stopPropagation(); // Prevent opening the dialog
        try {
            await navigator.clipboard.writeText(shareUrl);
            alert('Link copied to clipboard!');
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    return (
        <div className="relative">
            <div
                className="gradient-background2 rounded-xl cursor-pointer"
                onClick={onClickHandler}
            >
                <ReactBeforeSliderComponent
                    firstImage={{
                        imageUrl: room.aiImage,
                    }}
                    secondImage={{
                        imageUrl: room.orgImage,
                    }}
                />
                <div className="p-2">
                    <h2 className="text-white text-xs">
                        Room Type: <span className="text-indigo-500">{room.roomType}</span>
                    </h2>
                    <h2 className="text-white text-xs">
                        Design Type: <span className="text-indigo-500">{room.designType}</span>
                    </h2>
                    <div className="mt-2 flex justify-end gap-2">
                        <Button
                            variant="sex1"
                            size="sm"
                            onClick={copyToClipboard}
                            className="z-10"
                        >
                            Share Design
                        </Button>
                        <Link href={`/room-design/${room.id}`}>
                            <Button variant="sex" size="sm" className="z-10">
                                View Details
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>

            <AiOutputDialog
                aiImage={room.aiImage}
                orgImage={room.orgImage}
                openDialog={openDialog}
                closeDialog={setOpenDialog}
            />
        </div>
    );
};

export default RoomDesignCard;
