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
　
  const handleRemoveTask = index => {
    const newTodos = [...todos]
    newTodos.splice(index,1)
    setTodos(newTodos)
　}

  const handleClickEdit = (input)=> {
    setIsEditing(true)
    const onChangeEditTodoText=(event)=>setEditTodoText(event.target.value) 

    //const newTodos = [...todos]
    //newTodos=input.value
    //setEditTodoText(todos=>[...todos,{EditTodoText}])
    

    // todos ステートを更新
    //setTodos(newTodos);
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
          <li key={index}>
            {isEditing? <input value={this.todo.TodoText} onChange={(e) => this.setState({text: e.target.value})}/>:todo.TodoText}
            
            <button onClick={handleClickEdit}>編集</button>
            <button onClick={handleRemoveTask}>削除</button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
