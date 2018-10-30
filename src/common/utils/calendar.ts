export const getStartDateOfWeek = (date: Date): Date => {
  const startDate = new Date(date.getTime())
  while (startDate.getDay() !== 0) {
    startDate.setDate(startDate.getDate() - 1)
  }
  return startDate
}

export const getMonthDates = (month: number, year: number): Date[][] => {
  if (!monthValidator(month) || !yearValidator(year)) {
    throw Error('Invalid month data')
  }
  let week: Date[] = []
  const weeks: Date[][] = []
  let date = getStartDateOfWeek(new Date(year, month, 1))
  do {
    for (let i = 0; i < 7; i++) {
      week.push(date);
      date = new Date(date.getTime());
      date.setDate(date.getDate() + 1);
    }
    weeks.push(week);
    week = [];
  } while ((date.getMonth() <= month) && (date.getFullYear() === year))

  return weeks;
}

export const monthValidator = (month: number): boolean => (month >= 0) && (month <= 11)
export const yearValidator = (year: number): boolean => year > 1975
