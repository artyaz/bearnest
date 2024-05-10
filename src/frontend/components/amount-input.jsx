import React, { useState } from 'react';

export function AmountInput({value, onChange}) {


    const incrementValue = () => {
        if (value < 100) {
            onChange(value + 1);
        }
    };


    const decrementValue = () => {
        if (value > 1) {
            onChange(value - 1);
        }
    };

    return (
        <div className='bg-white border border-1 border-zync-200 rounded-lg max-w-fit flex items-center justify-center px-2'>
            <button className="flex items-center justify-center" onClick={decrementValue}>
                <span className="material-icons-round">remove</span>
            </button>
            <input 
                type="number"
                min={1}
                max={100}
                value={value}
                onChange={(e) => setValue(Number(e.target.value))}
                className="outline-none text-center flex-1 appearance-none font-e-ukraine text-xs bg-white"
            />
            <button className="flex items-center justify-center" onClick={incrementValue}>
                <span className="material-icons-round">add</span>
            </button>
        </div>
    );
}