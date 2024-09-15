export const validateEmail = (email: string) => {
  const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return re.test(String(email).toLowerCase());
};

export const validateCpf = (cpf: string) => {
  const re = /^\d{11}$/;  
  return re.test(cpf);
};

export const formatCpf = (cpf: string) => {
  cpf = cpf.replace(/\D/g, '');  
  if (cpf.length === 11) {
    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  }
  return cpf;
};
