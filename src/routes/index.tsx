//nesse arquivo decidimos qual tipo de rota o usuário vai usar dependendo se está logado ou não

import { BrowserRouter } from 'react-router';

import { Loading } from '@/components/Loading';

import { AuthRoutes } from './AuthRoutes';
import { EmployeeRoutes } from './EmployeeRoutes';
import { ManagerRoutes } from './ManagerRoutes';

const isLoading = true

//serve para criar as rotas da aplicação, importando outras rotas
export function Routes() {

    if (isLoading) {
        return <Loading />
    }

  return (
    <BrowserRouter>
      <AuthRoutes />
    </BrowserRouter>
  );
}