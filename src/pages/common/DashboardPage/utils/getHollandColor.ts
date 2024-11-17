import { EGroup, EHolland } from '@enum/exam';

export const getHollandColor = (type: EHolland) => {
  switch (type) {
    case EHolland.R:
      return 'red';
    case EHolland.I:
      return 'orange';
    case EHolland.A:
      return 'yellow';
    case EHolland.S:
      return 'green';
    case EHolland.E:
      return 'blue';
    case EHolland.C:
      return 'purple';
    default:
      return 'white';
  }
};

export const getSchoolGroupColor = (type: EGroup) => {
  switch (type) {
    case EGroup.A0:
      return 'red';
    case EGroup.B:
      return 'yellow';
    case EGroup.C:
      return 'green';
    case EGroup.D1:
      return 'blue';
    case EGroup.D7:
      return 'purple';
    default:
      return 'white';
  }
};
