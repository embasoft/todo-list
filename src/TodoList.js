import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import React, { useRef, useState } from "react";
import TodoEntry from "./TodoEntry";

function TodoList() {
    // Initialize the todos state by using existing ones from the local storage, if there are any saved ones
    const [todos, setTodos] = useState(() => {
        const savedData = window.localStorage.getItem('todos');
        return savedData != null ? JSON.parse(savedData) : [];
    });
    const todosRef = useRef();
    todosRef.current = todos;

    React.useEffect(() => {
        window.localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    /**
     * Save all todos to the local storage after receiving a request to save
     */
    const saveTodos = () => {
        window.localStorage.setItem('todos', JSON.stringify(todosRef.current));
    }

    /**
     * Update the specified todo after receiving a request to save
     * @param {TodoEntry} changedTodo 
     */
     const updateTodo = (changedTodo) => {
        const newTodos = todosRef.current;

        // Update the changed todo entry
        const todoId = newTodos.findIndex((todo) => {
            return todo.id === changedTodo.id;
        });
        newTodos[todoId] = changedTodo;
        setTodos(newTodos);
        saveTodos();
    }

    /**
     * Add a new todo entry based on the text input field
     * @param {Event} e Click event
     * @returns 
     */
    const addTodo = (e) => {
        e.preventDefault();

        setTodos([...todos, {
            id: generateId(),
            text: e.target.firstChild.value,
            isFavorite: false,
            isDone: false,
            isDeleted: false,
            saveHandler: saveTodos,
            removeHandler: removeTodo
        }]);
        
        // Reset the text input field
        e.target.firstChild.value = '';

        return false;
    }

    /**
     * Remove the given todo
     * @param {TodoEntry} obsoleteTodo 
     */
    const removeTodo = (obsoleteTodo) => {
        // Return every todo except the one which should be filtered out
        const newTodos = todosRef.current.filter((todo) => {
            return todo.id !== obsoleteTodo.id;
        });
        setTodos(newTodos);
    }

    /**
     * Generate a new, unique id based on the current ones
     * @returns {Number} New, unique id
     */
    const generateId = () => {
        const maxId = Math.max(...todosRef.current.map((todo) => todo.id));
        return isFinite(maxId) ? maxId + 1 : 0;
    }
    
    return (
        <div className="TodoList max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto border border-slate-300 p-2 m-2 rounded-md shadow-md">
            <h1 className="text-2xl font-bold">To-Do List</h1>
            <form className="flex justify-between py-1 pb-3 text-lg" onSubmit={addTodo}>
                <input type="text" placeholder="Aufgabe hinzufügen" className="grow outline-blue-500 rounded-md p-1" />
                <button className="bg-blue-500 hover:bg-blue-600 text-white rounded-md p-1 px-2 ml-2">
                    <FontAwesomeIcon icon={solid('file-circle-plus')} /> <span className="hidden sm:inline-block">Hinzufügen</span>
                </button>
            </form>
            <hr />
            <div className="">
                {/* Draw every todo entry */}
                {todos.map((todo) => {
                    return <TodoEntry id={todo.id} key={todo.id} text={todo.text} isFavorite={todo.isFavorite} isDone={todo.isDone} isDeleted={todo.isDeleted} saveHandler={updateTodo} removeHandler={removeTodo}></TodoEntry>;
                })}
            </div>
        </div>
    );
}

export default TodoList;