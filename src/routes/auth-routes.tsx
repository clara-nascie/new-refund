//neste arquivo ficam as rotas de autenticação

import { Routes, Route } from 'react-router';
import { SignIn } from '../pages/signIn';


export function AuthRoutes() {
    return (
        <Routes>
            <Route path="/" element={<SignIn />} />
        </Routes>
    );
}