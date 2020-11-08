import React from 'react';
import {
  makeStyles,
  Typography,
  Card,
  GridList,
  GridListTile,
  CardContent,
  Paper,
} from '@material-ui/core';


// const uuid = require('uuid');
// const weekdays = ['日', '月', '火', '水', '木', '金', '土'];

// const MonthCalendar = props => {
//   const begining = new Date(2019, 0, 1);

//   const calendar = [];
//   Array.apply(null, { length: begining.getDay() })
//     .map(Number.call, Number)
//     .forEach(e => {
//       calendar.push(
//         <GridListTile key={uuid()}>
//           <Card />
//         </GridListTile>
//       );
//     });
//   Array.apply(null, { length: 32 })
//     .map(Number.call, Number)
//     .forEach(i => {
//       const day = new Date(begining.getFullYear(), begining.getMonth(), 1 + i);
//       if (day.getMonth() === begining.getMonth()) {
//         calendar.push(
//           <GridListTile>
//             <Card>
//               <CardContent>
//                 <Typography>{day.toLocaleDateString()}</Typography>
//               </CardContent>
//             </Card>
//           </GridListTile>
//         );
//       }
//     });

//   return (
//     <div>
//       <Paper>
//         <GridList cols={7} cellHeight='auto'>
//           {weekdays.map(w => {
//             const styles = {};
//             if (w === '日') {
//               styles.color = 'red';
//             }
//             if (w === '土') {
//               styles.color = 'blue';
//             }
//             return (
//               <GridListTile key={w}>
//                 <Card>
//                   <CardContent>
//                     <Typography style={styles}>{w}</Typography>
//                   </CardContent>
//                 </Card>
//               </GridListTile>
//             );
//           })}
//           {calendar}
//         </GridList>
//       </Paper>
//     </div>
//   );
// };

const MonthCalendar = () => {
  return (
    <div>
      月表示
    </div>
  );
};

export default MonthCalendar;
