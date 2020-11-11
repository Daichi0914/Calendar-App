import { atom, selector } from 'recoil';

export const OneWeekWeatherData = atom({
  key: 'OneWeekWeatherData',
  default: [],
})

export const DailyWeatherData = selector({
  key: 'DailyWeatherData',
  get: ({ get }) => {
    const oneWeekWeatherData = get(OneWeekWeatherData);

    const todayW = oneWeekWeatherData[0]
    const yesterdayW = oneWeekWeatherData[1]
    const tomorrowW = oneWeekWeatherData[2]
    const threeDaysLaterW = oneWeekWeatherData[3]
    const fourDaysLaterW = oneWeekWeatherData[4]
    const fiveDaysLaterW = oneWeekWeatherData[5]
    const sixDaysLaterW = oneWeekWeatherData[6]

    return {
      todayW,
      yesterdayW,
      tomorrowW,
      threeDaysLaterW,
      fourDaysLaterW,
      fiveDaysLaterW,
      sixDaysLaterW
    }
  }
})