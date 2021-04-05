function Tag({ text }) {
  return (
    <button
      className={`bg-gray-900 text-white py-1 px-2 rounded-xl m-1 text-sm hover:bg-gray-800 transform hover:scale-105`}
    >
      {text}
    </button>
  );
}

export default Tag;
