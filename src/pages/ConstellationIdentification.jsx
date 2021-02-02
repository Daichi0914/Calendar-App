import exifr from 'exifr';
import { useState } from 'react';
import Header from '../Components/Header/Header';

const ConstellationIdentification = () => {
  const [fileUrl, setFileUrl] = useState(null);
  const handleChange = async ({
    target: {
      files: [file],
    },
  }) => {
    const output = await exifr.parse(file);
    const imageUrl = URL.createObjectURL(file);
    setFileUrl(imageUrl);
    console.log(output);
  };

  return (
    <div style={{ margin: '10px 10px 0 10px' }}>
      <Header appKind={'Constellation'} />
      <div style={{ height: 64 }} />
      <input type='file' id='file' accept='image/*' onChange={handleChange} />
      <div style={{ height: 800 }}>
        <img src={fileUrl} alt='upload' style={{ height: '100%' }} />
      </div>
      {/* <div>正座判別アプリ</div> */}
    </div>
  );
};

export default ConstellationIdentification;
