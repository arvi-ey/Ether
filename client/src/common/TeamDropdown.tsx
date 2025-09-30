import React, { useState, useRef, useEffect } from 'react';

type Option = {
    name: string;
    email: string;
    role: string;
    profileImage: string;
    _id: string
};

type DropDownProps = {
    style?: string;
    name?: string;
    value: string | number | undefined;
    options?: any[];
    placeholder?: string;
    setdropDownValue?: (value: string) => void;
};

const Dropdown: React.FC<DropDownProps> = ({
    style,
    value,
    name,
    placeholder,
    options = [],
    setdropDownValue,
}) => {
    const [showDropDown, setShowDropDown] = useState(false);
    const [openUpwards, setOpenUpwards] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);


    const handleFocus = () => {
        if (inputRef.current) {
            const rect = inputRef.current.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            const dropdownHeight = Math.min(options.length * 48, 200);
            setOpenUpwards(viewportHeight - rect.bottom < dropdownHeight);
        }
        setShowDropDown(true);
    };



    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(event.target as Node)
            ) {
                setShowDropDown(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelectDropDownValue = (val: string, name: string) => {
        setdropDownValue?.(val);
        setShowDropDown(false);
    };

    return (
        <div className="relative w-full" ref={containerRef}>
            <input
                ref={inputRef}
                className={`${style}  outline-none cursor-pointer`}
                name={name}
                value={options.find(u => u._id == value)?.name}
                placeholder={placeholder}
                onFocus={handleFocus}
                readOnly
            />
            {showDropDown && options.length > 0 && (
                <div
                    className="absolute w-full overflow-auto p-2 bg-white shadow-lg rounded-lg z-50"
                    style={{
                        maxHeight: 200,
                        top: openUpwards ? undefined : '100%',
                        bottom: openUpwards ? '100%' : undefined,
                        marginTop: openUpwards ? undefined : 4,
                        marginBottom: openUpwards ? 4 : undefined,
                    }}
                >
                    {options.map((data, index) => (
                        <div
                            key={index}
                            onMouseDown={() => handleSelectDropDownValue(data._id, data.name)}
                            className="flex gap-2  p-2 hover:bg-hoverBg gap-1 mt-1 cursor-pointer"
                        >
                            <div>
                                <img src={data?.profileImage} alt='userImage' className='size-10 rounded-full' />
                            </div>
                            <div className='flex flex-col'>
                                <span className="font-semibold text-sm">{data.name}</span>
                                <span className="opacity-80 text-sm">{data.email}</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Dropdown;
