import classes from './styles.module.scss';
import TodoItem from "./TodoItem";
import Image from "next/image";

const renderTodoItems = (items, onTodoRemove, onTodoCompleteToggle) => items.map((item, i) => (
    <TodoItem
        item={item}
        index={i}
        key={i}
        onTodoRemove={onTodoRemove}
        onTodoCompleteToggle={onTodoCompleteToggle}
    />
));

const TodoList = ({todos, onTodoRemove, onTodoCompleteToggle}) => {

    return (
        <div className={classes.todoListContainer}>
            {todos.length !== 0 ? renderTodoItems(todos, onTodoRemove, onTodoCompleteToggle) :
                <Image src={require('../../public/no-data.svg')} alt='no-data' objectFit='contain' width={200}/>}
        </div>
    );
};

export default TodoList;