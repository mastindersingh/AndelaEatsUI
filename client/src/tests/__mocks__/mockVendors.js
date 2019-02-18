import faker from 'faker';

const vendors = [];

do {
  vendors.push({
    id: faker.random.uuid(),
    contactPerson: `${faker.name.firstName()} ${faker.name.lastName()}`,
    name: faker.company.companyName(),
    address: faker.address.streetAddress(),
    timestamps: {
      created_at: faker.date.recent().toString(),
      updated_at: faker.date.recent().toString(),
    },
    tel: faker.phone.phoneNumber(),
  });
} while (vendors.length <= 5);

export default vendors;
