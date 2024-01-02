# prisma-generator-fake-data

![Generated with Bing Image Creator. Prompt: create a logo with a cute panda smiling and holding a triangular prisma, digital art](assets/logo.jpg)

<sup><sub>_Generated with Bing Image Creator. Prompt: create a logo with a cute panda smiling and holding a triangular prisma, digital art_</sub></sup>

![npm](https://img.shields.io/npm/v/prisma-generator-fake-data)
![GitHub Workflow Status (with branch)](https://img.shields.io/github/actions/workflow/status/luisrudge/prisma-generator-fake-data/CI.yml?branch=main)

## The easiest way to generate mock data based on your Prisma models!

### What is prisma-generator-fake-data?

It's a [Prisma Generator](https://www.prisma.io/docs/concepts/components/prisma-schema/generators) that uses [faker.js](https://fakerjs.dev/) to create realistic-looking fake data for your Prisma models. With this generator, you can quickly and easily create fake data for your Prisma models, without having to write barely any code.

### Get started

- Setup your Prisma project as usual ([Get Started With Prisma](https://www.prisma.io/docs/getting-started))
- Install this package
  - `npm install -D prisma-generator-fake-data`
  - `yarn add -D prisma-generator-fake-data`
  - `pnpm install -D prisma-generator-fake-data`
- Modify your Prisma model file
  ```prisma
  generator custom_generator {
      provider = "prisma-generator-fake-data"
      output   = "../types/fake-data.ts"
  }
  ```
- Run `npx prisma generate`

You're all done!

> If you prefer, you can easily get started with [this CodeSandbox.](https://codesandbox.io/p/sandbox/prisma-generator-fake-data-example-xplkvs?file=%2Fscript.ts&selection=%5B%7B%22endColumn%22%3A6%2C%22endLineNumber%22%3A38%2C%22startColumn%22%3A6%2C%22startLineNumber%22%3A38%7D%5D)

### Usage

Once the file is generated, you can import it in your project.

```prisma
generator client {
  provider = "prisma-client-js"
}

generator custom_generator {
  provider = "prisma-generator-fake-data"
  /// by default, the file will be generated at `./prisma/fake-data.ts`
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id       String        @id @default(cuid())
  email    String        @unique
  name     String
  /// Use comments to specify the faker method. For example:
  ///FAKE:faker.location.streetAddress({ useFullAddress: true })
  address  String
  ///FAKE:{notificationsEnabled: faker.datatype.boolean(), preferredColor: faker.color.rgb()}
  settings Json
  status   UserStatus
  profile  Profile?
}

model Profile {
  id                Int              @id @default(autoincrement())
  someConfiguration Boolean
  userId            String           @unique
  user              User             @relation(fields: [userId], references: [id])
}

enum UserStatus {
  active
  inactive
}
```

```ts
import { fakeUser, fakeProfileComplete } from './prisma/fake-data'; //or your custom output path

console.log(fakeUser());
console.log(fakeProfileComplete());
/*
{
  email: 'Ella.Mayer@gmail.com',
  name: 'Lana Gulgowski',
  age: 81,
  settings: { notificationsEnabled: true, preferredColor: '#ee5344' },
  maybeString: undefined,
  status: 'active'
}
{
  id: 96601,
  someConfiguration: true,
  userId: '821cf67a-dd86-49d7-b0e4-9ad451ad173d'
}
*/
```

### Generator options

| Option       | Required | Default            | Example                                                   | Description                                                                                                                                                                                                               |
| ------------ | -------- | ------------------ | --------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| output       | no       | `"./fake-data.ts"` | `"../types/fake-data.ts"`                                 | Path where the file will be exported to. Base folder is your prisma folder.                                                                                                                                               |
| extraImport  | no       | `""`               | `"import {myCustomFunction} from '../utils/fakeImports'"` | This import will be added to your generated file. Useful when you want to use a custom function to generate fake JSON data. You can use your TypeScript aliases. Base folder is your prisma folder.                       |
| extraExport  | no       | `""`               | `"export * from '../utils/fakeImports'"`                  | This export will be added to your generated file. Useful when you want to export all of the fake methods created by this generator from the same file. Base folder is your prisma folder.                                 |
| emptyValueAs | no       | `"undefined"`      | `"null"`                                                  | By default, optional fields will be generated with `undefined`. You can change this behavior by overriding this parameter. You can use a function imported in `extraImport` or just pass a hardcoded value like `"null"`. |
|              |          |                    |

### Fields with special treatment:

- `name`, `fullName`, `firstName`, `lastName`, and `age` will use specific `faker-js` methods to appear more realistic.
- If you have an optional Prisma field (e.g., `message String?`), the fake data generator will always return `undefined` for that property (customizable through the `emptyValueAs` option).
- If you have a `JSON` Prisma field, you can add your own data shape by adding a special comment above your field.
  - Example: `///FAKE:{test: faker.lorem.word()}`
  - Keep in mind that the generator will simply relay whatever is after the `FAKE:` string to your generated code, so it needs to be valid TypeScript.
  - By using the `extraImport` generator option, you can create your own helper methods to generate fake data for your JSON fields

<sup><sub>Inspired by https://github.com/toyamarinyon/prisma-factory-generator</sub></sup>

<sup><sub>This generator was bootstrapped using [create-prisma-generator](https://github.com/YassinEldeeb/create-prisma-generator)
</sub></sup>
