import { useColor } from 'color-thief-react';
import FameRateButton from './FameRateButton.jsx';

function ProfileContainer({ profile }) {
  const { cover, fameRate, status } = profile;
  const { data, loading } = useColor(cover, 'rgbArray');

  function rgbToRgba(rgbArray, alpha, loading) {
    let [r, g, b] = loading ? [0, 0, 0] : rgbArray;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  return (
    <div>
      <div className='relative'>
        <div
          className='bg-fixed bg-cover user-cover'
          style={{
            // zIndex: -1,
            backgroundImage: `linear-gradient(${rgbToRgba(
              data,
              0.3,
              loading
            )}, ${rgbToRgba(data, 0.3, loading)}), url(${cover})`,
            height: '35vh',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 75%, 0% 100%)',
            zIndex: -100,
            boxShadow: 'inset 0px 30px 40px -10px #000',
          }}
        />
        <FameRateButton fameRate={fameRate} status={status} />
      </div>
    </div>
  );
}

export default ProfileContainer;
