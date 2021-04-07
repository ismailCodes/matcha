import { FiEdit } from 'react-icons/fi';

function EditButton({ setEditModalOpen }) {
  return (
    <div
      className='text-gray-50 flex absolute left-4 bottom-5 z-40 h-8 w-8 justify-center items-center'
      onClick={() => setEditModalOpen(true)}
    >
      <FiEdit className='h-full w-full' />
    </div>
  );
}

export default EditButton;
