import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define a interface para o usuário
interface User {
    type: string;
    isLoggedIn: boolean;
}

// Define a interface para o contexto
interface AuthContextType {
    user: User;
    setUser: React.Dispatch<React.SetStateAction<User>>;
}

// Cria o contexto com valores iniciais como undefined
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Componente para prover o contexto de autenticação
export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User>({
        type: 'leitor',  // Valor inicial para o tipo de usuário
        isLoggedIn: true // Exemplo de estado de autenticação
    });

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook para acessar o contexto de autenticação
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth deve ser usado dentro de AuthProvider");
    }
    return context;
};
