import { title, lowerCaseArray } from './index';
import defMealImage from '../assets/images/mealdef.gif';
import { upload } from './cloudinary';

export const canOrderMeal = (day) => {
  const todaysDate = new Date();
  const dueTime = 24 - 15;
  const tomorrowsDate = new Date(day.date);
  const timeLeft = Math.floor((tomorrowsDate - todaysDate) / 3600 / 1000);

  if (dueTime < timeLeft && timeLeft < 184) {
    return true;
  } 
  return false;
};

const today = new Date();
today.setHours(0, 0, 0, 0);

export const validateDate = (menu, endDate) => (
  new Date(menu.date) <= endDate
  && new Date(menu.date) >= today
);

export const validateAddMealImage = (image) => {
  const exts = [
    'image/jpg',
    'image/jpeg',
    'image/png'
  ];

  if (!(image instanceof File) || !exts.includes(image.type)) {
    return 'Image should be in JPEG or PNG format';
  }

  return true;
};

const validateInputFields = (mealDetails) => {
  const errors = [];

  Object.entries(mealDetails).forEach(([key, value]) => {
    if (key === 'image' || key === 'type') return [];
    if (!value.toString().trim().length) { errors.push(key); }
  });

  return errors;
};

export const generateFormData = (mealDetails, types) => {
  const {
    name, desc, type, image: { file, dataurl }
  } = mealDetails;
  
  const errors = [
    ...validateInputFields(mealDetails),
    ...(!dataurl ? ['image'] : []),
    ...(!lowerCaseArray(types).includes(type) ? ['type'] : [])
  ];

  return errors.length ? errors
    : {
      mealName: title(name),
      mealType: type.toLowerCase(),
      description: title(desc),
      file,
      dataurl
    };
};

export const endDate = () => new Date(today.getFullYear(), 
  today.getMonth(), today.getDate() + 10);

export const findUpdatedIndex = (prevState, updatedId) => (
  prevState.findIndex(item => item.id === updatedId)
);

export const setMealImage = (image) => (
  !image ? defMealImage : image
);

export const mealImageUpload = (file, dataurl, callback) => {
  if (file instanceof File) {
    return upload(dataurl)
      .then(payload => callback(null, payload.secure_url))
      .catch(error => callback(error, null));
  }

  return callback(null, dataurl);
};

export const defaultMealImage = defMealImage;
