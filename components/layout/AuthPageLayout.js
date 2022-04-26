import classes from "./styles.module.scss";
import Image from "next/image";
import AppFooter from "./AppFooter";
import Link from "next/link";
import AuthFormFooter from "./AuthFormFooter";


const AuthPageLayout = props => {

    const {headerTitle, headerText, children, login} = props;

    return (
        <div className={classes.authPageBackground}>
            <div className={classes.authPageLogo}>
                <Image src={require('../../public/logo.png')}/>
            </div>
            <div className={classes.authFormContainer}>
                <div className={classes.authFormCard}>
                    <div className={classes.cardHeaderContainer}>
                        <h1 className={classes.cardHeaderText}>{headerTitle}</h1>
                        <p className='text-muted mx-2'>{headerText}</p>
                    </div>
                    <div className={classes.formContainer}>
                        {children}
                    </div>
                   <AuthFormFooter login={login}/>
                </div>
            </div>
            <AppFooter/>
        </div>
    );
};

export default AuthPageLayout;