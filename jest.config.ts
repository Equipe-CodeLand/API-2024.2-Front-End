module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    moduleNameMapper: {
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // Para lidar com imports de estilos
    },
    transform: {
      '^.+\\.tsx?$': 'ts-jest', // Transforma arquivos TypeScript
    },
    testPathIgnorePatterns: ['/node_modules/', '/dist/'], // Ignorar pastas desnecessárias
  };
  