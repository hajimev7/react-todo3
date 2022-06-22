import React,{useState} from 'react';
import './App.css';


const App=()=> {
  const [todos, setTodos] = useState([]);
  const [TodoText, setTodoText] = useState('')
  const [EditTodoText, setEditTodoText] = useState("")
  const [filter, setFilter] = useState('all');
  //const [isEditing,setIsEditing]= useState(false)
  const onChangeTodoText=(event)=>setTodoText(event.target.value)
  const onChangeEditTodoText=(id,value)=>{
    const deepCopy = filteredTodos.map((todo) => ({ ...todo }));

    const newTodos = deepCopy.map((todo) => {
      if (todo.id===id){
        todo.text=value
        value=todo.text
      }
      return todo
    })
    setTodos(newTodos);
  } 


  const onClickAdd=()=>{
    if(TodoText === '') return
    setTodos(todos => [...todos,{id:todos.length+1, text:TodoText,isEditing:false, removed:false, checked:false}])
    setTodoText('')
  }
　
  
    
  const handleOnRemove = (id,removed) => {
    const deepCopy = todos.map((todo) => ({ ...todo }));

    const newTodos = deepCopy.map((todo) => {
      if (todo.id === id) {
        todo.removed = !removed;
      }
      return todo;
    });

    setTodos(newTodos);
  };

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

  const handleOnCheck = (id, checked) => {
    const deepCopy = todos.map((todo) => ({ ...todo }));

    const newTodos = deepCopy.map((todo) => {
      if (todo.id === id) {
        todo.checked = !checked;
      }
      return todo;
    });

    setTodos(newTodos);
  };
  
  const handleSubmit =(id)=>{
    
    const deepCopy = todos.map((todo) => ({ ...todo }));
  
    const newTodos = deepCopy.map((todo) => {
      if (todo.id===id){
        todo.value = EditTodoText;
        todo.isEditing = false
      }
      return todo
    })  
    console.log('=== Original todos ===');
    todos.map((todo) => console.log(`id: ${todo.id}, value: ${todo.text}`));
    setTodos(newTodos)
  }

  const filteredTodos = todos.filter((todo) => {
    // filter ステートの値に応じて異なる内容の配列を返す
    switch (filter) {
      case 'all':
        // 削除されていないもの全て
        return !todo.removed;
      case 'checked':
        // 完了済 **かつ** 削除されていないもの
        return todo.checked && !todo.removed;
      case 'unchecked':
        // 未完了 **かつ** 削除されていないもの
        return !todo.checked && !todo.removed;
      case 'removed':
        // 削除済みのもの
        return todo.removed;
      default:
        return todo;
    }
  });

  const handleOnEmpty = () => {
    // シャローコピーで事足りる
    const newTodos = todos.filter((todo) => !todo.removed);
    setTodos(newTodos);
  };

  return (
    <> 
    
      <h1>Tdo List</h1>
      <select
        defaultValue="all"
        onChange={(e) => setFilter(e.target.value)}
      >
        <option value="all">すべてのタスク</option>
        <option value="checked">完了したタスク</option>
        <option value="unchecked">現在のタスク</option>
        <option value="removed">ごみ箱</option>
      </select>

      {filter === 'removed' ? (
        // コールバックに handleOnEmpty() を渡す
        <button onClick={handleOnEmpty}>ゴミ箱を空にする</button>
      ) : (
      
      <div className='inputarea'>
        <input placeholder='todoを入力' value={TodoText} onChange={onChangeTodoText}/>
        <button onClick={onClickAdd}>追加</button>
      </div>
      )}

      <ul>
        {filteredTodos.map((todo)=>(
          <li key={todo.id}>
            <input
                type="checkbox"
                checked={todo.checked}
                onChange={() => handleOnCheck(todo.id, todo.checked)}
              />
            {todo.isEditing? (
            <>
            <input type="text" disabled={todo.checked} index={todo.id} value={todo.text} onChange={(e)=>onChangeEditTodoText(todo.id,e.target.value)}/>
            <button onClick={()=>handleSubmit(todo.id,todo.text)}>更新</button>
            </>
            ):(todo.text)}
            <button onClick={()=>handleClickEdit(todo.id,todo.text)}>編集</button>
            <button onClick={()=>handleOnRemove(todo.id,todo.removed)}>{todo.removed ? '復元' : '削除'}</button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;