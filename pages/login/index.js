import LoginForm from "../../components/login-page/LoginForm";
import AuthPageLayout from "../../components/layout/AuthPageLayout";

const LoginPage = () => {

    return (
        <AuthPageLayout headerTitle='Login' headerText='Welcome back!' login>
            <LoginForm />
        </AuthPageLayout>
    );
};

export default LoginPage;