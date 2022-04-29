import Form from "react-bootstrap/Form";

import {Fragment} from "react";
import classes from './styles.module.scss';
import {useForm} from "react-hook-form";
import AuthFormLayout from "../layout/AuthFormLayout";
import FormGroupWrapper from "../layout/FormGroupWrapper";

const LoginForm = props => {

    const {register, handleSubmit, watch, formState: {errors}} = useForm();
    const onSubmit = data => console.log(data);

    return (
        <Fragment>
            <form onSubmit={handleSubmit(onSubmit)} action='#'>
                <AuthFormLayout img={require('../../public/think.svg')}>
                    <FormGroupWrapper>
                        <label htmlFor='email'>Email address</label>
                        <input
                            {...register("email", {required: true})}
                            id='email' type="email"
                            placeholder="Enter email"
                            style={{width: '100%'}}
                            className={classes.authInput}
                        />
                        {(errors.Email || errors.Password) && <span className='text-danger'>Invalid email or password</span>}
                    </FormGroupWrapper>
                    <FormGroupWrapper>
                        <label htmlFor='password'>Password</label>
                        <input
                            {...register("password", {required: true})}
                            id='password'
                            type="password"
                            placeholder="Password"
                            className={classes.authInput}
                        />
                    </FormGroupWrapper>
                    <Form.Group className="mb-3">
                        <Form.Check type="checkbox" label="Remember me"/>
                    </Form.Group>
                </AuthFormLayout>
                <input type="submit" className={classes.authButton} value='Login'/>
            </form>

        </Fragment>

    );
};

export default LoginForm;