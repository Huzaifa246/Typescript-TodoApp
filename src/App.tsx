import './App.css';
import React, { useState } from 'react';
import InputField from './components/InputField';
import { Todo } from './models/models';
import TodoList from './components/TodoList';
import { DragDropContext, DropResult } from "react-beautiful-dnd";

// {/* <p> let array :string[]== Defining array </p>
// <hr />
// <p> type Person ={} (Person) is interface  -----  type A = {} type B = A & {} ---let y : Y = {}</p> 
// <p>OR interface Person {} --------  interface Guy extends Person {}</p>
// <p> let person: Person = name : "Huzaifa" {} FOR USING THAT TYPE ABOVE</p>
// <hr />
// <p>ARRAY OF OBJECT====   let lotOfPerson: Person[];</p> */}

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [todoList, setTodoList] = useState<Todo[]>([]); // Array<Todo[]>
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();

    if (todo) {
      setTodoList([...todoList, { id: Date.now(), todo, isDone: false }]);
      setTodo("");
    }
  }
  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    console.log(result);

    if (!destination) {
      return;
    }
    if (destination.droppableId === source.droppableId &&
      destination.index === source.index) {
      return;
    }
    let add; 
    let active = todoList; 
    let complete = completedTodos;
    // ------------------Source------------------------
    if (source.droppableId === "TodoList") {
      add = active[source.index]; // add to list
      active.splice(source.index, 1); // remove from list and splice is used to remove inside of array
    }
    else {
      add = complete[source.index]; // add to list
      complete.splice(source.index, 1); // remove from list and splice is used to remove inside of array
    }
    //--------------destination Logic------------------------------
    if (destination.droppableId === "TodoList") {
      active.splice(destination.index, 0, add); // index 0 then add varaible to list
    }
    else {
      complete.splice(destination.index, 0, add); // index 0 then add varaible to list
    }

    setCompletedTodos(complete)
    setTodoList(active)
  }
  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="App">
          <h1 className='heading'>TASKS APP USING TYPESCRIPT</h1>
          <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
          {/* {todoList.map(l => <li>{l.todo}</li>)} */}
          <TodoList todoList={todoList} setTodoList={setTodoList}
            completedTodos={completedTodos} setCompletedTodos={setCompletedTodos}
          />
        </div>
      </DragDropContext>
    </>
  );
}

export default App;
