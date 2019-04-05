import faker from 'faker';

const engagements = [];

do {
  engagements.push({
    vendorId: faker.random.number({min:0, max:5}),
    id: faker.random.number({min: 0, max:5}),
    endDate: faker.date.recent().toString(),
    startDate: faker.date.recent().toString(),
    vendor: {
      name: faker.company.companyName(),
      id: faker.random.number({min:0, max:5}),
    }
  })
} while (engagements.length <= 5);


export const newEngagement = {
  vendorId: 44,
  startDate: "2018-12-01",
  endDate: "2018-12-20",
  isActive: true
};

export default engagements;
