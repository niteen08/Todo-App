import { useState, useEffect } from 'react'
import Navbar from './Component/Navbar'

function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState(() => {
    // Load todos from local storage or initialize with an empty array
    const savedTodos = localStorage.getItem('todos')
    return savedTodos ? JSON.parse(savedTodos) : []
  })
  const [isEditing, setIsEditing] = useState(false)
  const [currentTodoIndex, setCurrentTodoIndex] = useState(null)

  useEffect(() => {
    // Save todos to local storage whenever they change
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  const handleAdd = () => {
    if (todo.trim() === "") {
      alert("Field is blank")
      return
    }
    if (isEditing) {
      const updatedTodos = todos.map((item, index) => 
        index === currentTodoIndex ? { ...item, todo } : item
      )
      setTodos(updatedTodos)
      setIsEditing(false)
      setCurrentTodoIndex(null)
    } else {
      setTodos([...todos, { todo, isCompleted: false }])
    }
    setTodo("")
    console.log(todos)
  }

  const handleEdit = (index) => {
    setIsEditing(true)
    setCurrentTodoIndex(index)
    setTodo(todos[index].todo)
  }

  const handleDelete = (index) => {
    confirm('Are You Sure To Delete This..?')
    setTodos(todos.filter((_, i) => i !== index))
  }

  const handleComplete = (index) => {
    const updatedTodos = todos.map((item, i) => 
      i === index ? { ...item, isCompleted: !item.isCompleted } : item
    )
    setTodos(updatedTodos)
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  return (
    <>
      <Navbar />
      <div className="main flex justify-center items-center">
        <div className="main-todo bg-slate-200 rounded p-3 mx-5 my-10 flex flex-col min-h-96">
          <h1 className='text-4xl mb-3 font-bold'>Add Todos</h1>
          <div className="flex">
          <input
            type='text'
            onChange={handleChange}
            value={todo}
            className='border w-full h-10 rounded border-black text-xl mr-1 pl-2'
          />
          <button onClick={handleAdd} className='bg-purple-800 rounded px-5 py-2 text-white'>
            {isEditing ? 'Update' : 'Add'}
          </button>
          </div>

          <h1 className='text-2xl font-serif mt-2'>Your Todo</h1>
          <hr className="custom-hr" />

          <div className="todos flex flex-col w-full">
            {todos.length === 0 && <div className='m-5 text-xl font-bold'>Your Todo Is Empty..!</div>}
            {todos.map((item, index) => (
              <div key={index} className="todo-item flex justify-between w-full mt-2">
                <div className={`todo text-xl h-full ${item.isCompleted ? 'line-through text-green-500' : ''}`}>{item.todo}</div>
                <div className="buttons flex max-h-10 ml-3">
                  <button
                    onClick={() => handleComplete(index)}
                    className={`rounded px-2 py-2 text-white ml-2 ${item.isCompleted ? 'bg-green-500' : 'bg-purple-800'}`}>
                    {item.isCompleted ? 'Completed' : 'Complete'}
                  </button>
                  <button
                    onClick={() => handleEdit(index)}
                    className='bg-purple-800 rounded px-4 py-2 text-white ml-2'>
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    className='bg-purple-800 rounded px-2 py-2 text-white ml-2'>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </>
  )
}

export default App
