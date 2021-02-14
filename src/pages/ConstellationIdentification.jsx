import { makeStyles } from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import clsx from 'clsx';
import exifr from 'exifr';
import React, { useContext, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Redirect, withRouter } from 'react-router-dom';
import {
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from 'recoil';
import { AuthContext } from '../AUTH/AuthService';
import Canvas from '../Components/ConstellationIdentificationApp/Canvas';
import ShowExifData from '../Components/ConstellationIdentificationApp/ShowExifData';
import Header from '../Components/Header/Header';
import { DrawerWidth } from '../Recoil/DrawerWidth';
import { ExifData } from '../Recoil/ExifData';
import { MenuDrawerState } from '../Recoil/MenuDrawerState';
import { ImageURL } from '../Recoil/UpLoadImageURL';

const useStyles = makeStyles(theme => ({
  gridList: {
    height: `calc(100vh - 210px)`,
    padding: '40px 30px',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth => drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  gridTile: {
    maxWidth: 'calc((100vw - 80px) / 4)',
    margin: '0 auto',
  },
  gridTileSm: {
    margin: '0 auto',
    maxWidth: 'calc((100vw - 80px) / 3)',
  },
  gridTileXs: {
    margin: '0 auto',
    maxWidth: 'calc((100vw - 80px) / 2)',
  },
}));

function ConstellationIdentification() {
  const user = useContext(AuthContext);
  const drawerWidth = useRecoilValue(DrawerWidth);
  const drawerOpen = useRecoilValue(MenuDrawerState);
  const classes = useStyles(drawerWidth);
  const [myFile, setMyFile] = useState(null);
  const [fileUrl, setFileUrl] = useRecoilState(ImageURL);
  const resetFileUrl = useResetRecoilState(ImageURL);
  const setExifData = useSetRecoilState(ExifData);

  const onDrop = async file => {
    const output = await exifr.parse(file[0]);
    // DateTimeOriginalはオブジェクトで取得されるためstringに直して保存する必要がある
    const exifDateTimeOriginal = JSON.stringify(output.DateTimeOriginal);
    setExifData({
      DateTimeOriginal: exifDateTimeOriginal ? exifDateTimeOriginal : null,
      GPSLatitude: output.GPSLatitude ? output.GPSLatitude : null,
      GPSLatitudeRef: output.GPSLatitudeRef ? output.GPSLatitudeRef : null,
      GPSLongitude: output.GPSLongitude ? output.GPSLongitude : null,
      GPSLongitudeRef: output.GPSLongitudeRef ? output.GPSLongitudeRef : null,
      GPSImgDirection: output.GPSImgDirection ? output.GPSImgDirection : null,
      GPSImgDirectionRef: output.GPSImgDirectionRef ? output.GPSImgDirectionRef : null,
    });

    const imageUrl = URL.createObjectURL(file[0]);
    setFileUrl(imageUrl);
    setMyFile(file[0]);
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
      <div
        style={{ display: 'flex' }}
        className={clsx(classes.appBar, {
          [classes.appBarShift]: drawerOpen,
        })}
      >
        <div style={{ width: '49vw', paddingLeft: 15 }}>
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
                paddingTop: 120,
                paddingBottom: 100,
              }}
            >
              <input {...getInputProps()} type='file' id='file' accept='image/*' />
              <p
                style={{
                  textAlign: 'center',
                  fontSize: 30,
                  color: '#666',
                  margin: 40,
                }}
              >
                Drag & drop a file or click to select file here
              </p>
              <div style={{ textAlign: 'center' }}>
                <CloudUploadIcon style={{ fontSize: 170, color: '#999', margin: 20 }} />
              </div>
            </div>
          )}
        </div>
        <span style={{ width: '2vw' }} />
        <div style={{ margin: '0 auto', maxWidth: '49vw', paddingTop: 30 }}>
          {fileUrl ? <ShowExifData /> : null}
        </div>
      </div>
    </div>
  );
}

export default withRouter(ConstellationIdentification);
