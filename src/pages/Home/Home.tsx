import React, { useEffect, useState } from "react";
import * as S from "./styles";
import SidebarItem from "../../components/SidebarItem/SidebarItem";
import ExpandSidebarItem from "../../components/ExpandSidebarItem/ExpandSidebarItem";
import TaskFill from "../../images/taskFill.png";
import Settings from "../../images/settings.svg";
import Folder from "../../images/folder.svg";
import Logout from "../../images/logout.svg";
import Filter from "../../images/filter.svg";

import Logo from "../../images/Logo.png";
import { Link, useNavigate } from "react-router-dom";
import FilterTag from "../../components/FilterTag/FilterTag";
import { ITodo } from "../../model/ITodo";
import todoAPI from "../../api/service/todo.api";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import TaskCard from "../../components/TaskCard/TaskCard";
import AddTask from "../../components/AddTask/AddTask";
import {
  setCurrentDisplayingList,
  setTodos,
} from "../../redux/features/todoSlice";
import { setLogout } from "../../redux/features/userSlice";

export const UpdateTodoContext = React.createContext<ITodo | null>(null);

const Home = () => {
  const dispatch = useDispatch();
  const { todosList, doneTodosList, notDoneTodosList, currentDisplayingList } =
    useSelector((state: RootState) => state.todo);
  const [allActive, setAllActive] = useState(true);
  const [doneActive, setDoneActive] = useState(false);
  const [notDoneActive, setNotDoneActive] = useState(false);
  //const [listToDisplay, setListToDisplay] = useState(0);
  const listOfLists = [todosList, doneTodosList, notDoneTodosList];

  function handleAll() {
    //setListToDisplay(0);
    dispatch(setCurrentDisplayingList(0));
    setAllActive(true);
    setDoneActive(false);
    setNotDoneActive(false);
  }

  function handleDone() {
    dispatch(setCurrentDisplayingList(1));
    //setListToDisplay(1);
    setAllActive(false);
    setDoneActive(true);
    setNotDoneActive(false);
  }
  function handleNotDone() {
    dispatch(setCurrentDisplayingList(2));
    //setListToDisplay(2);
    setAllActive(false);
    setDoneActive(false);
    setNotDoneActive(true);
  }

  function logoutAction() {
    //setListToDisplay(0);
    dispatch(setLogout());
    //useNavigate("/")
  }

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const { response, err } = await todoAPI.getAllTodos();
      if (err) {
        console.log(err);
      }

      if (response) {
        dispatch(setTodos(response.data));
        console.log(response);
      }

      //setTodos(newTempList);
    } catch (err) {
      console.log("error fetching todos " + err);
    }
  };
  return (
    <S.Page>
      <S.Sidebar>
        <S.Img src={Logo} />
        <S.Tabs>
          <SidebarItem
            icon={TaskFill}
            name="Tasks"
            isActive={true}
          ></SidebarItem>
          <ExpandSidebarItem
            icon={Folder}
            name="Categories"
          ></ExpandSidebarItem>
          <SidebarItem
            icon={Settings}
            name="Settings"
            isActive={false}
          ></SidebarItem>
        </S.Tabs>
        {/* <Link to="/login" style={{ textDecoration: "none" }}>
          <SidebarItem
            icon={Logout}
            name="Logout"
            isActive={false}
            handleClick={logoutAction}
          ></SidebarItem>
        </Link> */}
        <SidebarItem
            icon={Logout}
            name="Logout"
            isActive={false}
            handleClick={logoutAction}
          ></SidebarItem>
      </S.Sidebar>
      <S.Main>
        <S.Header>All your todos</S.Header>
        <S.TitleAndFilter>
          <S.Title onClick={handleDone}>TODOS </S.Title>
          <S.FilterField>
            <div onClick={handleAll}>
              <FilterTag name="All" active={allActive} />
            </div>
            <div onClick={handleDone}>
              <FilterTag name="Done" active={doneActive} />
            </div>
            <div onClick={handleNotDone}>
              <FilterTag name="Not done" active={notDoneActive} />
            </div>
            <S.FilterIcon src={Filter} />
          </S.FilterField>
        </S.TitleAndFilter>
        <AddTask></AddTask>
        {listOfLists[currentDisplayingList].map((todoItem) => (
          <TaskCard
            iTodo={todoItem}
          />
        ))}
        {/* {listOfLists[listToDisplay].map(task =><TaskCard id={task.id} name={task.title} list={task.categorie} color={task.color} done={task.done}/>)}
                <AddTask></AddTask> */}
      </S.Main>
    </S.Page>
  );
};

export default Home;
