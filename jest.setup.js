jest.mock('axios', () => {
    const mockAxios = {
      get: jest.fn(() => Promise.resolve({ data: { message: 'Mocked response' } })),
      create: jest.fn(() => ({
        get: jest.fn(() => Promise.resolve({ data: { message: 'Mocked response' } })),
      })),
    };
  
    return mockAxios;
  });

global.console.warn = jest.fn();
global.console.error = jest.fn();