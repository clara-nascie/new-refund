//neste arquivo ficam as rotas de autenticação

import { Routes, Route } from 'react-router';

import { AuthLayout } from '../components/AuthLayout';
import { SignIn } from '../pages/signIn';


export function AuthRoutes() {
    return (
        <Routes>
            <Route path="/" element={<AuthLayout />}>
                <Route path="/" element={<SignIn />} />
            </Route>
        </Routes>
    );
}