import React, { useState } from 'react';

export default function ItemSelector({ options, type }) {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelect = option => {
    setSelectedOption(option);
  };

  const colorClasses = {
    red: 'bg-red-500',
    blue: 'bg-blue-500',
    green: 'bg-green-500',
};  

  return (
    <>
      {options.map((option, index) => {
        const isSelected = selectedOption === option;
        
        const style = {
            'color': `w-8 h-8 mr-2 rounded-full mx-auto bg-white outline outline-1 outline-zinc-300 ${isSelected ? 'outline-zinc-500' : ''}`,
            'text': `py-1 px-3 mr-2 text-black rounded-full mx-auto bg-white outline outline-1 outline-zinc-300 ${isSelected ? 'outline-zinc-500' : ''}`
        } ;

        const innerColor = `w-6 h-6 rounded-full mx-auto ${colorClasses[option]}`;

          return (
            <button
              key={index}
              className={type === 'text' ? style.text : style.color}
              onClick={() => handleSelect(option)}
            >
              {type === 'text' ? option : <div class={innerColor}/>}
            </button>
          );
      })}
    </>
  );
}