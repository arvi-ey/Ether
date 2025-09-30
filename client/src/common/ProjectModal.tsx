import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import { Input } from 'antd';

type ModalProps = {
    open: boolean;
    header?: string;
    handleClose?: () => void;
};

const ProjectModal: React.FC<ModalProps> = ({ open, header, handleClose }) => {
    const [openProjecttitle, setOpenProjectTitle] = useState<boolean>(false)




    return (
        <>
            <Modal
                title=""
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={open}
                onCancel={handleClose}
                footer={null}
                width="70%"
            >
                <div className='w-[90%] h-96'>
                    {
                        !openProjecttitle ?
                            <p className='font-bold text-2xl opacity-80 w-[100%] hover:bg-hoverBg p-2'
                                onClick={() => setOpenProjectTitle(true)}
                            >Your project name</p>
                            :
                            <input
                                placeholder='Your project name'
                                className="font-bold text-2xl opacity-80 w-full p-2 outline-none bg-transparent cursor-text"
                                autoFocus
                                onBlur={() => setOpenProjectTitle(false)}
                            />
                    }

                </div>
            </Modal >
        </>
    );
};

export default ProjectModal;