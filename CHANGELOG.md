# Changelog

## [0.15.0](https://github.com/luisrudge/prisma-generator-fake-data/compare/v0.14.3...v0.15.0) (2025-05-06)

### ⚠️ BREAKING CHANGES ⚠️

- This version requires Prisma 6.7.0 or higher. If you're using an older version of Prisma, please stay on version 0.14.3.

### Features

- Add support for prisma 6.7.0+ ([#29](https://github.com/luisrudge/prisma-generator-fake-data/issues/29)) ([c0b070b](https://github.com/luisrudge/prisma-generator-fake-data/commit/c0b070b8b663e72b09808dfcb37a77517a51a6f7))

### [0.14.3](https://github.com/luisrudge/prisma-generator-fake-data/compare/v0.14.2...v0.14.3) (2024-11-01)

### Bug Fixes

- Integer data type fields should not be returning bigint's ([8c15f32](https://github.com/luisrudge/prisma-generator-fake-data/commit/8c15f324793795b833f76bc48b1418f05fca4e32))

### [0.14.2](https://github.com/luisrudge/prisma-generator-fake-data/compare/v0.14.1...v0.14.2) (2024-03-22)

### Bug Fixes

- Correctly generate import path on Windows ([56ec5e0](https://github.com/luisrudge/prisma-generator-fake-data/commit/56ec5e0678c776dccf12dcb2ecb4c9aa3a83671e))

### [0.14.1](https://github.com/luisrudge/prisma-generator-fake-data/compare/v0.14.0...v0.14.1) (2024-01-25)

### Bug Fixes

- Correctly generate import path ([0ff1424](https://github.com/luisrudge/prisma-generator-fake-data/commit/0ff142467ea4a96195ed4b9528c531a4c3c70d92))

## [0.14.0](https://github.com/luisrudge/prisma-generator-fake-data/compare/v0.13.0...v0.14.0) (2024-01-25)

### Features

- Support array of default enums https://github.com/luisrudge/prisma-generator-fake-data/pull/22
- Generate Decimals using Decimal.js #21 https://github.com/luisrudge/prisma-generator-fake-data/pull/21
- Allow overriding faker method using prisma comment #20

### Bug Fixes

- fix BigInt generation, fix example folder ([82e0d4e](https://github.com/luisrudge/prisma-generator-fake-data/commit/82e0d4ecb7c6ce0730edb6c1fe9dede85fc89522))

## [0.13.0](https://github.com/luisrudge/prisma-generator-fake-data/compare/v0.12.0...v0.13.0) (2023-11-23)

### Features

- Use optional client output location when it exists ([130bed7](https://github.com/luisrudge/prisma-generator-fake-data/commit/130bed7c9a3b4a5bdfee8f7bbf785f7eb7a2bb8d))

## [0.12.0](https://github.com/luisrudge/prisma-generator-fake-data/compare/v0.11.1...v0.12.0) (2023-11-15)

### Features

- add support for enum arrays with default value ([eab337c](https://github.com/luisrudge/prisma-generator-fake-data/commit/eab337cac34b4da9b250142925dda629e8c75fc3))

### [0.11.1](https://github.com/luisrudge/prisma-generator-fake-data/compare/v0.11.0...v0.11.1) (2023-11-08)

### Bug Fixes

- Update createMethods.ts wrong function call ([efa2928](https://github.com/luisrudge/prisma-generator-fake-data/commit/efa2928426c3a948f7f5a5844e228536cfeba46e))

## [0.11.0](https://github.com/luisrudge/prisma-generator-fake-data/compare/v0.10.0...v0.11.0) (2023-09-27)

### Features

- update to use faker 7.x -> 9.x ([261e7a2](https://github.com/luisrudge/prisma-generator-fake-data/commit/261e7a2ccb8f486d89dd22b7efbff57c98063a44))

### Bug Fixes

- remove settings.json ([67633df](https://github.com/luisrudge/prisma-generator-fake-data/commit/67633df103d94677370188bea3a37a86ca11ed91))

## [0.10.0](https://github.com/luisrudge/prisma-generator-fake-data/compare/v0.9.0...v0.10.0) (2023-07-21)

### Features

- upgrade to prisma 5 ([2f879a2](https://github.com/luisrudge/prisma-generator-fake-data/commit/2f879a21025d26e5bd57713c3fbe8b18a0451f7f))

## [0.9.0](https://github.com/luisrudge/prisma-generator-fake-data/compare/v0.8.0...v0.9.0) (2023-07-14)

### Features

- add option to default to null instead of undefined fix [#11](https://github.com/luisrudge/prisma-generator-fake-data/issues/11) ([1dbf9d2](https://github.com/luisrudge/prisma-generator-fake-data/commit/1dbf9d2feb0f33b0c0de9e0abc006afcc9ec89b2))

## [0.8.0](https://github.com/luisrudge/prisma-generator-fake-data/compare/v0.7.0...v0.8.0) (2023-05-29)

### Bug Fixes

- render fake values for JSON fields with default values ([55fefba](https://github.com/luisrudge/prisma-generator-fake-data/commit/55fefba6be537e397bf8520a5d139b7c537e66e6))

## [0.7.0](https://github.com/luisrudge/prisma-generator-fake-data/compare/v0.6.0...v0.7.0) (2023-04-06)

### Features

- render real enums; render optional fields as undefined; render default values when available ([70b21fc](https://github.com/luisrudge/prisma-generator-fake-data/commit/70b21fc0782c83f792c063227cabc5a617e674a3))

## [0.6.0](https://github.com/luisrudge/prisma-generator-fake-data/compare/v0.5.0...v0.6.0) (2023-04-05)

### Features

- remove overrides and add fake\*Complete methods with foreign keys ([e370ab4](https://github.com/luisrudge/prisma-generator-fake-data/commit/e370ab4d42a505a72bb5290a6ef8dbd00813febc))

### Bug Fixes

- render enums with `as const` ([1e1946d](https://github.com/luisrudge/prisma-generator-fake-data/commit/1e1946d35fcb150256432344688261ac95109277))

### [0.5.1](https://github.com/luisrudge/prisma-generator-fake-data/compare/v0.5.0...v0.5.1) (2023-03-31)

### Bug Fixes

- render enums with `as const` ([1e1946d](https://github.com/luisrudge/prisma-generator-fake-data/commit/1e1946d35fcb150256432344688261ac95109277))

## [0.5.0](https://github.com/luisrudge/prisma-generator-fake-data/compare/v0.4.1...v0.5.0) (2023-03-30)

### Features

- add extraExport field ([6558bce](https://github.com/luisrudge/prisma-generator-fake-data/commit/6558bcef6cb6877409bdf660505bc8487ec57613))

### [0.4.1](https://github.com/luisrudge/prisma-generator-fake-data/compare/v0.4.0...v0.4.1) (2023-03-28)

### Bug Fixes

- remove prettier as dependency ([ed2ae92](https://github.com/luisrudge/prisma-generator-fake-data/commit/ed2ae92a39ec8a0141d270d5f60fd9d472de5ff3))

## [0.4.0](https://github.com/luisrudge/prisma-generator-fake-data/compare/v0.3.5...v0.4.0) (2023-03-27)

### Features

- add extraImport option ([3362156](https://github.com/luisrudge/prisma-generator-fake-data/commit/3362156c9866acd2fb76d9987b3121eddde35ab7))

### [0.3.5](https://github.com/luisrudge/prisma-generator-fake-data/compare/v0.3.4...v0.3.5) (2023-03-26)

### Bug Fixes

- return undefined for optional fields ([0d92c64](https://github.com/luisrudge/prisma-generator-fake-data/commit/0d92c6401b018830f4b9057c1f4e5144c2c9334a))

### [0.3.4](https://github.com/luisrudge/prisma-generator-fake-data/compare/v0.3.3...v0.3.4) (2023-03-26)

### Bug Fixes

- empty omit ([a097169](https://github.com/luisrudge/prisma-generator-fake-data/commit/a097169cc1639d4b1cf22a1ce218a0ed938410b3))

### [0.3.3](https://github.com/luisrudge/prisma-generator-fake-data/compare/v0.3.2...v0.3.3) (2023-03-26)

### Bug Fixes

- omit relation fields from overrides types ([a0936d5](https://github.com/luisrudge/prisma-generator-fake-data/commit/a0936d5270f6a15a9cf525d9b97ab78db631af70))

### [0.3.2](https://github.com/luisrudge/prisma-generator-fake-data/compare/v0.3.1...v0.3.2) (2023-03-26)

### Bug Fixes

- parse json field during creation ([9dcbf15](https://github.com/luisrudge/prisma-generator-fake-data/commit/9dcbf15b3b10ecbf090fff7f67df68e204da92a7))

### [0.3.1](https://github.com/luisrudge/prisma-generator-fake-data/compare/v0.3.0...v0.3.1) (2023-03-26)

## [0.3.0](https://github.com/luisrudge/prisma-generator-fake-data/compare/v0.2.0...v0.3.0) (2023-03-26)

### Features

- handle non-required fields ([4d60be7](https://github.com/luisrudge/prisma-generator-fake-data/commit/4d60be7ce259113157c3eba208ce5f986d5de738))

### 0.2.0 (2023-03-26)

##### New Features

- custom data shapes for JSON fields ([a2432738](https://github.com/luisrudge/prisma-generator-fake-data/commit/a24327385e886ed59ba6005b04380d9f8e439a1d))
- add name, fullName, firstName faker methods ([5ff33fa4](https://github.com/luisrudge/prisma-generator-fake-data/commit/5ff33fa48f66bbdc6c310831bedd1f76292c1274))

#### 0.1.2 (2023-03-26)

##### Chores

- update pkg.json ([f3d61b46](https://github.com/luisrudge/prisma-generator-fake-data/commit/f3d61b46b0730fa080c74100135916df4a5a9614))
- simplify repo (remove yarn workspaces) ([7a405c23](https://github.com/luisrudge/prisma-generator-fake-data/commit/7a405c239c0ac52b7d345d7f4a2f6da008d1fd37))
- add readme to npm package ([335f0f44](https://github.com/luisrudge/prisma-generator-fake-data/commit/335f0f44070224360fbf6a40762b786b984763ba))
- remove semantic-release ([c423484c](https://github.com/luisrudge/prisma-generator-fake-data/commit/c423484c4cd0be4bd20a01b7fdccb20c7b6febab))
- remove publish stuff from gh ([01d74225](https://github.com/luisrudge/prisma-generator-fake-data/commit/01d74225bb0207a301167cef067900496424c353))
- remove windows from CI ([2167a863](https://github.com/luisrudge/prisma-generator-fake-data/commit/2167a8637dc01fd12af673c2b74baa6d7dee3d25))
- ci ([137a9cc5](https://github.com/luisrudge/prisma-generator-fake-data/commit/137a9cc5fc641972b6aca3cb3f0cc985c7a5662a))
- fix ci ([756499b2](https://github.com/luisrudge/prisma-generator-fake-data/commit/756499b24741d842a7e82a69d76dbb0f74bf3ff4))

##### Documentation Changes

- copy ([c5f379e7](https://github.com/luisrudge/prisma-generator-fake-data/commit/c5f379e78a26215efd5037f4f50db4441a956da7))
- prisma syntax highlighting ([6aa59966](https://github.com/luisrudge/prisma-generator-fake-data/commit/6aa5996642bdc017452349729b92de40a40a1691))
- add readme info ([441b21a9](https://github.com/luisrudge/prisma-generator-fake-data/commit/441b21a93bdb1ab8e9073098f7234eadaec89e09))

##### New Features

- initial release ([9a3d2f59](https://github.com/luisrudge/prisma-generator-fake-data/commit/9a3d2f59d585dbf1d67612207bb9a7d5ac2368d1))
- initial commit ([6fecd886](https://github.com/luisrudge/prisma-generator-fake-data/commit/6fecd8861a5a0fc8964f21c9b882e4a4cdf411a8))
