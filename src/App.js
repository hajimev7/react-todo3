import React,{useState} from 'react';
import './App.css';


const App=()=> {
  const [todos, setTodos] = useState([]);
  const [TodoText, setTodoText] = useState('')
  const [EditTodoText, setEditTodoText] = useState('')
  const [isEditing,setIsEditing]= useState(false)
  const onChangeTodoText=(event)=>setTodoText(event.target.value)
  const onChangeEditTodoText=(event)=>setEditTodoText(event.target.value) 

  const onClickAdd=()=>{
    if(TodoText === '') return
    setTodos(todos => [...todos,{TodoText}])
    setTodoText('')
  }
　
  const handleRemoveTask = id => {
    const newTodos = [...todos]
    newTodos.splice(id,1)
    setTodos(newTodos)
　}

  const handleClickEdit = (value,id)=> {
    setIsEditing(true)
    const newTodos = todos.map((todo) => {
      if (todos.id === id) {
        todo.value = value;
      }
      return todo;
    });

    // todos ステートを更新
    setTodos(newTodos);
  };

  return (
    <> 
      <h1>Tdo List</h1>
      <div className='inputarea'>
        <input placeholder='todoを入力' value={TodoText} onChange={onChangeTodoText}/>
        <button onClick={onClickAdd}>追加</button>
      </div>

      <ul>
        {todos.map((todo,index)=>(
          <li key={todo.id}>
            {isEditing? <input value={todo.TodoText} onChange={(e) => e.preventDefault()}/>:todo.TodoText}
            
            <button onClick={handleClickEdit}>編集</button>
            <button onClick={handleRemoveTask}>削除</button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
