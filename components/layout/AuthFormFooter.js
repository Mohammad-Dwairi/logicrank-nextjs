import classes from "./styles.module.scss";
import Link from "next/link";


const AuthFormFooter = props => {

    const {login} = props;

    return (
        <div className={classes.formFooterContainer}>
            <div className={classes.formFooterText}>
                {
                    login ?
                        <>
                            <div className='text-muted'>
                                Forgot Password?
                                <Link href='#' passHref>
                                    <a className='mx-1'>Reset</a>
                                </Link>
                            </div>
                            <div className='text-muted my-3'>
                                Not a member yet?
                                <Link href='/registration' passHref>
                                    <a className='mx-1'>Register</a>
                                </Link>
                            </div>
                        </>
                        :
                        <div className='text-muted mb-1'>
                            Already a member?
                            <Link href='/login' passHref>
                                <a className='mx-1'>Login</a>
                            </Link>
                        </div>
                }
            </div>
        </div>
    );
};

export default AuthFormFooter;