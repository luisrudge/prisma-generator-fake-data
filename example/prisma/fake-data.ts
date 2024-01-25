import { UserStatus } from '/Users/luisrudge/code/oss/prisma-generator-fake-data/example/node_modules/@prisma/client';
import { faker } from '@faker-js/faker';
import { fakeSettings } from './fakeData.utils';
export * from './fakeData.utils';

export function fakeUser() {
  return {
    email: faker.internet.email(),
    name: faker.person.fullName(),
    age: faker.number.int({ min: 0, max: 99 }),
    settings: fakeSettings(),
    ok: faker.number.int(),
    maybeString: undefined,
    status: faker.helpers.arrayElement([
      UserStatus.active,
      UserStatus.inactive,
    ] as const),
  };
}
export function fakeUserComplete() {
  return {
    id: faker.string.uuid(),
    email: faker.internet.email(),
    name: faker.person.fullName(),
    age: faker.number.int({ min: 0, max: 99 }),
    settings: fakeSettings(),
    ok: faker.number.int(),
    maybeString: undefined,
    status: faker.helpers.arrayElement([
      UserStatus.active,
      UserStatus.inactive,
    ] as const),
    status2: UserStatus.active,
  };
}
export function fakeProfile() {
  return {
    someConfiguration: faker.datatype.boolean(),
  };
}
export function fakeProfileComplete() {
  return {
    id: faker.number.int(),
    someConfiguration: faker.datatype.boolean(),
    userId: faker.string.uuid(),
  };
}
export function fakeProfileSettings() {
  return {
    someConfiguration: faker.datatype.boolean(),
  };
}
export function fakeProfileSettingsComplete() {
  return {
    id: faker.number.int(),
    someConfiguration: faker.datatype.boolean(),
    profileId: faker.number.int(),
  };
}
