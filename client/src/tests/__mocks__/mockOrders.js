import faker from 'faker';

const orders = [];

do {
  orders.push({
    id: `#${faker.random.uuid()}`,
    owner: `${faker.name.firstName()} ${faker.name.lastName()}`,
    orderDescription: faker.lorem.words(5),
    status: ['true', 'false'][Math.floor(Math.random() * 2)],
  });
} while (orders.length <= 5);

export default orders;