import { useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { ImageURL } from '../../Recoil/UpLoadImageURL';

const Canvas = () => {
  const canvasRef = useRef(null);
  const fileUrl = useRecoilValue(ImageURL);
  const [isBlur, setIsBlur] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const img = new Image();
    img.src = fileUrl;

    const drawImageActualSize = () => {
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      if (isBlur) {
        context.filter = 'blur(7px)';
      } else {
        context.filter = 'none';
      }
      context.drawImage(img, 0, 0, img.width, img.height);
    };

    img.onload = drawImageActualSize;
    img.style.display = 'none';
  }, [fileUrl, isBlur]);

  // contextがブロック外なのでここでblur処理は書けない
  const handleClick = () => {
    setIsBlur(!isBlur);
  };

  return (
    <>
      <canvas ref={canvasRef} style={{ height: 800 }} />
      {fileUrl ? (
        <div style={{ display: 'flex' }}>
          <button onClick={handleClick} style={{ width: 100, padding: 5, fontSize: 20 }}>
            blur
          </button>
          <p style={{ padding: 8, fontSize: 20 }}>{isBlur ? ' : ON' : ' : OFF'}</p>
        </div>
      ) : null}
    </>
  );
};

export default Canvas;
