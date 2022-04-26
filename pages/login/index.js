import classes from './styles.module.scss';
import Image from "next/image";
import LoginForm from "../../components/login-page/LoginForm";

const LoginPage = () => {

    return (
        <div className={classes.background}>
            <div className={classes.logo}>
                <Image src={require('../../public/logo.png')}/>
            </div>
            <div className={classes.card}>
                <LoginForm/>
            </div>
        </div>
    );
};

export default LoginPage;