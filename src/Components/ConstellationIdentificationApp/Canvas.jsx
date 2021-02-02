import { useEffect, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import { ImageURL } from '../../Recoil/UpLoadImageURL';

const Canvas = () => {
  const fileUrl = useRecoilValue(ImageURL);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const img = new Image();
    img.src = fileUrl;

    const drawImageActualSize = () => {
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      context.drawImage(img, 0, 0, img.width, img.height);
    };

    context.drawImage(img, 0, 0);
    img.onload = drawImageActualSize;
    img.style.display = 'none';
  }, [fileUrl]);

  return <canvas ref={canvasRef} style={{ height: '100%' }} />;
};

export default Canvas;
