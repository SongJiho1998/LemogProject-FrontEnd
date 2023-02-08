import React , {useState , useEffect} from "react";
import { Component } from "react";
import axios from "axios";

import mark from './image/mark.png';

import '../mypage/font/font.css';

import MyFollowCount from "./MyFollowerCount";
import AcceptFollowCount from "./AcceptFollowCount";
import AcceptFollowingCount from "./AcceptFollowingCount";
import MyFollowingCount from "./MyFollowingCount";
// Tab -> 각 카테고리(피드 , 챌린지 , 템플릿)별 페이지 보여주기.

// 마이페이지 css
import './MyPage.css';
import MyFollowApplication from "./MyFollowApplication";
import {useLoginState} from "../Member/LoginContext";
import {useDispatch, useSelector} from 'react-redux';

function MyFeed() {
    return null;
}

function MyChallenge() {
    return null;
}

function MyTemplates() {
    return null;
}

function MyPage() {
    
    let {profile}=useLoginState();
    console.log(profile);
    const userNo = profile?.userNo; // 로그인한 사용자 userNo

     // photo테이블에서 userNo에 해당하는 프로필 사진 정보 가져오기.
     const [myprofile , setMyProfile] = useState();
     
     const queryString = window.location.search;
     const params = new URLSearchParams(queryString);
    const userNos=1;
     // const userNos = useSelector((state) => state.userNo.selectUserNo);
     // console.log(userNos + " 제발 통과됨")
    //  const userNo = params.get("userNo") != null ? params.get("userNo")  : sessionStorage.getItem("userNo");
 
     function callback(data){
         setMyProfile(data);
     }

    const selectUser = () => {
        axios.get("/api/member/selectMyProfile" , {
            params:{
                userNo : userNos ,
            }
        }).then(function(res){
            console.log("데이터 전송 성공");
            const data = res.data.result;
            console.log(data);
            callback(data);
            
        }).catch(function(){
            console.log("데이터 전송 실패");
        });
    }
 

     useEffect(() => {
        selectUser();
        console.log(userNos + "===여기도 통과됨")
      },[userNos])

     let saveFilePath = "http://localhost:8081/api/images/";

    // Apikey를 환경변수를 이용해 숨기기.
    const apiKey = process.env.REACT_APP_CAL_API_KEY;

    // 버튼 클릭 시 Feed , Challenge , Template 보이게 하기.
    const [tab , setbtnClick] = useState("Feed"); // Feed

    // 버튼 클릭 시 Menu 보이게 하기.
    const [menuClick , setMenuClick] = useState(false);

    const changeTab = (tabName) =>{
        setbtnClick(tabName);
    }

    // 세션의 user_no와 파람의 user_no를 비교하여 해당하는 팔로워 보여주기.
    function followerComparison(){
        if(userNo === userNos){
            return <MyFollowCount/>
        }else{
            return <AcceptFollowCount/>
        }
    }

    function followingComparison(){
        if(userNo === userNos){
            return <MyFollowingCount/>
        }else{
            return <AcceptFollowingCount/>
        }
    }
 
    return(
        <div>
            {/* <ChallengeChatRoom /> */}
            <div style={{position:'absolute'}}>
            <div className="outer_my" style={{position:'absolute'}}>
                
                <div className="outer_prof">
                    <div className="outer_MyProf">
                        <div className="outer_proimgf">
                            <img src={myprofile?.photo?.filePath+myprofile?.photo?.changeName} style={{marginLeft:'7px' , marginTop:'0px'}} className="profileImg"></img>
                        </div>
                        <div className="outer_idf">
                            <p className="nickFontf" style={{marginTop:'7px'}}><b>{myprofile?.nickName}</b><img src={mark} style={{width:'25px' , height:'25px' , marginLeft:'7px' , marginTop:'-5px'}}/></p>
                        </div>
                        <br/>
                        <div className="outer_fallf">
                            <div className="followsizef">
                                <p style={{fontSize:'23px' , fontFamily:'NanumGothic-Regular'}}>게시글&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                    팔로잉&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;팔로워</p>
                                    {followerComparison()}
                                    {followingComparison()}
                            </div>
                        </div>
                        <div className="outer_contentf">
                            <p style={{fontFamily:'NanumGothic-Regular' , fontSize:'17px'}}>{myprofile?.profileComment}</p>
                            <MyFollowApplication/>
                            
                        </div>
                    </div>
                    <div className="outer_btnf">
                        <button className="myBtnf" onClick={() => changeTab("Feed")}>Feed</button>
                        <button className="myBtnf" onClick={() => changeTab("Challenge")}>Challenge</button>
                        <button className="myBtnf" onClick={() => changeTab("Template")}>Template</button>
                    </div>
                        {tab === "Feed" ? <MyFeed/> : null}
                        {tab === "Challenge" ? <MyChallenge/> : null}
                        {tab === "Template" ? <MyTemplates/> : null}
                    </div>
                {/* <div className="outer_menu">
                    <div className="menuBtn">
                        <button className="mybtn1" style={{backgroundImage: `url(${btnLogo})`}}
                            onClick={() => setMenuClick((!menuClick))}></button>
                    </div> */}
                    {/* {menuClick === true ? <Mymenu myprofile={myprofile}/> : null} */}
                {/* </div> */}
            </div>
            </div>
        </div>
    );
};

export {MyPage};
