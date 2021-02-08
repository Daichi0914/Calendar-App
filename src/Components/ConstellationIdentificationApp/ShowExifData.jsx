import Paper from '@material-ui/core/Paper';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { ExifData } from '../../Recoil/ExifData';

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function createData(name, calories) {
  return { name, calories };
}

const useStyles = makeStyles({
  table: {
    // minWidth: 700,
  },
});

const ShowExifData = () => {
  const classes = useStyles();
  const exifData = useRecoilValue(ExifData);

  const No_Data = 'No Data';
  const dateTimeOriginal = exifData.DateTimeOriginal;
  const latitude = exifData.GPSLatitude
    ? `${exifData.GPSLatitude[0]}° ${exifData.GPSLatitude[1]}' ${exifData.GPSLatitude[2]}"`
    : exifData.GPSLatitude;
  const latitudeRef = exifData.GPSLatitudeRef;
  const longitude = exifData.GPSLatitude
    ? `${exifData.GPSLongitude[0]}° ${exifData.GPSLongitude[1]}' ${exifData.GPSLongitude[2]}"`
    : exifData.GPSLatitude;
  const longitudeRef = exifData.GPSLongitudeRef;
  const imgDirection = exifData.GPSImgDirection;
  const imgDirectionRef = exifData.GPSImgDirectionRef;

  // exifDataが取れているかどうかで表示を変えるバリデーション
  const exifValidationData = exif_data => {
    return exif_data ? exif_data : No_Data;
  };

  const rows = [
    createData('撮影時刻', exifValidationData(dateTimeOriginal)),
    createData('緯度', exifValidationData(latitude)),
    createData('緯度方向', exifValidationData(latitudeRef)),
    createData('経度', exifValidationData(longitude)),
    createData('経度方向', exifValidationData(longitudeRef)),
    createData('画像の向き', exifValidationData(imgDirection)),
    createData('画像の経度方向', exifValidationData(imgDirectionRef)),
  ];

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label='customized table'>
        <TableHead>
          <TableRow>
            <StyledTableCell>取得情報</StyledTableCell>
            <StyledTableCell align='right'>取得結果</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component='th' scope='row'>
                {row.name}
              </StyledTableCell>
              <StyledTableCell align='right'>{row.calories}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ShowExifData;
