import React, { useState } from 'react'



// Define the shape of the data prop
interface StatusData {
    label: string;
    value: string;
    color: string
}

interface StatusBarProps {
    data: StatusData;
    index: number;
    HandleSelectStatusbar: (value: string) => void;
    statusbar: string;
}
const StatusBar: React.FC<StatusBarProps> = ({ data, index, HandleSelectStatusbar, statusbar }) => {


    return (
        <div className={`cursor-pointer font-semibold hover:text-primary ${statusbar == data.value ? "text-primary" : "text-black"
            } `}
            key={index}

            onClick={() => HandleSelectStatusbar(data.value)}
        >
            <span>{data?.label}</span>
        </div>
    )
}

export default StatusBar