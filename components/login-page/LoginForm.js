import Form from "react-bootstrap/Form";
import Image from "next/image";

import classes from './styles.module.scss';
import Button from "react-bootstrap/Button";
import {Fragment} from "react";
import Link from "next/link";

const LoginForm = props => {

    return (
        <Fragment>
            <div className={classes.headerContainer}>
                <h1 className={classes.loginHeaderText}>Login</h1>
                <p className='text-muted mx-2'>Welcome back!</p>
            </div>
            <Form className={classes.formContainer}>
                <div className={classes.formContent}>
                    <Form.Group className="mb-4">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" className={classes.input}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" className={classes.input}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Check type="checkbox" label="Remember me"/>
                    </Form.Group>
                </div>
                <div className={classes.image}>
                    <Image src={require('../../public/think.svg')} alt='Thinking'/>
                </div>
            </Form>
            <div className={classes.footerContainer}>
                <Button type="submit" className={classes.button}>Login</Button>
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