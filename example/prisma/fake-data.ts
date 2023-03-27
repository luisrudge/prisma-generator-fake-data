import type { Prisma } from '@prisma/client';
import { faker } from '@faker-js/faker';
import { fakeSettings } from './fakeData.utils';

export function fakeUser(
  overrides?: Partial<Omit<Prisma.UserUncheckedCreateInput, ''>>,
) {
  return {
    email: faker.internet.email(),
    name: faker.name.fullName(),
    age: faker.datatype.number({ min: 0, max: 99 }),
    settings: fakeSettings(),
    maybeString: faker.datatype.boolean() ? undefined : faker.lorem.words(5),
    status: faker.helpers.arrayElement(['active', 'inactive']),
    ...overrides,
  };
}
