import TodoItem from "./TodoItem";
import "./TodoList.css";
import { useState,useMemo,useContext } from "react";
import { TodoStateContext } from "../App";

const TodoList = () => {
    const todo  = useContext(TodoStateContext);
    
    const [search, setSearch] = useState("");
    
    const onChangeSearch= (e) => {
        setSearch(e.target.value);
    };
    const [done,setDone] =useState(false);

    const onChangeDone = (e) => {
        //setDone(e.target.value);
        setDone(!done);
    }
    

    const getSearchResult = () => {
        return search === ""
            ? todo
            : todo.filter((it) => 
                it.content.toLowerCase().includes(search.toLowerCase()));
    };

    const getNotDoneResult = (result) => {
        return done === false
        ? result
        : result.filter((it)=>(!it.isDone));
    }

    const analyzeTodo=useMemo(()=>{
        console.log("analyseToto 함수 호출");
        const totalCount = todo.length;
        const doneCount = todo.filter((it) => it.isDone).length;
        const notDoneCount = totalCount - doneCount;
        return {
            totalCount,
            doneCount,
            notDoneCount,
        };
    },[todo]
    );
    const {totalCount,doneCount,notDoneCount} = analyzeTodo;

    return (

     <div className="TodoList">
        <h4>Todo List✨</h4>
        <div>
            <div>총개수: {totalCount}</div>
            <div>완료된 할 일: {doneCount}</div>
            <div>아직 완료하지 못한 할 일: {notDoneCount}</div>
        </div>
        <input 
        value={search}
        onChange={onChangeSearch}
        className="searchbar" placeholder="검색어를 입력하세요" />
        <input className="done"
         type="checkbox"
         onChange={onChangeDone}
         value={done}
         />
         완료된 할일 숨기기
        <div className="list_wrapper">
            {getNotDoneResult (getSearchResult()).map((it)=>(
                <TodoItem key={it.id}{...it} />
           ) )}
        </div>
    </div>
    );
};

TodoList.defaultProps = {
    todo: [],
};

export default TodoList;