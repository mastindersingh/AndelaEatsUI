import { dateExtract } from './index';

export const formatMenuItemDate = (dateString) => {
  const date = dateExtract(dateString);

  return date
    ? `${date.day} ${date.shortMonth} ${date.year}`
    : '';
};
