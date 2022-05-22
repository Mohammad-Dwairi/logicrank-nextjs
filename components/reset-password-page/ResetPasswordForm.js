import AuthFormLayout from "../layout/AuthFormLayout";
import classes from "../login-page/styles.module.scss";
import FormGroupWrapper from "../layout/FormGroupWrapper";
import {useForm} from "react-hook-form";
import {useState} from "react";
import Link from "next/link";
import {fbrResetPassword} from "../../firebase/functions/auth-functions";


const ResetPasswordForm = props => {

    const {register, handleSubmit, watch, formState: {errors}} = useForm();

    const [loading, setLoading] = useState(false);
    const [completed, setCompleted] = useState(false);
    const [error, setError] = useState('');

    const onSubmit = async data => {
        try {
            setLoading(true);
            setError('');
            await fbrResetPassword(data.email);
            setCompleted(true);
        } catch (e) {
            setError('Something went wrong, Please try again later')
        } finally {
            setLoading(false)
        }
    };


    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {completed &&
                <div className='text-center'>
                    <div className='text-success my-3'>Please check your email to complete resetting your password</div>
                    <Link href='/login' passHref>
                        <a>Continue to Login</a>
                    </Link>
                </div>
            }
            {!completed && <>
                <AuthFormLayout>
                    {error && <span className='text-danger'>{error}</span>}
                    <FormGroupWrapper>
                        <label htmlFor='email'>Please enter your email address to reset your password</label>
                        <input
                            {...register("email", {required: true})}
                            id='email'
                            type="email"
                            placeholder="Enter email"
                            style={{width: '100%'}}
                            className={classes.authInput}
                        />
                        {errors.email && <span className='text-danger'>Invalid email</span>}
                    </FormGroupWrapper>

                </AuthFormLayout>
                <input type="submit" className={classes.authButton} value='Reset Password' disabled={loading}/>
            </>}
        </form>
    );
};

export default ResetPasswordForm;