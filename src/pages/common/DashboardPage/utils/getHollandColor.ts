import { EGroupDashboard, EHolland } from '@enum/exam';

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

export const getSchoolGroupColor = (type: EGroupDashboard) => {
  switch (type) {
    case EGroupDashboard.A:
      return 'red';
    case EGroupDashboard.B:
      return 'yellow';
    case EGroupDashboard.C:
      return 'green';
    case EGroupDashboard.D:
      return 'blue';
    default:
      return 'white';
  }
};
