import type { Prisma } from '@prisma/client';
import { faker } from '@faker-js/faker';

export function fakeUser(overrides?: Partial<Prisma.UserUncheckedCreateInput>) {
  return {
    email: faker.internet.email(),
    name: faker.name.fullName(),
    age: faker.datatype.number({ min: 0, max: 99 }),
    settings: {
      notificationsEnabled: faker.datatype.boolean(),
      preferredColor: faker.color.rgb(),
    },
    maybeString: faker.datatype.boolean() ? null : faker.lorem.words(5),
    status: faker.helpers.arrayElement(['active', 'inactive']),
    ...overrides,
  };
}
