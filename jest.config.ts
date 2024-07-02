export default {
    transform: {
        '^.+\\.tsx?$': [
            'ts-jest',
            {
                tsconfig: 'tsconfig.json',
            },
        ],
    },
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    verbose: true,
    collectCoverage: true,
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    moduleNameMapper: {
        '^@/utils/(.*)$': '<rootDir>/utils/$1',
        '^@/lib/(.*)$': '<rootDir>/lib/$1',
    },
}
