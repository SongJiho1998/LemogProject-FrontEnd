import React from 'react';
import styled from 'styled-components';
import TodoItem from './TodoItem';
import ChallTodoItem from './ChallTodoItem';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import axios from 'axios';

const TodoListBlock = styled.div`
  flex: 1;
  padding: 20px 32px;
  padding-bottom: 48px;
  overflow-y: auto;
`;

function TodoList({todoList, setTodoList, chList, onDel, onToggle, onUpdate, onDelay}) {

  //const chTodos = chList[0].todoList;
  //console.log(chTodos);
  let arr = [];
  
  const onDragStart = () => {
    // const todoNos = todoList.map(todo => todo.todoNo);
    // console.log("뽑았으"+todoNos);
    // arr.push(todoNos);
    // console.log("첫"+ arr);
    //todoList.map(todo => arr.push(todo.todoNo));
  }
  
  const onDragEnd = (res) => {
    if (!res.destination) return;
    
    const dndTodoList = [...todoList];
    const [reorderedItem] = dndTodoList.splice(res.source.index, 1);
    dndTodoList.splice(res.destination.index, 0, reorderedItem);
    //setTodoList(dndTodoList);
    console.log(dndTodoList);

    // const dndTodoNos = dndTodoList.map(todo => todo.todoNo);
    // arr.push(dndTodoNos);

    //dndTodoList.map(todo => arr.push(todo.todoNo));
    //console.log("추가 후"+arr);

    // axios.post('api/todo/dndTodo', {
    //   originArr : arr[0],
    //   changeArr : arr[1],
    // }).then(function(){
    //   setTodoList(dndTodoList);
    //   console.log("최종"+arr);
    //   console.log("dnd 완료");
    //   arr = [];
    // }).catch(function(){
    //   console.log("dnd 실패")
    // })

    axios.get('api/todo/dndTodos', ({
      dndTodoList : dndTodoList
    })).then(function(){
      setTodoList(dndTodoList);
      console.log("dnd"+dndTodoList);
      console.log("dnd 완료");
    }).catch(function(){
      console.log("dnd 실패");
      console.log(dndTodoList);
    })
    
  }

  return ( 
    <>
    <p>Daily Todo-List</p>
    <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd} >
      <Droppable droppableId="drop-area">
        {provided => (
          <TodoListBlock {...provided.droppableProps} ref={provided.innerRef}>
            {todoList && todoList.map((todo, index) =>(
              <Draggable draggableId={String(todo.todoNo)} index={index} key={todo.todoNo}>
                {provided => (
                  <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                  <TodoItem
                    key={todo.todoNo}
                    todo={todo}
                    onDel={onDel}
                    onToggle={onToggle}
                    onUpdate={onUpdate}
                    onDelay={onDelay}
                    index={index}
                  />
                  </div>
                )}
              </Draggable>
              ))}
              {provided.placeholder} 

              {chList && chList.map(chTodos => (
                chTodos.todoList.map(chTodo => 
                  <ChallTodoItem
                  key={chTodo.todoNo}
                  chTodo={chTodo}
                  />
                )
              ))}
            

          </TodoListBlock>
        )}
        
      </Droppable>
    </DragDropContext>



    {/* <TodoListBlock>
      <p>Daily Todo-List</p>
      {todoList && todoList.map(todo =>(
      <TodoItem
        key={todo.todoNo}
        todo={todo}
        onDel={onDel}
        onToggle={onToggle}
        onUpdate={onUpdate}
        onDelay={onDelay}
      />
      ))}
    </TodoListBlock> */}

    {/* <TodoListBlock>
    {chList && <p>Challenge Todo-List</p>}
    {chList && chList.map(chTodos => (
      chTodos.todoList.map(chTodo => 
        <>
        <ChallTodoItem
        key={chTodo.todoNo}
        chTodo={chTodo}
        onToggle={onToggle}
        />
        </>
      )
    ))}
    </TodoListBlock> */}


    </>
  );
}


export default TodoList;
