export const getRandomColor = () => {
  const colors = [
    'bg-gray-500',
    'bg-red-500',
    'bg-yellow-500',
    'bg-green-500',
    'bg-blue-500',
    'bg-indigo-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-gray-600',
    'bg-red-600',
    'bg-yellow-600',
    'bg-green-600',
    'bg-blue-600',
    'bg-indigo-600',
    'bg-purple-600',
    'bg-pink-600',
  ];

  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
  const color = colors[getRandomInt(15)];

  return color;
};
