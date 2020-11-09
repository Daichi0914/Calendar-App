import { atom } from 'recoil';

export const NowYear = atom({
  key: 'NowYear',
  default: '',
})
export const NowMonth = atom({
  key: 'NowMonth',
  default: '',
})
export const Today = atom({
  key: 'Today',
  default: '',
})
export const DayOfWeek = atom({
  key: 'DayOfWeek',
  default: '',
})

export const CurrentYear = atom({
  key: 'CurrentYear',
  default: '',
})
export const CurrentMonth = atom({
  key: 'CurrentMonth',
  default: '',
})
// export const CurrentDay = atom({
//   key: 'CurrentDay',
//   default: '',
// })
// export const CurrentDayOfWeek = atom({
//   key: 'CurrentDayOfWeek',
//   default: '',
// })