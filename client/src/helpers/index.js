/**
 * 
 * 
 * @description capitalize string first letter
 * 
 * @param { String } argument
 * 
 * @returns { String } 
 */
export const title = argument => {
  const string = argument.toLowerCase();
  return (
    string[0].toUpperCase()
    + string.substr(1)
  );
};

/**
 * 
 * 
 * @description get date parts
 * 
 * @param {*} dateString
 * 
 * @returns { String }
 */
export const dateExtract = (dateString = null) => {
  const date = typeof dateString === 'string'
    ? new Date(dateString)
    : new Date();
  
  return date === 'Invalid Date' ? null : {
    day: date.getDate(),
    month: date.getMonth(),
    year: date.getFullYear(),
    shortMonth: date.toLocaleString(
      'en-us', { month: 'short' }
    )
  };
};

/**
 *
 *
 * @description get current date
 * 
 * @returns { String }
*/
export const formatCurrentDate = () => {
  const date = dateExtract(null);
  if (!date) return '';

  let { day, month } = date;
  day = day < 10 ? `0${day}` : day;
  month = month < 10 ? `0${month}` : month;

  return `${date.year}-${month}-${day}`;
};

export const lowerCaseArray = (array) => (
  array.map(item => item.toLowerCase())
);
