import React from 'react'
import { MoveLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'


type headerProps = {
    heading?: string,
    back?: boolean

}

const Header: React.FC<headerProps> = ({ heading = "Heading", back }) => {
    const Navigate = useNavigate()

    return (
        <div className="pb-4 mb-6 border-b border-gray-200 flex items-center  gap-5">
            {
                back &&
                <span className='text-sm cursor-pointer hover:opacity-90'
                    onClick={() => Navigate(-1)}
                >
                    <MoveLeft
                        className='font-extrabold'
                    />
                </span>
            }
            <div className="text-2xl font-bold text-gray-700">{heading}</div>
        </div>
    )
}

export default Header