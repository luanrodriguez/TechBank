import { Routes, Route, Navigate } from "react-router-dom";

import { HomePage } from './pages/Home'
import { LoginPage } from './pages/Login'
import { RegisterPage } from "./pages/Register";
import { TransactionsPage } from "./pages/Transactions";
import { AuthContext } from './contexts/Auth'

function Router() {
    function PrivateRoute ({children}: any) {
        const user = localStorage.getItem('user')


        if(user) {
            return children
        }

        return <Navigate to={'/login'} />
    }   

    return (
        <AuthContext>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/" element={
                    <PrivateRoute><HomePage /></PrivateRoute>
                } />
                <Route path="/transactions" element={
                    <PrivateRoute><TransactionsPage /></PrivateRoute>
                } />
                <Route path="/register" element={<RegisterPage />} />
            </Routes>
        </AuthContext>
    )
}

export default Router;