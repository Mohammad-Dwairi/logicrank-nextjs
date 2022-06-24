import {useCallback, useEffect, useState} from "react";
import Container from "react-bootstrap/Container";
import {fbQueryDocByUID} from "../../../firebase/functions/firestore-docs-functions";
import {TODOS_COLLECTION} from "../../../firebase/constants/COLLECTIONS";
import {useAuth} from "../../../context/AuthContext";
import {withProtected} from "../../../hoc/RouteAuth";
import TodoList from "../../../components/todo-page/TodoList";
import NewTodo from "../../../components/todo-page/NewTodo";
import AppModal from "../../../components/shared/AppModal";
import AppButton from "../../../components/shared/AppButton";
import {arrayRemove, arrayUnion, doc, setDoc, updateDoc} from "firebase/firestore";
import {db} from "../../../firebase/firebase";
import LoadingView from "../../../hoc/LoadingView";


const TodoListPage = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [isNewTodoModalOpen, setIsNewTodoModalOpen] = useState(false);
    const [todos, setTodos] = useState([]);

    const {uid} = useAuth().currentUser;

    const loadUserTodos = useCallback(async () => {
        const fetchedDoc = await fbQueryDocByUID(TODOS_COLLECTION, uid);
        setIsLoading(false);
        if (fetchedDoc) {
            setTodos(fetchedDoc['todoArr']);
        }
    }, [uid]);

    useEffect(() => {
        loadUserTodos();
    }, [loadUserTodos]);


    const onNewTodoSubmit = async data => {
        setIsLoading(true);
        const {newTodo} = data;

        const todo = {
            text: newTodo,
            isCompleted: false,
            dateCreated: +new Date()
        };

        const fbTodo = {
            todoArr: arrayUnion(todo)
        };

        if (todos.length !== 0) {
            await updateDoc(doc(db, TODOS_COLLECTION, uid), fbTodo)
        } else {
            await setDoc(doc(db, TODOS_COLLECTION, uid), fbTodo);
        }

        setTodos([...todos, todo]);
        setIsLoading(false);
        setIsNewTodoModalOpen(false);
    };

    const onTodoRemove = async (todoIndex) => {
        const isConfirmed = window.confirm("Are you sure?");
        if (isConfirmed) {
            const updatedTodos = [...todos];
            updatedTodos.splice(todoIndex, 1);
            setTodos(updatedTodos);
            await updateDoc(doc(db, TODOS_COLLECTION, uid), {todoArr: arrayRemove(todos[todoIndex])});
        }
    }

    const onTodoCompleteToggle = async (todoIndex, isCompleted) => {
        const updatedTodos = [...todos];
        updatedTodos[todoIndex].isCompleted = isCompleted;
        setTodos(updatedTodos);
        await updateDoc(doc(db, TODOS_COLLECTION, uid), {todoArr: updatedTodos});
    };

    if (isLoading) return <LoadingView />;

    return (
        <>
            <Container className='mt-5'>
                <div className='d-flex justify-content-between'>
                    <h1>Todo List</h1>
                    <AppButton title='Add New To-Do' onClick={() => setIsNewTodoModalOpen(true)}/>
                </div>
                <div className='d-flex justify-content-center'>
                    <TodoList todos={todos} onTodoRemove={onTodoRemove} onTodoCompleteToggle={onTodoCompleteToggle}/>
                </div>
            </Container>
            <AppModal
                isOpen={isNewTodoModalOpen}
                onRequestClose={() => setIsNewTodoModalOpen(false)}
            >
                <NewTodo onNewTodoSubmit={onNewTodoSubmit}/>
            </AppModal>
        </>
    );
};

export default withProtected(TodoListPage);