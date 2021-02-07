import { useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { ImageURL } from '../../Recoil/UpLoadImageURL';

const Canvas = () => {
  const canvasRef = useRef(null);
  const fileUrl = useRecoilValue(ImageURL);
  const [isIdentification, setIsIdentification] = useState(false);
  const [topBrightnessPixelData, setTopBrightnessPixelData] = useState(null);
  // const [isBlur, setIsBlur] = useState(false);
  // const [isGrayScale, setIsGrayScale] = useState(false);
  // const [isGetPixelData, setIsGetPixelData] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const img = new Image();
    img.src = fileUrl;

    const drawImage = () => {
      context.drawImage(img, 0, 0, canvas.width, canvas.height);
    };

    const drawImageActualSize = () => {
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;

      if (isIdentification) {
        // ↓↓ Blur ↓↓ //
        context.filter = 'blur(7px)';
        drawImage();
        /////////////////

        const imgData = context.getImageData(0, 0, canvas.width, canvas.height);
        const pixelCoordinate = [];

        // ↓↓ Gray Scale ↓↓ //
        const pixels = imgData.data;
        const grayscale_threshold = 100;

        for (let i = 0; i < pixels.length; i += 4) {
          let brightness = parseInt(
            // 輝度y = 0.299r + 0.587g + 0.114b
            pixels[i] * 0.299 + pixels[i + 1] * 0.587 + pixels[i + 2] * 0.114
          );
          if (brightness > grayscale_threshold) {
            pixels[i] = brightness;
            pixels[i + 1] = brightness;
            pixels[i + 2] = brightness;
            // X座標,Y座標
            let x = (i / 4) % canvas.width;
            let y = Math.floor(i / 4 / canvas.width);
            pixelCoordinate.push([x, y, brightness]);
          } else {
            pixels[i] = 0;
            pixels[i + 1] = 0;
            pixels[i + 2] = 0;
          }
        }
        context.putImageData(imgData, 0, 0);
        // ↑↑ Gray Scale ↑↑ //

        // ↓↓ Get Pixel Data ↓↓ //
        const brightnessSort = pixelCoordinate.sort((a, b) => {
          // [2]は輝度値
          if (a[2] > b[2]) return -1;
          if (a[2] < b[2]) return 1;
          return 0;
        });

        const get_number_of_high_brightness = 5;
        const pixel_range_threshold = 100;
        let copyBrightnessSort = brightnessSort; // brightnessSortを直接いじるのはまずいのでコピー
        let highBrightness = [];

        for (let i = 0; i < get_number_of_high_brightness; i++) {
          let highestBrightnessPixel = copyBrightnessSort[0];
          context.beginPath();
          context.arc(
            highestBrightnessPixel[0],
            highestBrightnessPixel[1],
            7,
            0,
            2 * Math.PI
          );
          context.lineWidth = 80;
          context.strokeStyle = '#ff0000';
          context.stroke();
          highBrightness.push(highestBrightnessPixel);
          copyBrightnessSort = copyBrightnessSort.filter(
            pixelData =>
              // X,Yそれぞれ+-pixelRangeThreshold分は同じ星と考えられるため除外 除外 -> !()
              !(
                pixelData[0] < highestBrightnessPixel[0] + pixel_range_threshold &&
                pixelData[0] > highestBrightnessPixel[0] - pixel_range_threshold &&
                pixelData[1] < highestBrightnessPixel[1] + pixel_range_threshold &&
                pixelData[1] > highestBrightnessPixel[1] - pixel_range_threshold
              )
          );
        }
        setTopBrightnessPixelData(highBrightness);
        // ↑↑ Get Pixel Data ↑↑ //
      } else {
        context.filter = 'none';
        drawImage();
        context.getImageData(0, 0, canvas.width, canvas.height);
        setTopBrightnessPixelData(null);
      }
    };

    img.onload = drawImageActualSize;
    img.style.display = 'none';
  }, [fileUrl, isIdentification]);

  console.log(topBrightnessPixelData);

  // contextがスコープ外なのでここでCanvas処理は書けない
  // const handleBlurClick = () => {
  //   setIsBlur(!isBlur);
  //   if (isGrayScale) {
  //     setIsGrayScale(false);
  //   }
  //   if (isGetPixelData) {
  //     setIsGetPixelData(false);
  //   }
  // };
  // const handleGrayScaleClick = () => {
  //   setIsGrayScale(!isGrayScale);
  //   if (isGetPixelData) {
  //     setIsGetPixelData(false);
  //   }
  // };
  // const handleGetPxData = () => {
  //   setIsGetPixelData(!isGetPixelData);
  // };
  ///////////////////////////////////////////////////

  // 星座判別(Blur/GrayScale/Sort/Filter)全部一度に起動
  const handleIdentification = () => {
    setIsIdentification(!isIdentification);
  };

  return (
    <>
      <canvas ref={canvasRef} style={{ width: '100%' }} />
      {fileUrl ? (
        <div style={{ display: 'flex' }}>
          <button
            onClick={handleIdentification}
            style={{ width: 120, padding: 8, fontSize: 15 }}
          >
            Identification!
          </button>
          <div style={{ padding: 10, fontSize: 15 }}>
            {isIdentification
              ? topBrightnessPixelData
                ? ' : ON'
                : ': Loading...'
              : ' : OFF'}
          </div>
        </div>
      ) : null}
      {/* {fileUrl ? (
        <div style={{ display: 'flex' }}>
          ******************** Blur Button ********************
          <button
            onClick={handleBlurClick}
            style={{ width: 120, padding: 5, fontSize: 15 }}
          >
            blur
          </button>
          <p style={{ padding: 5, fontSize: 15 }}>{isBlur ? ' : ON' : ' : OFF'}</p>

          **************** Gray Scale Button ****************
          {isBlur ? (
            <>
              <button
                onClick={handleGrayScaleClick}
                style={{ width: 120, padding: 5, fontSize: 15 }}
              >
                Gray Scale
              </button>
              <p style={{ padding: 5, fontSize: 15 }}>
                {isGrayScale ? ' : ON' : ' : OFF'}
              </p>
            </>
          ) : null}

          ****************** Get Pixel Data *******************
          {isGrayScale ? (
            <>
              <button
                onClick={handleGetPxData}
                style={{ width: 120, padding: 5, fontSize: 15 }}
              >
                Get Pixel Data
              </button>
              <p style={{ padding: 5, fontSize: 15 }}>
                {isGetPixelData ? ' : ON' : ' : OFF'}
              </p>
            </>
          ) : null}
        </div>
      ) : null} */}
    </>
  );
};

export default Canvas;
