import React from 'react';
import classes from './styles.module.scss';
import Image from "next/image";

const AuthFormLayout = props => {

    const {children, img} = props;

    return (
        <div className={classes.formContainer}>
            <div className={classes.formContent}>
                {children}
            </div>
            {img && <div className={classes.authFormImage}>
                <Image src={img} alt='form-fig'/>
            </div>}
        </div>
    );
};

export default AuthFormLayout;