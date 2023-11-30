import nextJest from 'next/jest.js'

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './'
})

const dbTestConfig = {
  testRunnerOptions: {
    runInBand: true
  },
  //resetMocks: true,
  maxWorkers: 1,
  clearMocks: true,
  displayName: 'db',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js']
}

const clientTestConfig = {
  displayName: 'client',
  testEnvironment: 'jest-environment-jsdom',
  testMatch: ['**/__tests__/client/*.[jt]s?(x)'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js']
}

const serverTestConfig = {
  displayName: 'server',
  testEnvironment: 'node',
  testMatch: ['**/__tests__/server/*.[jt]s?(x)'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js']
}

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const config = {
  // Add more setup options before each test is run
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  projects: [
    await createJestConfig(dbTestConfig)(),
    await createJestConfig(clientTestConfig)(),
    await createJestConfig(serverTestConfig)()
  ]

  // testEnvironment: 'jest-environment-jsdom',
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config)
