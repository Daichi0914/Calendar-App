import { atom } from 'recoil';

 ////////////Exif/////////////
  // 撮影時刻 DateTimeOriginal
  // 緯度 GPSLatitude
  // GPS緯度参照(北緯・南緯) GPSLatitudeRef
  // 経度 GPSLongitude
  // GPS経度参照(東経・西経) GPSLongitudeRef
  // 画像の向き GPSImgDirection
  // 画像の経度参照 GPSImgDirectionRef
  // ↑'T'は真方位、'M'は磁気方位
  /////////////////////////////

export const ExifData = atom({
  key: 'ExifData',
  default: {
    DateTimeOriginal: null,
    GPSLatitude: null,
    GPSLatitudeRef: null,
    GPSLongitude: null,
    GPSLongitudeRef: null,
    GPSImgDirection: null,
    GPSImgDirectionRef: null,
  },
});
