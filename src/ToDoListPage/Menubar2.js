
import React, { Component } from "react";
import './Menubar2.css';
import FeedList from "./FeedList";
import ChallengeList from "./ChallengeList";
import TemplateList from "./TemplateList";
import ToDoTemplate from "./ToDoTemplate";
import ToDoInsert from "./ToDoCreate";
import ToDoList from './ToDoList';
import ToDoListView from "./ToDoListView";


const menuList = {
  0: <ToDoListView/>,
  1: <FeedList />,
  2: <ChallengeList />,
  3: <TemplateList />,
};

class Menubar2 extends Component{
  constructor(props) {
    super();

    this.state = {
      menu: 0,
    };
  }

  changeMenu = (menuIndex) =>{
    this.setState({menu : menuIndex});
  }

  render(){
    return(
      <div className="menubar-box">
        <div className="menuBar">
          <ul className="tabs">
            <li className={`${this.state.menu === 0? 'active': ''}`} onClick={() => this.changeMenu(0)}>ToDoList</li>
            <li className={`${this.state.menu === 1? 'active': ''}`} onClick={() => this.changeMenu(1)}>Feed</li>
            <li className={`${this.state.menu === 2? 'active': ''}`} onClick={() => this.changeMenu(2)}>Challenge</li>
            <li className={`${this.state.menu === 3? 'active': ''}`} onClick={() => this.changeMenu(3)}>Template</li>
          </ul>
        </div>
        <div className="contentArea">
          {menuList[this.state.menu]}
        </div>
      </div>
    )
  }
}

export default Menubar2;