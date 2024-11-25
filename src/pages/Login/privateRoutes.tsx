import React from 'react';

interface PrivateRouteProps {
  element: JSX.Element;
  isAdmin?: boolean;
}

// Verifica se o usuário é admin (opcional)
export const isUserAdmin = () => {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decodifica o token JWT
      return decodedToken.claims.perfil === 'Administrador'; // Altere 'perfil' se necessário
    } catch (error) {
      console.error("Erro ao decodificar token:", error);
      return false;
    }
  }
  return false;
};

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element, isAdmin }) => {

    /*const token = localStorage.getItem('token');

    const isAuthenticated = !!token;


  if (!isAuthenticated) {
    console.log("Redirecionando para login, não autenticado.");
    return <Navigate to="/" replace />;
  }

  if (isAdmin && !isUserAdmin()) {
    console.log("Redirecionando para login, não é admin.");
    return <Navigate to="/home" replace />;
  } */

  return element;
};

export default PrivateRoute;
