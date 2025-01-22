import { faker } from '@faker-js/faker';

const getRandomArrayElement = (array) =>
  array[Math.floor(Math.random() * array.length)];

// Fake DB data
export const userTypesData = [
  { title: 'Local', value: 'local' },
  { title: 'Tourist', value: 'tourist' },
];

function createRandomTicket() {
  return {
    id: faker.string.uuid(),
    title: faker.book.title(),
    description: faker.lorem.paragraph(2),
    date: faker.date.future(),
    location: faker.location.streetAddress({ useFullAddress: true }),
    imageUrl: faker.image.url({
      width: 240,
      height: 240,
    }),
    price: faker.commerce.price({ min: 100, max: 10000, dec: 0, symbol: '$' }),
    userType: getRandomArrayElement(userTypesData),
  };
}

export const ticketsData = faker.helpers.multiple(createRandomTicket, {
  count: 200,
});
