import React,{useState} from 'react';
import './App.css';


const App=()=> {
  const [todos, setTodos] = useState([]);
  const [TodoText, setTodoText] = useState('')
  const [todoEdit, setTodoEdit] = useState('');
  const [isEditing,setIsEditing]= useState(false)
  const [incompletedTodos, setIncompletedTodos] = useState([]);
  const onChangeTodoText=(event)=>setTodoText(event.target.value)

  const onClickAdd=()=>{
    if(TodoText === '') return
    setTodos(todos => [...todos,{TodoText}])
    setTodoText('')
  }
　
  const handleRemoveTask = index => {
    const newTodos = [...todos]
    newTodos.splice(index,1)
    setTodos(newTodos)
　}

  const onChangeTodoEdit = (e) => {
    setIsEditing(true)
    setTodoEdit(e.target.value);
  };
  const onClickIncompleteTodoEdit = (index) => {
    if(todoEdit === '') {
      return false;
    };
    const newTodos = [...incompletedTodos, todoEdit];
    newTodos.splice(index, 1);
    setIncompletedTodos(newTodos);
    setTodoEdit('');
  };

  

  return (
    <> 
      <h1>Tdo List</h1>
      <div className='inputarea'>
        <input placeholder='todoを入力' value={TodoText} onChange={onChangeTodoText}/>
        <button onClick={onClickAdd}>追加</button>
      </div>
      
      <form>
        <ul>
          {todos.map((todo,index)=>(
            <li key={index}>
              {isEditing? <input value={todo.TodoText}/>:todo.TodoText}
            
              <button onClick={onChangeTodoEdit}>編集</button>
              <button onClick={handleRemoveTask}>削除</button>
            </li>
          ))}
        </ul>
      </form>
    </>
  );
}

export default App;
