import React, { useState } from "react";
import { Component } from "react";
// 메인페이지 css
import './MainPage.css';
//프로필 컴포넌트
import Profile from "./profile/Profile";
//캘린더 Api 컴포넌트
import Calendar from './calendar/Calendar';
//메뉴바 컴포넌트
import Menubar2 from "./menubar/Menubar2";

import {useLoginDispatch} from "../Member/LoginContext";
import axios from "axios";
import Offcanvas from 'react-bootstrap/Offcanvas';
import Button from '@mui/material/Button';
import Modal from 'react-bootstrap/Modal';
import FeedInsert from "../feedPage/FeedInsert";
import MenuIcon from '@mui/icons-material/Menu';
import {IconButton} from "@mui/material";
import { KAKAO_LOGOUT_URL } from '../Member/KakaoLoginData';
//캘린더 라이브러리 추가 해주기
//npm install react-calendar

//리액트 두투라이브러리 추가
// npx create-react-app react-todolist
// npm i react-icons styled-components


function LogoutButton() {

    const dispatch= useLoginDispatch();
    const logout = async () => {
        let res = await axios.get("/api/member/logout");
        if(res.data.code === '3008') {
            // console.log(res.data)
            logoutKakao()
            // console.log("로그아웃 완료")
        }
        dispatch({
            type:"logout"
        });
    }


    const logoutKakao = () => {
        const kakaoLogout = KAKAO_LOGOUT_URL;
        document.location.href = kakaoLogout;
    }



    return (
        <Button onClick={logout}>
            로그아웃
        </Button>

    );
}

function MainMenu(){
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return(<>

    {/*<Button variant="outlined" onClick={handleShow}>*/}
    {/*    메뉴*/}
    {/*</Button>*/}
    <IconButton aria-label="delete" size="large" onClick={handleShow} style={{float:"right"}}>
        <MenuIcon fontSize="inherit" />
    </IconButton>
    <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
            <Offcanvas.Title>메뉴바</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
            <LogoutButton></LogoutButton>
<br/>
            <FeedInsert></FeedInsert>
        </Offcanvas.Body>
    </Offcanvas></>
    )
}

function MainPage() {
    // Apikey를 환경변수를 이용해 숨기기.
    const apiKey = process.env.REACT_APP_CAL_API_KEY;
    return(
        <>
        <div>
            <MainMenu></MainMenu>
        </div>
        <div className="outer">

            {/* 캘린더 영역 */}
            <div className="outer_date">
                <Profile/>
                <br/><br/>
                <Calendar/>
            </div>
          <Menubar2/>
        </div>
    </>
            );
}

export default MainPage;
