import type { Prisma } from '@prisma/client';
import { faker } from '@faker-js/faker';

export function fakeUser(overrides?: Partial<Prisma.UserUncheckedCreateInput>) {
  return {
    email: faker.internet.email(),
    name: faker.lorem.words(5),
    status: faker.helpers.arrayElement(['active', 'inactive']),
    ...overrides,
  };
}
