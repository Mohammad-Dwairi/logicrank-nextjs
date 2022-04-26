import Form from "react-bootstrap/Form";
import Image from "next/image";

import classes from './styles.module.scss';
import {Fragment} from "react";
import Link from "next/link";

import {useForm} from "react-hook-form";

const LoginForm = props => {

    const {register, handleSubmit, watch, formState: {errors}} = useForm();
    const onSubmit = data => console.log(data);

    return (
        <Fragment>
            <div className={classes.headerContainer}>
                <h1 className={classes.loginHeaderText}>Login</h1>
                <p className='text-muted mx-2'>Welcome back!</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} action='#'>
                <div className={classes.formContainer}>
                    <div className={classes.formContent}>
                        <div className={classes.formGroup}>
                            <label htmlFor='email'>Email address</label>
                            <input {...register("Email", {required: true})} id='email' type="email" placeholder="Enter email" className={classes.input}/>
                            {(errors.Email || errors.Password) && <span className='text-danger'>Invalid email or password</span>}
                        </div>
                        <div className={classes.formGroup}>
                            <label htmlFor='password'>Password</label>
                            <input {...register("Password", {required: true})} id='password' type="password" placeholder="Password" className={classes.input}/>
                        </div>
                        <Form.Group className="mb-3">
                            <Form.Check type="checkbox" label="Remember me"/>
                        </Form.Group>
                    </div>
                    <div className={classes.image}>
                        <Image src={require('../../public/think.svg')} alt='Thinking'/>
                    </div>
                </div>
                <input type="submit" className={classes.button} value='Login'/>
            </form>
            <div className={classes.footerContainer}>
                <div className={classes.footerText}>
                    <div className='text-muted'>
                        Forgot Password?
                        <Link href='#' passHref>
                            <a className='mx-1'>Reset</a>
                        </Link>
                    </div>
                    <div className='text-muted my-3'>
                        Not a member yet?
                        <Link href='#' passHref>
                            <a className='mx-1'>Register</a>
                        </Link>
                    </div>
                </div>
            </div>
        </Fragment>

    );
};

export default LoginForm;