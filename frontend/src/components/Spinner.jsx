import React from 'react';

const Spinner = () => {
    return (
        <div className='fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center    '>
            <div className='animate-ping w-16 h-16 m-8 rounded-full bg-sky-400'></div>
        </div>
    );
};

export default Spinner;
