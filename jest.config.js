module.exports = {
    preset: 'ts-jest',
    transform: {
        '^.+\\.(ts|tsx)?$': 'ts-jest'
    },
    setupFilesAfterEnv: ['<rootDir>/src/utils/prisma-mock.ts'],
};