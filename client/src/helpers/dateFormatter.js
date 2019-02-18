import { format, isAfter } from "date-fns";

export default (date) => {
  const splitDate = new Date(date).toDateString().split(" ");
  return `${splitDate[2]} ${splitDate[1]} ${splitDate[3]}`;
};

export const formatDateToISOString = date => {
  return new Date(date).toISOString().split('T')[0];
}

export const validateDate = (start, end) => {
	if(isAfter(end, start)) {
		return {
			startDate: format(start, 'YYYY-MM-DD'),
        	endDate: format(end, 'YYYY-MM-DD')
		}
	}
	return;
};
