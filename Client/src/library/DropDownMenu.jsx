import React from 'react';

function DropDownMenu({ elements }) {
  const listItems = elements.map((element, index, originalArray) => {
    return (
      <li key={index}>
        <a
          className={`${
            index == originalArray.length - 1 ? 'rounded-b' : ''
          } bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap`}
          href='#'
        >
          {element}
        </a>
      </li>
    );
  });

  return (
    <ul className='absolute hidden text-gray-700 pt-2 group-hover:block sm:-ml-12'>
      {listItems}
    </ul>
  );
}

export default DropDownMenu;
