import React, { useState } from 'react';
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from '@/components/ui/button';
import ReactBeforeSliderComponent from 'react-before-after-slider-component';
import 'react-before-after-slider-component/dist/build.css';

// AiOutputDialog Component
const AiOutputDialog = ({ openDialog, closeDialog, orgImage, aiImage }) => {
    // Stop propagation to prevent the click from reaching parent elements
    const handleClose = (e) => {
        e.stopPropagation();  // Prevent event from bubbling up
        closeDialog(false);
    };

    return (
        <AlertDialog open={openDialog}>
            <AlertDialogContent onClick={e => e.stopPropagation()}>  {/* Stop clicks inside dialog from bubbling */}
                <AlertDialogHeader>
                    <AlertDialogTitle>Result:</AlertDialogTitle>
                    <ReactBeforeSliderComponent
                        firstImage={{
                            imageUrl: aiImage
                        }}
                        secondImage={{
                            imageUrl: orgImage
                        }}
                    />
                    <Button onClick={handleClose}>Close</Button>
                </AlertDialogHeader>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default AiOutputDialog