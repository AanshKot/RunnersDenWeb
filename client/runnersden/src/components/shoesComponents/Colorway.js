import React, { useState } from 'react'

export default function Colorway({colorsHash,handleClick,selectedColor, model}) {
    
    const colorwayButtons = [];

    colorsHash = JSON.parse(colorsHash);

    for (const key in colorsHash){

        colorwayButtons.push(<button className={selectedColor === key ? "selectedColor " + key : key} style={{ color:{key},borderRadius:"50%"}} onClick={() => handleClick(model,colorsHash[key],key)}></button>);
    }

    return (
        <div className='colorway'>
            {colorwayButtons}
        </div>
    )
}
