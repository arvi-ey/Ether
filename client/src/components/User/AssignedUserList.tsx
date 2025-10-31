import React from 'react'



type userType = {
    _id: string,
    name: string,
    email: string,
    role: string,
    profileImage: string,
    roleForTask: string
}

type Props = {
    data: userType,
    index?: number
}

const AssignedUserList: React.FC<Props> = ({ data, index = 0 }) => {
    return (
        <div
            key={data._id}
            style={{ zIndex: index + 10 }}
            className=''
        >
            {data?.profileImage ? (
                <div className="size-10 rounded-full overflow-hidden border-2 border-white">
                    <img
                        src={data?.profileImage}
                        alt={data?.name}
                        className="w-full h-full object-cover rounded-full"
                    />
                </div>
            ) : (
                <div className="size-10 rounded-full bg-primary flex justify-center items-center border-2 border-white">
                    <span className="text-lg text-white font-semibold">
                        {data?.name?.charAt(0)}
                    </span>
                </div>
            )}
        </div>
    )
}

export default AssignedUserList