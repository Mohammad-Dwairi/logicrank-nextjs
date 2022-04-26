import classes from "./styles.module.scss";
import Image from "next/image";
import AppFooter from "./AppFooter";


const AuthPagesLayout = props => {

    return (
        <div className={classes.authPageBackground}>
            <div className={classes.authPageLogo}>
                <Image src={require('../../public/logo.png')}/>
            </div>
            <div className={classes.authFormContainer}>
                <div className={classes.authFormCard}>
                    {props.children}
                </div>
            </div>
            <AppFooter />
        </div>
    );
};

export default AuthPagesLayout;