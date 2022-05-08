import classes from "./styles.module.scss";
import Image from "next/image";
import AuthFormFooter from "./AuthFormFooter";


const AuthPageLayout = props => {

    const {headerTitle, headerText, children, login, isResetPage} = props;

    return (
        <div className={classes.authPageBackground}>
            <div className={classes.authPageLogo}>
                <Image src={require('../../public/logo.png')} alt='logo'/>
            </div>
            <div className={classes.authFormContainer}>
                <div className={classes.authFormCard}>
                    {!isResetPage && <div className={classes.cardHeaderContainer}>
                        <h1 className={classes.cardHeaderText}>{headerTitle}</h1>
                        <p className='text-muted mx-2'>{headerText}</p>
                    </div>}
                    <div className={classes.formContainer}>
                        {children}
                    </div>
                    {!isResetPage && <AuthFormFooter login={login}/>}
                </div>
            </div>
        </div>
    );
};

export default AuthPageLayout;