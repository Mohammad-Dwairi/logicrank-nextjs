import Form from "react-bootstrap/Form";

import {Fragment, useState} from "react";
import classes from './styles.module.scss';
import {useForm} from "react-hook-form";
import AuthFormLayout from "../layout/AuthFormLayout";
import FormGroupWrapper from "../layout/FormGroupWrapper";
import {useAuth} from "../../contexts/AuthContext";

const LoginForm = props => {

    const {login} = useAuth();

    const {register, handleSubmit, watch, formState: {errors}} = useForm();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const onSubmit = async data => {
        try {
            setLoading(true);
            setError('');
            await login(data.email, data.password);
        } catch (e) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Fragment>
            <form onSubmit={handleSubmit(onSubmit)} action='#'>
                {error && <span className='text-danger'>{error}</span>}
                <AuthFormLayout img={require('../../public/think.svg')}>
                    <FormGroupWrapper>
                        <label htmlFor='email'>Email address</label>
                        <input
                            {...register("email", {required: true})}
                            id='email' type="email"
                            placeholder="Enter email"
                            style={{width: '100%'}}
                            className={classes.authInput}
                            // autoComplete='off'
                        />
                        {(errors.email || errors.password) &&
                            <span className='text-danger'>Invalid email or password</span>}
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
                <input type="submit" className={classes.authButton} value={loading ? 'Logging In...' : 'Login'} disabled={loading}/>
            </form>

        </Fragment>

    );
};

export default LoginForm;