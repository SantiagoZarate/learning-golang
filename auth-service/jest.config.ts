import { pathsToModuleNameMapper } from 'ts-jest'
import { compilerOptions } from './tsconfig.json'
import { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  coverageProvider: "v8",
  modulePaths: [compilerOptions.baseUrl],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
  cacheDirectory: ".tmp/jestCache",
  extensionsToTreatAsEsm: [".ts"],
  // collectCoverage: true,
  // collectCoverageFrom: ["src/**/*.ts"],
  transform: {
    '^.+\\.tsx?$': ['ts-jest', { useESM: true }]
  },
  testPathIgnorePatterns: ['./dist'],
  transformIgnorePatterns: ["/node_modules/(?!(drizzle-orm|@electric-sql/pglite)/)"],
};

export default config;