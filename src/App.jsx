import { useState } from 'react';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import _ from 'lodash';

function App() {
  const [animateList] = useAutoAnimate();
  const [todoList, setTodoList] = useState(
    JSON.parse(localStorage.getItem('todo-list')) || []
  );
  const [categories] = useState(['Compras', 'Recordatorios', 'Tareas']);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [newTodo, setNewTodo] = useState('');

  const addTodo = () => {
    let tempTodoList = [...todoList];
    tempTodoList.push({ id: Date.now(), name: newTodo, category: selectedCategory });
    setTodoList(tempTodoList);
    setNewTodo('');
    localStorage.setItem('todo-list', JSON.stringify(tempTodoList));
  };

  const removeTodo = (todoId) => {
    let tempTodoList = [...todoList];
    tempTodoList = tempTodoList.filter((todo) => todo.id != todoId);
    setTodoList(tempTodoList);
    localStorage.setItem('todo-list', JSON.stringify(tempTodoList));
  };

  return (
    <>
      <nav
        className="navbar bg-dark border-bottom border-body"
        data-bs-theme="dark"
      >
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Lista de elementos
          </a>
        </div>
      </nav>
      <div className="container mt-3">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Nuevo elemento..."
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
          <button
            className="btn btn-outline-secondary dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {selectedCategory}
          </button>
          <ul className="dropdown-menu dropdown-menu-end">
            {categories.map((category, i) => (
              <li key={i}>
                <a
                  className="dropdown-item"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </a>
              </li>
            ))}
          </ul>

          <button
            onClick={() => addTodo()}
            className="btn btn-outline-secondary"
            type="button"
          >
            <i className="ri-add-line"></i>
          </button>
        </div>
        <h2>Listado de elementos [TODOS]</h2>
        {todoList.length === 0 && (
          <div className="alert alert-primary">
            Aún no tienes elementos en la lista.
          </div>
        )}

        <ul className="list-group" ref={animateList}>
          {todoList.map((todo) => (
            <li
              key={todo.id}
              className="list-group-item d-flex justify-content-between"
            >
              {todo.name}
              <div>
                <span>{todo.category}</span>
                <i
                  onClick={() => removeTodo(todo.id)}
                  className="ri-delete-bin-line text-danger ms-4"
                  style={{ cursor: 'pointer' }}
                ></i>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
