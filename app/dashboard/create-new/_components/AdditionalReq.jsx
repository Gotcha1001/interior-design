import React from 'react'
import { Textarea } from "@/components/ui/textarea"


function AdditionalReq({ additionalRequirementInput }) {
    return (
        <div className='mt-5'>
            <label className='text-white text-sm'>Enter Additional Requirements (Optional)</label>
            <Textarea
                onChange={(e) => additionalRequirementInput(e.target.value)}
                className='mt-2'
            />
        </div>
    )
}

export default AdditionalReq