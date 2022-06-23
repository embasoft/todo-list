import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid, regular } from '@fortawesome/fontawesome-svg-core/import.macro';
import React, { useState } from 'react';

function TodoEntry(props) {
    // Initialize the todo state
    const [todo, setTodo] = useState({
        id: props.id,
        text: props.text,
        isFavorite: props.isFavorite,
        isDone: props.isDone,
        isDeleted: props.isDeleted,
        saveHandler: props.saveHandler,
        removeHandler: props.removeHandler
    });

    // Request saving after a change of the todo occurs
    React.useEffect(() => {
        todo.saveHandler(todo);
    }, [todo]);

    {/* TODO Remove comments after properly implementing the sorting of favorite todos */}
    // const toggleFavorite = (e) => {
    //     e.preventDefault();
    //     setTodo({...todo, isFavorite: !todo.isFavorite});
    // }

    /**
     * Request to set the selected todo entry as done
     * @param {Event} e Click event
     */
    const toggleDone = (e) => {
        e.preventDefault();
        setTodo({...todo, isDone: !todo.isDone});
    }

    /**
     * Request to remove the selected todo entry
     * @param {Event} e Click event
     */
    const deleteTask = (e) => {
        e.preventDefault();
        todo.removeHandler(todo);
    }
    
    return (
        <div>
            <div className="flex justify-between py-2">
                    <div className={`grow text-lg ${todo.isDone ? 'text-slate-400 line-through' : ''}`}>{todo.text}</div>
                    {/* TODO Remove comments after properly implementing the sorting of favorite todos */}
                    {/* <button type="button" onClick={toggleFavorite} className="px-1">
                        <FontAwesomeIcon icon={todo.isFavorite ? solid('star') : regular('star')} className="text-yellow-400 hover:text-yellow-500" />
                    </button> */}
                    <div className="px-1" onClick={toggleDone}>
                        <FontAwesomeIcon icon={todo.isDone ? solid('circle-check') : regular('circle-check')} className="text-green-600 hover:text-green-700 text-lg" />
                    </div>
                    <div className="px-1" onClick={deleteTask}>
                        <FontAwesomeIcon icon={solid('trash-can')} className="text-slate-500 hover:text-red-500 text-lg" />
                    </div>
            </div>
            <hr />
        </div>
    );
}

export default TodoEntry;