import exifr from 'exifr';
import React, { useContext } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { AuthContext } from '../AUTH/AuthService';
import Canvas from '../Components/ConstellationIdentificationApp/Canvas';
import Header from '../Components/Header/Header';
import { ImageURL } from '../Recoil/UpLoadImageURL';

const ConstellationIdentification = () => {
  const user = useContext(AuthContext);
  const setFileUrl = useSetRecoilState(ImageURL);

  if (!user) {
    return <Redirect to='/SignIn' />;
  }

  const handleChange = async ({
    target: {
      files: [file],
    },
  }) => {
    const output = await exifr.parse(file);
    console.log(output);

    function Person(
      DateTimeOriginal,
      GPSLatitude,
      GPSLatitudeRef,
      GPSLongitude,
      GPSLongitudeRef,
      GPSImgDirection,
      GPSImgDirectionRef
    ) {
      this.撮影時刻 = DateTimeOriginal;
      this.緯度 = GPSLatitude;
      this.GPS緯度参照 = GPSLatitudeRef;
      this.経度 = GPSLongitude;
      this.GPS経度参照 = GPSLongitudeRef;
      this.画像の向き = GPSImgDirection;
      this.画像の経度参照 = GPSImgDirectionRef; // 'T'は真方位、'M'は磁気方位
    }

    const GPS_Info = new Person(
      output.DateTimeOriginal ? output.DateTimeOriginal : null,
      output.GPSLatitude, // TODO: 60進法->10進法の変換が必要
      output.GPSLatitudeRef,
      output.GPSLongitude, // TODO: 60進法->10進法の変換が必要
      output.GPSLongitudeRef,
      output.GPSImgDirection,
      output.GPSImgDirectionRef
    );
    console.table(GPS_Info);

    const imageUrl = URL.createObjectURL(file);
    setFileUrl(imageUrl);
  };

  return (
    <div style={{ margin: '10px 10px 0 10px' }}>
      <Header appKind={'Constellation'} />
      <div style={{ height: 64 }} />
      <input type='file' id='file' accept='image/*' onChange={handleChange} />
      <div>
        <Canvas />
      </div>
    </div>
  );
};

export default withRouter(ConstellationIdentification);
