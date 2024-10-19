import React from 'react';
import { Route, Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  element: JSX.Element;
  isAdmin?: boolean;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element, isAdmin }) => {
  const token = localStorage.getItem('token');

  // Aqui você pode adicionar lógica para verificar se o usuário é admin
  const isAuthenticated = !!token; // Altere conforme a sua lógica de autenticação
  console.log("Token:", token); // Log do token
  console.log("Is Authenticated:", isAuthenticated); // Log do estado de autenticação

  // Verifica se o usuário é admin (opcional)
  const isUserAdmin = () => {
    if (token) {
      try {
        const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decodifica o token JWT
        console.log("Decoded Token:", decodedToken); // Log do token decodificado
        return decodedToken.perfil === 'Administrador'; // Altere 'perfil' se necessário
      } catch (error) {
        console.error("Erro ao decodificar token:", error);
        return false;
      }
    }
    return false;
  };

  if (!isAuthenticated) {
    console.log("Redirecionando para login, não autenticado.");
    return <Navigate to="/" replace />;
  }

  if (isAdmin && !isUserAdmin()) {
    console.log("Redirecionando para login, não é admin.");
    return <Navigate to="/" replace />;
  }

  return element;
};

export default PrivateRoute;
