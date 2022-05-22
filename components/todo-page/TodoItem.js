import classes from './styles.module.scss';
import Checkbox from "react-custom-checkbox";
import {BiCheck, BiTrash} from "react-icons/bi";

const TodoItem = props => {

    const {item, onTodoRemove, onTodoCompleteToggle, index} = props;


    const completeTodoHandler = async () => {

    };

    return (
        <div className={classes.todoItem}>
            <div className={classes.control}>
                <Checkbox
                    checked={item.isCompleted}
                    icon={<BiCheck size={23}/>}
                    borderRadius={10}
                    size={20}
                    className={classes.checkbox}
                    onChange={isChecked => onTodoCompleteToggle(index, isChecked)}
                />
                <BiTrash className={classes.trashBtn} onClick={() => onTodoRemove(index)}/>
            </div>
            <div className={item?.isCompleted ? classes.contentCompleted : classes.content}>
                {item?.text}
            </div>
        </div>
    );
};

export default TodoItem;