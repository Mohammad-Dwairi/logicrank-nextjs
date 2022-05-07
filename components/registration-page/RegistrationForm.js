import {useForm} from "react-hook-form";
import {Fragment, useState} from 'react';
import classes from './styles.module.scss';
import AuthFormLayout from "../layout/AuthFormLayout";
import FormGroupWrapper from "../layout/FormGroupWrapper";
import {useAuth} from "../../contexts/AuthContext";

const RegistrationForm = props => {

    const {signup} = useAuth();
    const {register, handleSubmit, watch, formState: {errors}} = useForm();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const onSubmit = async data => {
        try {
            setError('');
            setLoading(true);
            await signup(data.email, data.password);
        } catch {
            setError("Failed to create a new account, try again later!")
        } finally {
            setLoading(false);
        }
    }

    return (
        <Fragment>
            <form onSubmit={handleSubmit(onSubmit)} action='#'>
                <AuthFormLayout img={require('../../public/register.svg')}>
                    <span>{error}</span>
                    <FormGroupWrapper>
                        <label htmlFor='fullName'>Full Name</label>
                        <input
                            {...register("fullName", {required: true})}
                            id='fullName'
                            type="text"
                            placeholder="Enter your full name"
                            className={classes.authInput}
                        />
                        {errors.fullName && <span className='text-danger'>Invalid Full Name</span>}
                    </FormGroupWrapper>
                    <FormGroupWrapper>
                        <label htmlFor='email'>Email Address</label>
                        <input
                            {...register("email", {required: true})}
                            id='email'
                            type="email"
                            placeholder="Enter your email address"
                            className={classes.authInput}
                        />
                        {errors.email && <span className='text-danger'>Invalid Email</span>}
                    </FormGroupWrapper>
                    <FormGroupWrapper>
                        <label htmlFor='email'>Password</label>
                        <input
                            {...register("password", {required: true, minLength: 8})}
                            id='password'
                            type="password"
                            placeholder="Enter a new password"
                            className={classes.authInput}
                        />
                        {errors.password && <span className='text-danger'>Password must be at least 8 characters</span>}
                    </FormGroupWrapper>
                </AuthFormLayout>
                <input type="submit" className={classes.authButton} value='Register'/>
            </form>
        </Fragment>
    );
};

export default RegistrationForm;