import type { Prisma } from '@prisma/client';
import { faker } from '@faker-js/faker';
import { fakeSettings } from './fakeData.utils';
export * from './fakeData.utils';

export function fakeUser() {
  return {
    email: faker.internet.email(),
    name: faker.name.fullName(),
    age: faker.datatype.number({ min: 0, max: 99 }),
    settings: fakeSettings(),
    maybeString: faker.datatype.boolean() ? undefined : faker.lorem.words(5),
    status: faker.helpers.arrayElement(['active', 'inactive'] as const),
  };
}
export function fakeUserComplete() {
  return {
    id: faker.datatype.uuid(),
    email: faker.internet.email(),
    name: faker.name.fullName(),
    age: faker.datatype.number({ min: 0, max: 99 }),
    settings: fakeSettings(),
    maybeString: faker.datatype.boolean() ? undefined : faker.lorem.words(5),
    status: faker.helpers.arrayElement(['active', 'inactive'] as const),
  };
}
export function fakeProfile() {
  return {
    someConfiguration: faker.datatype.boolean(),
  };
}
export function fakeProfileComplete() {
  return {
    id: faker.datatype.number(),
    someConfiguration: faker.datatype.boolean(),
    userId: faker.datatype.uuid(),
  };
}
export function fakeProfileSettings() {
  return {
    someConfiguration: faker.datatype.boolean(),
  };
}
export function fakeProfileSettingsComplete() {
  return {
    id: faker.datatype.number(),
    someConfiguration: faker.datatype.boolean(),
    profileId: faker.datatype.number(),
  };
}
