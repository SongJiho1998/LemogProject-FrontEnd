import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Button} from "@mui/material";
import CloseButton from "react-bootstrap/CloseButton";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';

import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import Favorite from '@mui/icons-material/Favorite';
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";



function FeedPictureInsert(props) {



    const dragFunction = (event) => {
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
    //-----------------------------------------------------
    // 인덱스 바꾸기
    let arrCh = []
    const startIndex = (e) =>{
        console.log("시작인덱스번호 : " + photoNoList.indexOf(e) + "리스트 : " + photoNoList);
        const newNo = photoNoList.indexOf(e)
        arrCh.push(newNo);
    }
    const finishIndex = (e) => {
        console.log("끝인덱스번호 : " + photoNoList.indexOf(e))
        const newNo = photoNoList.indexOf(e)
        arrCh.push(newNo)
        console.log("바꿀인덱스 : "+arrCh);
    }
    const changeArray = (e) =>{
        const photoNo = [...photoNoList]
        photoNo.splice(arrCh[0],1,arr[1]) // 0, 1, 477
        photoNo.splice(arrCh[1],1,arr[0]) // 1, 1, 476
        console.log("복사본바꾼리스트 : "+photoNo);
        setPhotoNoList(photoNo);
    }
    //-----------------------------------------------------
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
        const filePath = [...photoFilePathList]
        filePath.splice(arrCh[0],1,arrFile[1])
        filePath.splice(arrCh[1],1,arrFile[0])
        console.log(filePath);
        setPhotoFilePathList(filePath);
    }
    //-----------------------------------------------------

    const Rendering=()=>{
        const result = [];
        for(let i = 0; i<photoFilePathList.length; i++){
            result.push(
                <div
                    key={i}
                    style={{
                        border:"3px solid gray",
                        marginLeft:"10px",
                        textAlign:"center",
                        float:"left",
                        width:"300px",
                        height:"380px"
                }}
                    onDragStart={(e)=>{
                        startClickPhoto(photoNoList[i]);
                        startIndex(photoNoList[i]);
                        startPath(photoFilePathList[i]);
                    }}
                    onDragLeave={(event) => dragFunction(event)}
                    onDragEnter={(event) => {dragFunction(event);}}
                    onDrop={(event) => {
                        finishClickPhoto(event, photoNoList[i]);
                        finishIndex(photoNoList[i]);
                        finalPath(photoFilePathList[i]);
                        changeArray(event);
                        changePath(event);
                    }}
                    onDragOver={(event) => { return dragFunction(event); }}
                >
                    {/*    <div style={{float:"right"}}>*/}
                    {/*        <CloseButton onClick={()=>{*/}
                    {/*            deletePhotoNoList(photoNoList[i]); // 숫자 숨겨*/}
                    {/*            deletePhotoPathList(photoFilePathList[i]); // 위치 숨겨*/}
                    {/*            deleteClick(photoNoList[i]);}}// 숫자 지운/>*/}
                    {/*        />*/}
                    {/*    </div>*/}
                    {/*<div style={{clear:"both"}}>*/}
                    {/*        <img*/}
                    {/*            src={photoFilePathList[i]}*/}
                    {/*            alt="없는사진"*/}
                    {/*            style={{height:"300px",width:"100%"}}*/}
                    {/*        />*/}
                    {/*</div>*/}
                    {/*        {i+1} 번째 사진*/}
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
                                        src={photoFilePathList[i]}
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
                                                        deletePhotoNoList(photoNoList[i]); // 숫자 숨겨
                                                        deletePhotoPathList(photoFilePathList[i]); // 위치 숨겨
                                                        deleteClick(photoNoList[i]);}}// 숫자 지운/>

                                                />
                                            </IconButton>
                                        </div>
                                    </Box>
                                </Box>
                            </CardCover>
                        </Box>
                    </Card>
                </div>


            )
        }
        return result;
    }
    const deletePhotoNoList=(i)=>{
        const newPlist=[...photoNoList];
        let index=newPlist.indexOf(i);
        newPlist.splice(index,1)
        setPhotoNoList(newPlist);
    }
    const deletePhotoPathList=(i)=>{
        const newPlist=[...photoFilePathList];
        let index=newPlist.indexOf(i); // 숫자
        newPlist.splice(index,1)
        setPhotoFilePathList(newPlist);
    }
    const deleteClick=(photoNo)=>{
        axios({
                url:'api/feed/deletePhoto',
                method:'GET',
                params:{photoNo:photoNo}
            },
        ).then(function (res){
            console.log("성공");

        }).catch(function (res) {
            console.log(photoNo);
        })

    }

    const [photoFilePathList,setPhotoFilePathList]=useState([]);        // 원래 사진 경로
    const [photoNoList, setPhotoNoList] = useState([]);                 // 원래 사진 번호

    const putPhotoFilePath = (newPhoto) => { //사진 미리보기
        console.log(newPhoto)
        setPhotoFilePathList([...photoFilePathList,newPhoto]);
    }
    const putPhotoNo = (PhotoNo) => {
        const newList=[...photoNoList,PhotoNo];
        setPhotoNoList(newList);
    }
    props.setInsertPhotoNo(photoNoList);

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
            });
            if(response.data.code==='2000'){
                // console.log(response.data.result)
                // callback(response.data.result.photoNo); // photoNo만
                console.log(response.data.result.photoNo);

                const newFilePath = (response.data.result.filePath);
                const newChangeName = (response.data.result.changeName);

                const newFilePathName = newFilePath+newChangeName;

                putPhotoFilePath([newFilePathName]) // photoPath 미리보기 데이터
                putPhotoNo(response.data.result.photoNo) // photoNo List 시키기
                e.target.value="";
            }
        }
    }
    return (
        <div>
            <Button
                variant="contained"
                component="label"
                startIcon={<AddAPhotoIcon/>}
                style={{marginBottom:"10px"}}>
                Upload
                <input hidden type="file" accept="image/*" onChange={onChange}/>
            </Button>
            <hr/>
            <div>
                <Rendering/>
                <div style={{clear:"both"}}></div>
                {/*{photoNoList}*/}
            </div>
            <hr/>
        </div>
    );
}

export default FeedPictureInsert;