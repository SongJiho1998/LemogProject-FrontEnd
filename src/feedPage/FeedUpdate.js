import React, {useCallback, useEffect, useRef, useState} from 'react';
import axios from "axios";
import Modal from 'react-bootstrap/Modal';
import {ModalBody, ModalFooter} from "react-bootstrap";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import {Button} from "@mui/material";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import TreeItem from "@mui/lab/TreeItem";

import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import Favorite from '@mui/icons-material/Favorite';


function FeedUpdate({Feed:{feedContent,feedNo,filePathList,photoNoList}}) {
    // 모달창
    const [show, setShow] = useState(false);
    const [fullscreen, setFullscreen] = useState(true);
    const handleClose = () => setShow(false);
    const handleShow = (breakpoint) => {
        setShow(true);
        setFullscreen(breakpoint);
    }
    const [newContent, setContent] = useState('');



//----------------------------------------------------------------------+
    const dragFunction = (event, type) => {
        event.preventDefault(); // 페이지 이동 금지 시키기
        event.stopPropagation(); // 상위 엘리먼트들로의 이벤트 전파 중지
    }
    // 사진 번호 가져오기
    let arr = [];
    const startClickPhoto=(t)=>{
        console.log('시작' + t);
        arr.push(t);

    }
    const finishClickPhoto=(e,t)=>{
        // e.preventDefault();
        // e.stopPropagation();
        console.log('끝' + t);
        arr.push(t);
        console.log(arr)
    }
    const changeValue = () =>{
        axios.post('api/feed/changeValue',{
            startPhoNo:arr[0],
            finishPhoNo:arr[1]
        }).then(function (res){
            console.log('여긴피드업데이트')
            arr = [];
            console.log("피드업데이트후 arr : " + arr);
        })
    }
//----------------------------------------------------------------------+

    // 인덱스 바꾸기
    let arrCh = []
    const startIndex = (e) =>{
        console.log("시작인덱스번호 : " + getPhotoNoList.indexOf(e) + "리스트 : " + getPhotoNoList);
        const newNo = getPhotoNoList.indexOf(e)
        arrCh.push(newNo);
    }
    const finishIndex = (e) => {
        console.log("끝인덱스번호 : " + getPhotoNoList.indexOf(e))
        const newNo = getPhotoNoList.indexOf(e)
        arrCh.push(newNo)
        console.log("바꿀인덱스 : "+arrCh);
    }
    const changeArray = (e) =>{
        const photoNo = [...getPhotoNoList]
        photoNo.splice(arrCh[0],1,arr[1]) // 0, 1, 477
        photoNo.splice(arrCh[1],1,arr[0]) // 1, 1, 476
        console.log("복사본바꾼리스트 : "+photoNo);
        setPhotoNoList(photoNo);
    }
//----------------------------------------------------------------------+

    // 파일위치
    let arrFile = []
    const startPath = (t) =>{
        arrFile.push(t)

    }
    const finalPath = (t) =>{
        arrFile.push(t)
        console.log(arrFile);
    }
    const changePath = (e) =>{
        const filePath = [...getFilePathList]
        filePath.splice(arrCh[0],1,arrFile[1])
        filePath.splice(arrCh[1],1,arrFile[0])
        console.log(filePath);
        setFilePathList(filePath);
    }
//----------------------------------------------------------------------+

    const Rendering = () => {
            const result = [];
            for (let i = 0; i < getFilePathList.length; i++) {
                result.push(
                    <div key={i}
                         style={{border:"1px solid white", width:"310px", height:"380px", marginLeft:"10px",textAlign:"center",float:"left"}}
                         onDragStart={(e)=>{
                             startClickPhoto(getPhotoNoList[i]);
                             startIndex(getPhotoNoList[i]);
                             startPath(getFilePathList[i]);
                         }}
                         
                         onDragLeave={(event) => dragFunction(event)}
                         // * onDragLeave : 드래그한 대상이 드랍하지 않고 떠나는 경우 이벤트가 발생 합니다.

                         onDragEnter={(event) => {
                             dragFunction(event);
                            }
                         }
                         // * onDragEnter : 드래그한 대상이 드랍영역에 다다르면 이벤트가 발생 합니다.
                         onDrop={(event) => {
                             finishClickPhoto(event, getPhotoNoList[i]);
                             finishIndex(getPhotoNoList[i]);
                             finalPath(getFilePathList[i]);
                             changeValue();
                             changeArray(event);
                             changePath(event);
                         }}
                         // * onDrop : 대상이 드랍되면 이벤트가 발생 합니다.

                         onDragOver={(event) => { return dragFunction(event); }}
                         // * onDragOver : 드래그 대상이 드랍영역에 오버(over)하는 경우 발생 합니다.
                        // onDragStart={(event)=>{onDragStart(event,getPhotoNoList[i],'시작')}}
                        //  onDragEnd={(event)=>{onDragEnd(event,getPhotoNoList[i],'끝')}}
                        //  onDragOver={(e)=>{onDragOver(e)}}
                    >
                        {/*<div style={{float:"right"}}>*/}
                        {/*    <CloseButton*/}
                        {/*        onClick={()=>{*/}
                        {/*            deletePhotoNoList(getPhotoNoList[i]); // 숫자 숨겨*/}
                        {/*            deletePhotoPathList(getFilePathList[i]); // 위치 숨겨*/}
                        {/*            deleteClick(getPhotoNoList[i]); // 숫자 지운*/}
                        {/*        }}*/}
                        {/*    />*/}
                        {/*</div>*/}

                        {/*<img*/}
                        {/*    src={getFilePathList[i]}*/}
                        {/*    alt='사진이없습니다'*/}
                        {/*    style={{width:"300px", height:"300px"}}*/}
                        {/*    draggable={true}*/}
                        {/*/>*/}
                        {/*<span>{i+1} 번째 사진</span>*/}
                        <Card
                            sx={{
                                width: 300,
                                bgcolor: 'initial',
                                boxShadow: 'none',
                                '--Card-padding': '0px',
                            }}
                        >
                            <Box sx={{ position: 'relative' }}>
                                <AspectRatio ratio="4/5">
                                    <figure>
                                        <img
                                            src={getFilePathList[i]}
                                            loading="lazy"
                                            alt="Yosemite by Casey Horner"
                                        />
                                    </figure>
                                </AspectRatio>
                                <CardCover
                                    className="gradient-cover"
                                    sx={{
                                        '&:hover, &:focus-within': {
                                            opacity: 1,
                                        },
                                        opacity: 0,
                                        transition: '0.1s ease-in',
                                        background:
                                            'linear-gradient(180deg, transparent 62%, rgba(0,0,0,0.00345888) 63.94%, rgba(0,0,0,0.014204) 65.89%, rgba(0,0,0,0.0326639) 67.83%, rgba(0,0,0,0.0589645) 69.78%, rgba(0,0,0,0.0927099) 71.72%, rgba(0,0,0,0.132754) 73.67%, rgba(0,0,0,0.177076) 75.61%, rgba(0,0,0,0.222924) 77.56%, rgba(0,0,0,0.267246) 79.5%, rgba(0,0,0,0.30729) 81.44%, rgba(0,0,0,0.341035) 83.39%, rgba(0,0,0,0.367336) 85.33%, rgba(0,0,0,0.385796) 87.28%, rgba(0,0,0,0.396541) 89.22%, rgba(0,0,0,0.4) 91.17%)',
                                    }}
                                >
                                    {/* The first box acts as a container that inherits style from the CardCover */}
                                    <Box>
                                        <Box
                                            sx={{
                                                p: 2,
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 1.5,
                                                flexGrow: 1,
                                                alignSelf: 'flex-end',
                                            }}
                                        >
                                            <Typography level="h2" noWrap sx={{ fontSize: 'lg' , color:"white"}}>
                                                {i+1} 번째 사진
                                            </Typography>
                                            <div style={{color:"white", float:"right"}}>
                                                <IconButton aria-label="delete">
                                            <DeleteOutlineOutlinedIcon
                                                onClick={()=>{
                                                    deletePhotoNoList(getPhotoNoList[i]); // 숫자 숨겨
                                                    deletePhotoPathList(getFilePathList[i]); // 위치 숨겨
                                                    deleteClick(getPhotoNoList[i]); // 숫자 지운
                                                }}
                                            />
                                                </IconButton>
                                            </div>
                                        </Box>
                                    </Box>
                                </CardCover>
                            </Box>
                        </Card>

                    </div>
                );
            }
        return result;
    };
//----------------------------------------------------------------------+

    const deletePhotoNoList=(i)=>{
        const newPlist=[...getPhotoNoList];
        let index=newPlist.indexOf(i);
        newPlist.splice(index,1)
        setPhotoNoList(newPlist);
    }
    const deletePhotoPathList=(i)=>{
        const newPlist=[...getFilePathList];
        let index=newPlist.indexOf(i); // 숫자
        newPlist.splice(index,1)
        setFilePathList(newPlist);
    }
    const deleteClick=(photoNo)=>{
        axios.post(
            'api/feed/modifyFeedPhoto',{
            photoNo:photoNo
        }).then(function (res){
            console.log(res.data);
        }).catch(function (res){
            console.log("실패 : "+res.data)
        })
    }
//----------------------------------------------------------------------+

    const [getPhotoNoList, setPhotoNoList] = useState(photoNoList);     // 원래 사진번호
    const [getFilePathList, setFilePathList] = useState(filePathList);  // 원래 파일위치


    const putPhotoNo = (PhotoNo) => {
        const newList=[...getPhotoNoList,PhotoNo];
        setPhotoNoList(newList);
        console.log(newList);
    }

    const putPhoto = (newPhoto) => {
        const newPList=[...getFilePathList,newPhoto]
        setFilePathList(newPList);
        console.log(newPList)
    }
    const onChange = async (e) => {
        e.preventDefault();
        if(e.target.files){
            const uploadFile = e.target.files[0]
            const formData = new FormData()
            formData.append('files',uploadFile)

            const response = await axios({
                    method: 'post',
                    url: '/api/feed/insertPhoto',
                    data: formData,
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            if(response.data.code==='2000'){
                console.log(response.data.result.filePath);
                console.log(response.data.result.changeName);

                const newFilePath = (response.data.result.filePath);
                const newChangeName = (response.data.result.changeName);

                const newFilePathName = newFilePath+newChangeName;
                // console.log(newFilePathName);
                putPhoto([newFilePathName]);
                putPhotoNo(response.data.result.photoNo) // photoNo List 시키기

                const timer = setTimeout(() => console.log('Initial timeout!'), 5000);
                clearTimeout(timer);

                e.target.value="";
            }
        }
    }
    const [disable, setDisable] = useState(true);
    const containContent = (e) => {
        e ? setDisable(false) : setDisable(true)
    }
    useEffect(()=>{
        if(newContent === "" || getPhotoNoList.length === 0){
            setDisable(true);
        }
        if(getPhotoNoList.toString() !== photoNoList.toString()){
            setDisable(false);
        }
    })
    const checkContent = (insertFail) => {
        if (insertFail === "Fail") {
            return alert("내용입력은 필수 입니다.")
        }
    }
    return (
        <>
        {/*<Buttonr*/}
        {/*    variant="outline-dark"*/}
        {/*    size="sm"*/}
        {/*    onClick={handleShow}>업데이트</Buttonr>*/}
        <TreeItem nodeId="3" label="업데이트" onClick={handleShow} />
        <Modal
            show={show}
            onHide={handleClose}
            dialogClassName="modal-90w">>
            <Modal.Header closeButton>
                <Modal.Title>
                    피드 업데이트
                </Modal.Title>
            </Modal.Header>
            <ModalBody>
                <div>
                    <Button variant="contained" component="label" startIcon={<AddAPhotoIcon/>} style={{marginBottom:"50px"}}>
                        Upload
                    <input
                        hidden
                        type="file"
                        accept="image/*"
                        onChange={onChange}
                    />
                    </Button>
                </div>
                <div>
                    {Rendering()}

                    <div style={{clear:"both"}}></div>
                </div>

                <div style={{clear:"both"}}></div>

                {/*<div style={{marginTop:"50px"}}>원래 피드 내용 : {feedContent}</div>*/}
                <FloatingLabel controlId="floatingTextarea2" label="내용수정">
                    <Form.Control
                        as="textarea"
                        placeholder="Leave a comment here"
                        style={{ height: '200px', resize:'none', marginTop:'30px'}}
                        onChange={(e)=> {
                            setContent(e.target.value);
                            containContent(e);
                        }}
                        defaultValue={feedContent}
                    />
                </FloatingLabel>
            </ModalBody>
            <ModalFooter>
            <Button variant="contained"
                    onClick={ () => {
                    axios.post(
                        'api/feed/updateFeed',
                        {feedNo: feedNo,
                            feedContent: newContent,
                            photoNo: getPhotoNoList
                        }).catch(function (res) {
                        console.log('실패함');
                        checkContent(res.data.Java);
                        }).then(function (res) {
                            console.log(feedNo)
                            alert('업테이트성공');
                            handleClose();
                            window.location.reload("/main");
                        })}}
                    disabled={disable}
            >수정하기</Button>
            </ModalFooter>
        </Modal>
        </>
    );
}
export default FeedUpdate;
