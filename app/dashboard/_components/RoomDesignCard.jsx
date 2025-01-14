import React, { useState } from 'react'
import ReactBeforeSliderComponent from 'react-before-after-slider-component';
import 'react-before-after-slider-component/dist/build.css';
import AiOutputDialog from './AiOutputDialog';

const RoomDesignCard = ({ room }) => {
    const [openDialog, setOpenDialog] = useState(false);

    const onClickHandler = () => {
        setOpenDialog(true);
    };

    return (
        <div
            className="gradient-background2 rounded-xl cursor-pointer"
            onClick={onClickHandler}
        >
            <ReactBeforeSliderComponent
                firstImage={{
                    imageUrl: room.aiImage
                }}
                secondImage={{
                    imageUrl: room.orgImage
                }}
            />
            <div className="p-2">
                <h2 className="text-white text-xs">
                    Room Type: <span className="text-indigo-500">{room.roomType}</span>
                </h2>
                <h2 className="text-white text-xs">
                    Design Type: <span className="text-indigo-500">{room.designType}</span>
                </h2>
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

export default RoomDesignCard