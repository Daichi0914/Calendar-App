import exifr from 'exifr';
import { useSetRecoilState } from 'recoil';
import Canvas from '../Components/ConstellationIdentificationApp/Canvas';
import Header from '../Components/Header/Header';
import { ImageURL } from '../Recoil/UpLoadImageURL';

const ConstellationIdentification = () => {
  const setFileUrl = useSetRecoilState(ImageURL);
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
        <Canvas />
      </div>
    </div>
  );
};

export default ConstellationIdentification;
