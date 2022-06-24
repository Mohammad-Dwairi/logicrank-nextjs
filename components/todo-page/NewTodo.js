import classes from './styles.module.scss';
import {FcTodoList} from "react-icons/fc";
import {useForm} from "react-hook-form";


const NewTodo = props => {

    const {onNewTodoSubmit} = props;
    const {register, handleSubmit, watch, formState: {errors}} = useForm();

    return (
        <form className={classes.newTodoContainer} onSubmit={handleSubmit(onNewTodoSubmit)}>
            <div className={classes.newTodoTitleContainer}>
                <FcTodoList className={classes.newTodoIcon}/>
                <h1 className={classes.newTodoTitle}>New To-Do</h1>
            </div>
            <div className={classes.newTodoInputContainer}>
                <input type='text' {...register('newTodo', {required: true})}/>
                {errors.newTodo && <span className='text-danger'>Required*</span>}
            </div>
            <input type='submit' className={classes.newTodoBtn} value='Add New To-Do'/>
        </form>
    );
};

export default NewTodo;