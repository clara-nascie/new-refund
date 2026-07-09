//nesse arquivo decidimos qual tipo de rota o usuário vai usar dependendo se está logado ou não

import { BrowserRouter } from 'react-router';
import { AuthRoutes } from './AuthRoutes';

//serve para criar as rotas da aplicação, importando outras rotas
export function Routes(){
    return (
        <BrowserRouter>
            <AuthRoutes />
        </BrowserRouter>
    );
}