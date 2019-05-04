export const mockAPI = {
  loadReportData: () => {
    return {
      startDate: {
        year: 2019,
        month: 4,
        day: 21
      },
      pointsEarned: 0,
      pointsExpected: 356,
      questions: [
        {
          id: 0,
          title: 'How many dials did you make?',
          pointsEach: 5,
          creditForEach: true,
          pointsEarned: 0,
          pointsExpected: 50,
          comment: '',
          amount: 0
        },
        {
          id: 1,
          title: 'How many names did you brainstorm?',
          pointsEach: 1,
          creditForEach: true,
          pointsEarned: 0,
          pointsExpected: 35,
          comment: '',
          amount: 0
        },
        {
          id: 2,
          title: 'Have you completed your admin work this week?',
          pointsEach: 35,
          creditForEach: false,
          pointsEarned: 0,
          pointsExpected: 35,
          comment: '',
          amount: 0
        },
        {
          id: 3,
          title: 'How many asks have you made this week?',
          pointsEach: 15,
          creditForEach: true,
          pointsEarned: 0,
          pointsExpected: 45,
          comment: '',
          amount: 0
        },
        {
          id: 4,
          title: 'How many thank you notes have you written this week?',
          pointsEach: 5,
          creditForEach: true,
          pointsEarned: 0,
          pointsExpected: 45,
          comment: '',
          amount: 0
        },
        {
          id: 5,
          title: 'How many pastors have you talked to this week?',
          pointsEach: 7,
          creditForEach: true,
          pointsEarned: 0,
          pointsExpected: 45,
          comment: '',
          amount: 0
        }
      ],
      reportComment: ''
    };
  },
  loadGroupPoints: () => {
    return {
      0: {
        name: 'Kristy',
        currentWeekPoints: 343,
        previousWeekPoints: 305
      },
      1: {
        name: 'Tricia',
        currentWeekPoints: 245,
        previousWeekPoints: 300
      },
      2: {
        name: 'Jason',
        currentWeekPoints: 300,
        previousWeekPoints: 123
      },
      3: {
        name: 'Victoria',
        currentWeekPoints: 25,
        previousWeekPoints: 74
      }
    };
  }
};
