

const getCurrentDate = () => {
  const currentDay = new Date().getDate()
  const currentMonth = new Date().getMonth()
  const currentYear = new Date().getFullYear()
  let convertedMonth = ""
  switch (currentMonth) {
    case 1:
      convertedMonth = "January"
      break
    case 2:
      convertedMonth = "February"
      break
    case 3:
      convertedMonth = "March"
      break

    case 4:
      convertedMonth = "April"
      break
    case 5:
      convertedMonth = "May"
      break
    case 6:
      convertedMonth = "June"
      break
    case 7:
      convertedMonth = "July"
      break
    case 8:
      convertedMonth = "August"
      break
    case 9:
      convertedMonth = "September"
      break
    case 10:
      convertedMonth = "October"
      break
    case 11:
      convertedMonth = "November"
      break
    case 12:
      convertedMonth = "December"
      break

  }


  return {
    day: currentDay,
    month: convertedMonth,
    year: currentYear
  }
}

export default getCurrentDate
