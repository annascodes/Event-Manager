const isLeapYear = (year) => {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
  };
  
 export const getMonthsWithDays = (year) => {
    const generateDays = (days) => Array.from({ length: days }, (_, i) => i + 1);
  
    return {
      January: generateDays(31),
      February: generateDays(isLeapYear(year) ? 29 : 28),
      March: generateDays(31),
      April: generateDays(30),
      May: generateDays(31),
      June: generateDays(30),
      July: generateDays(31),
      August: generateDays(31),
      September: generateDays(30),
      October: generateDays(31),
      November: generateDays(30),
      December: generateDays(31),
    };
  };
  
 export const monthsName = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];

export const getMonthNum = (month)=>{
  return monthsName.indexOf(month).toString().length>1 ? monthsName.indexOf(month)+1:`0${monthsName.indexOf(month)+1}`
}

export const timeDigits = Array.from({length:24}, (_,i)=>i+1)

  // Example usage
//   const year2024 = getMonthsWithDays(2024); // February will have 29 days
//   console.log(year2024.February); // Output: [1, 2, 3, ..., 29]
  