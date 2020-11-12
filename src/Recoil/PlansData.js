import { atom } from 'recoil';

export const Plans = atom({
  key: 'Plans',
  default: {PlanName: '' ,  PlanStart: '' ,  PlanEnd: '' ,  PlanMemo: ''},
})

export const PlansData = atom({
  key: 'PlansData',
  default: [],
})