import LoginForm from "../../components/login-page/LoginForm";
import AuthPagesLayout from "../../components/layout/AuthPagesLayout";

const LoginPage = () => {

    return (
        <AuthPagesLayout>
            <LoginForm/>
        </AuthPagesLayout>
    );
};

export default LoginPage;