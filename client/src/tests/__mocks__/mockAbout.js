import faker from 'faker';

const about = {
  id: faker.random.uuid(),
  details: faker.address.streetAddress(),
  isDeleted: false
};

export default about;
