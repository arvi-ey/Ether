import React, { useEffect, useRef, useState } from 'react'



type Option = {
    label: string;
    value: string;
    color: string
};


type DropDownProps = {
    style?: string;
    name?: string;
    value: string | number | undefined;
    options: Option[];
    placeholder?: string;
    setdropDownValue?: (value: string) => void;
    show?: boolean
};

const StatusDropDown: React.FC<DropDownProps> = ({ style, name, value, options, placeholder, setdropDownValue, show = false }) => {
    const [showDropDown, setShowDropDown] = useState(show);
    const [openUpwards, setOpenUpwards] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleFocus = () => {
        if (inputRef.current) {
            const rect = inputRef.current.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            const dropdownHeight = Math.min(options?.length * 48, 200);
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

    const handleSelectDropDownValue = (val: string) => {
        setdropDownValue?.(val);
        setShowDropDown(false);
    };


    return (
        <div className="relative w-full" ref={containerRef}>
            <input
                ref={inputRef}
                className={`${style}  outline-none cursor-pointer`}
                name={name}
                value={value}
                placeholder={placeholder}
                onFocus={handleFocus}
                readOnly
            />
            {showDropDown && options && options.length > 0 && (
                <div
                    className="absolute w-full flex flex-col overflow-auto p-2 gap-1 bg-white shadow-lg rounded-lg z-50"
                    style={{
                        maxHeight: 200,
                        top: openUpwards ? undefined : '100%',
                        bottom: openUpwards ? '100%' : undefined,
                        marginTop: openUpwards ? undefined : 4,
                        marginBottom: openUpwards ? 4 : undefined,
                    }}
                >
                    {options && options.map((data, index) => (
                        <div className='flex p-2  cursor-pointer hover:bg-hoverBg '
                            key={index}
                            onClick={() => handleSelectDropDownValue(data.value)}
                        >
                            <span
                                className={`p-1 rounded-sm font-semibold w-auto px-3 ${index == 0 ? "bg-amber-400" : index == 1 ? "bg-blue-400" : "bg-green-400"} text-sm text-center`}
                            >{data.label}</span>
                        </div>

                    ))}
                </div>
            )}
        </div>
    )
}

export default StatusDropDown