import { faker } from '@faker-js/faker';
export function fakeSettings() {
  return {
    notificationsEnabled: faker.datatype.boolean(),
    preferredColor: faker.color.rgb(),
  };
}
