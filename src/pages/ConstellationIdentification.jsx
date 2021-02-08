import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import exifr from 'exifr';
import React, { useContext, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Redirect, withRouter } from 'react-router-dom';
import { useResetRecoilState, useSetRecoilState } from 'recoil';
import { AuthContext } from '../AUTH/AuthService';
import Canvas from '../Components/ConstellationIdentificationApp/Canvas';
import ShowExifData from '../Components/ConstellationIdentificationApp/ShowExifData';
import Header from '../Components/Header/Header';
import { ImageURL } from '../Recoil/UpLoadImageURL';

function ConstellationIdentification() {
  const user = useContext(AuthContext);
  const [myFile, setMyFile] = useState(null);
  const setFileUrl = useSetRecoilState(ImageURL);
  const resetFileUrl = useResetRecoilState(ImageURL);

  const onDrop = async file => {
    setMyFile(file[0]);

    // FIXME: EXIFが取れなくてもエラーにならないようにリファクタリングする必要がある

    // const output = await exifr.parse(file[0]);

    // function Person(
    //   DateTimeOriginal,
    //   GPSLatitude,
    //   GPSLatitudeRef,
    //   GPSLongitude,
    //   GPSLongitudeRef,
    //   GPSImgDirection,
    //   GPSImgDirectionRef
    // ) {
    //   this.撮影時刻 = DateTimeOriginal;
    //   this.緯度 = GPSLatitude ? GPSLatitude : null;
    //   this.GPS緯度参照 = GPSLatitudeRef ? GPSLatitudeRef : null;
    //   this.経度 = GPSLongitude ? GPSLongitude : null;
    //   this.GPS経度参照 = GPSLongitudeRef ? GPSLongitudeRef : null;
    //   this.画像の向き = GPSImgDirection ? GPSImgDirection : null;
    //   this.画像の経度参照 = GPSImgDirectionRef ? GPSImgDirectionRef : null; // 'T'は真方位、'M'は磁気方位
    // }

    // const GPS_Info = new Person(
    //   output.DateTimeOriginal ? output.DateTimeOriginal : null,
    //   output.GPSLatitude, // TODO: 60進法->10進法の変換が必要
    //   output.GPSLatitudeRef,
    //   output.GPSLongitude, // TODO: 60進法->10進法の変換が必要
    //   output.GPSLongitudeRef,
    //   output.GPSImgDirection,
    //   output.GPSImgDirectionRef
    // );
    // console.table(GPS_Info);

    //////////////////////////////////////////////////////////////////////////

    const imageUrl = URL.createObjectURL(file[0]);
    setFileUrl(imageUrl);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
  });

  const handleRemove = () => {
    setMyFile(null);
    resetFileUrl();
    setFileUrl(null);
  };

  if (!user) {
    return <Redirect to='/SignIn' />;
  }

  return (
    <div style={{ margin: '10px 10px 0 10px' }}>
      <Header appKind={'Constellation'} />
      <div style={{ height: 64 }} />
      <div style={{ display: 'flex' }}>
        <div style={{ width: '48vw' }}>
          {myFile ? (
            <>
              <div style={{ marginBottom: 8 }}>
                {myFile.path} - {myFile.size} bytes{' '}
                <button onClick={handleRemove}>Remove File</button>
              </div>
              <div>
                <Canvas />
              </div>
            </>
          ) : (
            <div
              {...getRootProps({ className: 'dropzone' })}
              style={{
                width: '100%',
                cursor: 'pointer',
                border: 'dashed 2px #666',
                borderRadius: 30,
              }}
            >
              <input {...getInputProps()} type='file' id='file' accept='image/*' />
              <p
                style={{
                  textAlign: 'center',
                  fontSize: 20,
                  color: '#666',
                  margin: 40,
                }}
              >
                Drag & drop some files here, or click to select files
              </p>
              <div style={{ textAlign: 'center' }}>
                <CloudUploadIcon style={{ fontSize: 170, color: '#999', margin: 20 }} />
              </div>
            </div>
          )}
        </div>
        <span style={{ width: '4vw' }} />
        <div style={{ width: '48vw' }}>
          <ShowExifData />
        </div>
      </div>
    </div>
  );
}

export default withRouter(ConstellationIdentification);
