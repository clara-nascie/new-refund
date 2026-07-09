//neste arquivo ficam as rotas de autenticação

import { Routes, Route } from 'react-router';

import { AuthLayout } from '../components/AuthLayout';
import { SignIn } from '../pages/signIn';
import { SignUp } from '../pages/signUp';
import { NotFound } from '../pages/notFound';


export function AuthRoutes() {
    return (
        <Routes>
            <Route path="/" element={<AuthLayout />}>
                <Route path="/" element={<SignIn />} />
                <Route path="signUp" element={<SignUp />} />
            </Route>
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}