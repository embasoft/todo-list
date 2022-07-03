import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {solid} from '@fortawesome/fontawesome-svg-core/import.macro';
import React, {useRef, useState} from 'react';
import TodoEntry from './TodoEntry';
import {useTransition, animated} from 'react-spring';

/**
 * List of todo entries and a form to add new ones
 * @return {React.Element}
 */
function TodoList() {
  /**
   * Initialize the todos state by using existing ones from the local storage,
   * if there are any saved ones
   */
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
  };

  /**
   * Update the specified todo after receiving a request to save
   * @param {TodoEntry} changedTodo
   */
  const updateTodo = (changedTodo) => {
    // Create a copy of the current state
    const newTodos = [...todosRef.current];

    // Update the changed todo entry
    const todoId = newTodos.findIndex((todo) => {
      return todo.id === changedTodo.id;
    });
    newTodos[todoId] = changedTodo;
    // Set the reference to the modified copy
    todosRef.current = newTodos;
    setTodos(newTodos);
    saveTodos();
  };

  /**
   * Add a new todo entry based on the text input field
   * @param {Event} e Click event
   * @return {Boolean}
   */
  const addTodo = (e) => {
    e.preventDefault();

    setTodos([
      ...todos,
      {
        id: generateId(),
        text: e.target.firstChild.value,
        isFavorite: false,
        isDone: false,
        isDeleted: false,
        saveHandler: saveTodos,
        removeHandler: removeTodo,
      },
    ]);

    // Reset the text input field
    e.target.firstChild.value = '';

    return false;
  };

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
  };

  /**
   * Generate a new, unique id based on the current ones
   * @return {Number} New, unique id
   */
  const generateId = () => {
    const maxId = Math.max(...todosRef.current.map((todo) => todo.id));
    return isFinite(maxId) ? maxId + 1 : 0;
  };

  /**
   * Sort the todos in such a way that the favorized tasks appear first,
   * then the normal one and finally the done tasks
   * @param {Array} todos List of TodoEntry objects
   * @return {Array} Sorted todos
   */
  const sortByPriority = (todos) => {
    const favorites = [];
    const normals = [];
    const dones = [];

    todos.forEach((todo) => {
      if (todo.isDone) dones.push(todo);
      else if (todo.isFavorite) favorites.push(todo);
      else normals.push(todo);
    });

    return favorites.concat(normals, dones);
  };

  // Define the style of the adding/removing animations
  const transitions = useTransition(sortByPriority(todos), {
    config: {
      duration: 250,
    },
    expires: 0,
    from: {opacity: 0},
    enter: {opacity: 1},
    leave: {opacity: 0},
    keys: todos.map((todo, index) => todo.id),
  });

  return (
    <div className="TodoList max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl
                    mx-auto border border-slate-300 p-2 m-2 rounded-md
                    shadow-md">
      <h1 className="text-2xl font-bold">To-Do List</h1>
      <form
        className="flex justify-between py-1 pb-3 text-lg"
        onSubmit={addTodo}
      >
        <input
          type="text"
          placeholder="Aufgabe hinzufügen"
          className="grow outline-blue-500 rounded-md p-1"
        />
        <button className="bg-blue-500 hover:bg-blue-600 text-white rounded-md
                           p-1 px-2 ml-2">
          <FontAwesomeIcon icon={solid('file-circle-plus')} />{' '}
          <span className="hidden sm:inline-block">Hinzufügen</span>
        </button>
      </form>
      <hr />
      {/* Draw every todo entry */}
      <ul>
        {transitions((styles, todo) => (
          <animated.div style={styles}>
            <TodoEntry
              id={todo.id}
              key={todo.id}
              text={todo.text}
              isFavorite={todo.isFavorite}
              isDone={todo.isDone}
              isDeleted={todo.isDeleted}
              saveHandler={updateTodo}
              removeHandler={removeTodo}
              updateHandler={updateTodo}
            ></TodoEntry>
          </animated.div>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
