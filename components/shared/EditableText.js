import {EditText} from "react-edit-text";

import classes from './styles.module.scss';

const EditableText = props => {

    const {defaultValue, value, placeholder, onChange, onFinish, required, readOnly, type} = props;

    const onSaveHandler = () => {
        if (!value && required) {
            onChange(defaultValue);
            return alert(`This field is required`);
        }

        onFinish();
    };

    return (
        <EditText
            type={type}
            readonly={readOnly}
            placeholder={'+ ' + placeholder}
            onChange={onChange}
            onSave={onSaveHandler}
            value={value}
            className={classes.editableText}
        />
    );
};

export default EditableText;