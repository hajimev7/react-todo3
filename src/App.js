import React,{useState} from 'react';
import './App.css';


const App=()=> {
  const [todos, setTodos] = useState([]);
  const [TodoText, setTodoText] = useState('')
  const [EditTodoText, setEditTodoText] = useState("")
  //const [isEditing,setIsEditing]= useState(false)
  const onChangeTodoText=(event)=>setTodoText(event.target.value)
  const onChangeEditTodoText=(event)=>setEditTodoText(event.target.value) 

  const onClickAdd=()=>{
    if(TodoText === '') return
    setTodos(todos => [...todos,{id:todos.length+1, text:TodoText,isEditing:false}])
    setTodoText('')
  }
　
  const handleRemoveTask = index => {
    const newTodos = [...todos]
    newTodos.splice(index,1)
    setTodos(newTodos)
　}
  
 

  const handleClickEdit = (id)=> {
    const deepCopy = todos.map((todo) => ({ ...todo }));
    
    const newTodos = deepCopy.map((todo) => {
      if (todo.id===id){
        todo.isEditing = true
      }
      return todo
    })  
    setTodos(newTodos)
  }
  
  const handleSubmit =(id)=>{
    const deepCopy = todos.map((todo) => ({ ...todo }));
    
    const newTodos = deepCopy.map((todo) => {
      if (todo.id===id){
        todo.text = EditTodoText;
        todo.isEditing = false
      }
      return todo
    })  
    console.log('=== Original todos ===');
    todos.map((todo) => console.log(`id: ${todo.id}, value: ${todo.text}`));
    setTodos(newTodos)
  }

  return (
    <> 
      <h1>Tdo List</h1>
      <div className='inputarea'>
        <input placeholder='todoを入力' value={TodoText} onChange={onChangeTodoText}/>
        <button onClick={onClickAdd}>追加</button>
      </div>

      <ul>
        {todos.map((todo)=>(
          <li key={todo.id}>
            {todo.isEditing? (
            <>
            <input type="text" index={todo.id} value={todo.text} onChange={onChangeEditTodoText}/>
            <button onClick={()=>handleSubmit(todo.id,todo.text)}>更新</button>
            </>
            ):(todo.text)}
            <button onClick={()=>handleClickEdit(todo.id,todo.text)}>編集</button>
            <button onClick={handleRemoveTask}>削除</button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;