module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // Para lidar com imports de estilos
  },
  transform: {
    '^.+\\.tsx?$': 'ts-jest', // Transforma arquivos TypeScript
    '^.+\\.[t|j]sx?$': 'babel-jest', // Transforma arquivos JavaScript e TypeScript com babel-jest
  },
  testPathIgnorePatterns: ['/node_modules/', '/dist/'], // Ignorar pastas desnecessárias
  transformIgnorePatterns: [
    "node_modules/(?!axios)" // Exclui axios da lista de arquivos ignorados
  ],
};
