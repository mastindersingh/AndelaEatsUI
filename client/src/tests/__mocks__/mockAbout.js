import faker from 'faker';

const about = [];

do {
  about.push({
    id: faker.random.uuid(),
    details: faker.address.streetAddress(),
    isDeleted: false
  });
} while (about.length <= 5);

export default about;
