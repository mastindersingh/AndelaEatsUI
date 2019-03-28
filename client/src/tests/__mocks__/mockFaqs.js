import faker from 'faker';

const faq = [];

do {
  faq.push({
    id: faker.random.uuid(),
    categegory: faker.name.firstName(),
    question: faker.company.companyName(),
    answer: faker.address.streetAddress(),
    created_at: faker.date.recent().toString(),
    updated_at: faker.date.recent().toString(),
    isDeleted: false
  });
} while (faq.length <= 5);

export default faq;
