# prisma-generator-fake-data

![Generated with Bing Image Creator. Prompt: create a logo with a cute panda smiling and holding a triangular prisma, digital art](assets/logo.jpg)

_Generated with Bing Image Creator. Prompt: create a logo with a cute panda smiling and holding a triangular prisma, digital art_

## The easiest way to generate mock data based on your Prisma models!

#### What is Prisma-Generator-Fake-Data?

Prisma-Generator-Fake-Data is a generator that uses [faker.js](https://fakerjs.dev/) to create realistic-looking fake data for your Prisma models. With this generator, you can quickly and easily create fake data for your Prisma models, without having to write any code.

#### Get started

- Setup your Prisma project as usual ([Get Started With Prisma](https://www.prisma.io/docs/getting-started))
- Install this package
  - `npm install -D prisma-generator-fake-data`
  - `yarn add -D prisma-generator-fake-data`
  - `pnpm install -D prisma-generator-fake-data`
- Modify your Prisma model file
  ```
  generator custom_generator {
      provider = "prisma-generator-fake-data"
      /// File will be generated in this path
      output   = "../types/fake-data.ts"
  }
  ```
- Run `npx prisma generate`

You're all done!

#### Usage

Once the file is generated, you can import it in your project.

Prisma Model:

```
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
  status   UserStatus
}

enum UserStatus {
  active
  inactive
}
```

```ts
import { fakeUser } from './prisma/fake-data'; //or your custom output path

console.log(fakeUser());
/*
{
  email: 'Yadira.Gutmann9@hotmail.com',
  name: 'cum totam molestiae perferendis recusandae',
  status: 'active'
}
*/
```

<sup><sub>Inspired by https://github.com/toyamarinyon/prisma-factory-generator</sub></sup>

<sup><sub>This generator was bootstraped using [create-prisma-generator](https://github.com/YassinEldeeb/create-prisma-generator)
</sub></sup>