import { useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { ImageURL } from '../../Recoil/UpLoadImageURL';

const Canvas = () => {
  const canvasRef = useRef(null);
  const fileUrl = useRecoilValue(ImageURL);
  const [isBlur, setIsBlur] = useState(false);
  const [isGrayScale, setIsGrayScale] = useState(false);
  const [isGetPixelData, setIsGetPixelData] = useState(null);
  const [pixelsData, setPixelsData] = useState(null);
  const [imgData, setImgData] = useState(null);
  const [lightnessSortData, setLightnessSortData] = useState(null);

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

      if (isBlur) {
        context.filter = 'blur(7px)';
        drawImage();
      } else {
        context.filter = 'none';
        drawImage();
      }

      setImgData(context.getImageData(0, 0, canvas.width, canvas.height));

      if (isGrayScale) {
        turnOnGrayScale(canvas.width);
        context.putImageData(imgData, 0, 0);
        drawImage();
      }
    };

    if (isGetPixelData) {
      sortLightness();
    }

    img.onload = drawImageActualSize;
    img.style.display = 'none';
  }, [fileUrl, isBlur, isGrayScale, isGetPixelData]);

  const turnOnGrayScale = canvasWidth => {
    const pixels = imgData.data;
    const threshold = 100;
    const pixelCoordinate = [];
    for (let i = 0; i < pixels.length; i += 4) {
      let lightness = parseInt(
        // 輝度y = 0.299r + 0.587g + 0.114b
        pixels[i] * 0.299 + pixels[i + 1] * 0.587 + pixels[i + 2] * 0.114
      );
      if (lightness > 200) {
        pixels[i] = lightness > threshold ? lightness : 0;
        pixels[i + 1] = lightness > threshold ? lightness : 0;
        pixels[i + 2] = lightness > threshold ? lightness : 0;
        // X座標,Y座標
        let x = (i / 4) % canvasWidth;
        let y = Math.floor(i / 4 / canvasWidth);
        pixelCoordinate.push([x, y, lightness]);
      }
    }
    setPixelsData(pixelCoordinate);
  };

  const sortLightness = () => {
    const lightnessSort = pixelsData.sort((a, b) => {
      // [2]は輝度値を入れてある
      if (a[2] > b[2]) return -1;
      if (a[2] < b[2]) return 1;
      return 0;
    });
    setLightnessSortData(lightnessSort);
  };

  // contextがスコープ外なのでここでCanvas処理は書けない
  const handleBlurClick = () => {
    setIsBlur(!isBlur);
    if (isGrayScale) {
      setIsGrayScale(false);
    }
  };
  const handleGrayScaleClick = () => {
    setIsGrayScale(!isGrayScale);
    if (isGetPixelData) {
      setIsGetPixelData(false);
    }
  };
  const handleGetPxData = () => {
    setIsGetPixelData(!isGetPixelData);
  };
  ///////////////////////////////////////////////////

  console.log(lightnessSortData);

  return (
    <>
      <canvas ref={canvasRef} style={{ height: 800 }} />
      {fileUrl ? (
        <div style={{ display: 'flex' }}>
          {/* ******************** Blur Button ******************** */}
          <button
            onClick={handleBlurClick}
            style={{ width: 100, padding: 5, fontSize: 20 }}
          >
            blur
          </button>
          <p style={{ padding: 8, fontSize: 20 }}>{isBlur ? ' : ON' : ' : OFF'}</p>

          {/* **************** Gray Scale Button **************** */}
          {isBlur ? (
            <>
              <button
                onClick={handleGrayScaleClick}
                style={{ width: 150, padding: 5, fontSize: 20 }}
              >
                Gray Scale
              </button>
              <p style={{ padding: 8, fontSize: 20 }}>
                {isGrayScale ? ' : ON' : ' : OFF'}
              </p>
            </>
          ) : null}

          {/* ****************** Get Pixel Data ******************* */}
          {isGrayScale ? (
            <>
              <button
                onClick={handleGetPxData}
                style={{ width: 150, padding: 5, fontSize: 20 }}
              >
                Get Pixel Data
              </button>
              <p style={{ padding: 8, fontSize: 20 }}>
                {isGetPixelData ? ' : ON' : ' : OFF'}
              </p>
            </>
          ) : null}
        </div>
      ) : null}
    </>
  );
};

export default Canvas;
