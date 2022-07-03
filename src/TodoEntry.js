import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {solid, regular} from '@fortawesome/fontawesome-svg-core/import.macro';
import PropTypes from 'prop-types';
import React, {useState} from 'react';

/**
 * Represents a todo task
 * @param {Object} props Values of the todo task
 * @return {React.ReactElement}
 */
function TodoEntry(props) {
  // Initialize the todo state
  const [todo, setTodo] = useState({
    id: props.id,
    text: props.text,
    isFavorite: props.isFavorite,
    isDone: props.isDone,
    isDeleted: props.isDeleted,
    saveHandler: props.saveHandler,
    removeHandler: props.removeHandler,
    updateHandler: props.updateHandler,
  });

  // Request saving after a change of the todo occurs
  React.useEffect(() => {
    todo.saveHandler(todo);
  }, [todo]);

  /**
   * Request to set the selected todo entry as favorite
   * @param {Event} e Click event
   */
  const toggleFavorite = (e) => {
    e.preventDefault();
    setTodo({...todo, isFavorite: !todo.isFavorite});
  };

  /**
   * Request to set the selected todo entry as done
   * @param {Event} e Click event
   */
  const toggleDone = (e) => {
    e.preventDefault();
    setTodo({...todo, isDone: !todo.isDone});
  };

  /**
   * Request to remove the selected todo entry
   * @param {Event} e Click event
   */
  const deleteTask = (e) => {
    e.preventDefault();
    todo.removeHandler(todo);
  };

  return (
    <li>
      <div className="flex justify-between py-2">
        <div
          className={`grow text-lg ${
            todo.isDone ? 'text-slate-400 line-through' : ''
          }`}
        >
          {todo.text}
        </div>
        <button type="button" onClick={toggleFavorite} className="px-1">
          <FontAwesomeIcon
            icon={todo.isFavorite ? solid('star') : regular('star')}
            className="text-lg text-yellow-400 hover:text-yellow-500"
          />
        </button>
        <div className="px-1" onClick={toggleDone}>
          <FontAwesomeIcon
            icon={todo.isDone ? solid('circle-check') : regular('circle-check')}
            className="text-lg text-green-600 hover:text-green-700"
          />
        </div>
        <div className="px-1" onClick={deleteTask}>
          <FontAwesomeIcon
            icon={solid('trash-can')}
            className="text-lg text-slate-500 hover:text-red-500"
          />
        </div>
      </div>
      <hr />
    </li>
  );
}

// Define the types of the properties
TodoEntry.propTypes = {
  id: PropTypes.number,
  text: PropTypes.string,
  isFavorite: PropTypes.bool,
  isDone: PropTypes.bool,
  isDeleted: PropTypes.bool,
  saveHandler: PropTypes.func,
  removeHandler: PropTypes.func,
  updateHandler: PropTypes.func,
};

export default TodoEntry;
