//nesse arquivo decidimos qual tipo de rota o usuário vai usar dependendo se está logado ou não

import { BrowserRouter } from 'react-router';
// import { AuthRoutes } from './AuthRoutes';
// import { EmployeeRoutes } from './EmployeeRoutes';
import { ManagerRoutes } from './ManagerRoutes';

//serve para criar as rotas da aplicação, importando outras rotas
export function Routes(){
    // Altere para `true` para testar as rotas de funcionário logado (Refund)
    // Altere para `false` para testar as rotas de autenticação (Login / Cadastro)
    // const isLogged = true; 

    return (
        <BrowserRouter>
            <ManagerRoutes />
        </BrowserRouter>
    );
}