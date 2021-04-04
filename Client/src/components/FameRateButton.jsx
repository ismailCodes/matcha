import { AiFillFire } from 'react-icons/ai';
import StatusButton from './StatusButton';

function FameRateButton({ fameRate, status }) {
  return (
    <div className='flex justify-center w-full absolute bottom-4 z-40'>
      <div className='bg-roseMatcha text-gray-50 py-2 px-4 rounded-lg'>
        <AiFillFire className='inline mb-1' /> {fameRate}
      </div>
      <StatusButton status={status} />
    </div>
  );
}

export default FameRateButton;
