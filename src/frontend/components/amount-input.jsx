import React, { useState } from 'react';

export function AmountInput() {

    const [value, setValue] = useState(1);


    const incrementValue = () => {
        if (value < 100) {
            setValue(value + 1);
        }
    };


    const decrementValue = () => {
        if (value > 1) {
            setValue(value - 1);
        }
    };

    return (
        <div className='bg-neutral-50 outline outline-1 outline-gray-300 rounded-lg max-w-fit flex items-center justify-center px-2'>
            <button className="flex items-center justify-center" onClick={decrementValue}>
                <span className="material-icons-round">remove</span>
            </button>
            <input 
                type="number"
                min={1}
                max={100}
                value={value}
                onChange={(e) => setValue(Number(e.target.value))}
                className="outline-none text-center flex-1 appearance-none font-e-ukraine text-xs bg-gray-50"
            />
            <button className="flex items-center justify-center" onClick={incrementValue}>
                <span className="material-icons-round">add</span>
            </button>
        </div>
    );
}