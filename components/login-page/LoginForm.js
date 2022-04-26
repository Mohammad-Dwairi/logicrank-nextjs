import Form from "react-bootstrap/Form";
import Image from "next/image";
import Button from "react-bootstrap/Button";

import classes from './styles.module.scss';

const LoginForm = props => {

    return (
        <Form>
            <div className='d-flex align-items-end mb-4'>
                <h1 className={classes.loginHeader}>Login</h1>
                <p className='text-muted mx-2'>Welcome back!</p>
            </div>
            <div className='d-flex justify-content-between'>
                <div className='w-100'>
                    <Form.Group className="mb-4">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" className={classes.input}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" className={classes.input}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Remember me"/>
                    </Form.Group>
                </div>
                <div className={classes.image}>
                    <Image src={require('../../public/think.svg')}/>
                </div>
            </div>
            <Button type="submit" className={classes.button}>Login</Button>
            <div className={classes.extra}>
                <p className='text-muted'>Forgot Password? Reset</p>
                <p className='text-muted'>Not a member yet? Register</p>
            </div>
        </Form>
    );
};

export default LoginForm;