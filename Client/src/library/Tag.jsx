import { getRandomColor } from '../utils/getRandomColor';

function Tag({ text }) {
  const color = getRandomColor();
  return (
    <button className={`${color} text-white p-1 rounded-md px-2 m-1 text-sm`}>
      {text}
    </button>
  );
}

export default Tag;
