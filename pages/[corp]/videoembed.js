import React, { useState, useEffect } from 'react';
import VideoEmbedPresentational from "../../components/videoEmbed/VideoEmbedPresentational";
import initialize from "../../utils/initialize";
import axios from "axios";
import {useSelector} from "react-redux";
import arrayMove from "array-move";
import {useRouter} from "next/router";
import useInput from "../../hooks/useInput";
import {urlChecker} from "../../utils/common";
import * as constants from "../../utils/constants";

const serverProtocol = constants.config.chatServer.PROTOCOL;
const serverURL = constants.config.chatServer.URL;


const VideoEmbed = ({ videoList }) => {
    const router = useRouter();
    const [linkList, setLinkList] = useState(videoList);
    const [editOrder, setEditOrder] = useState(false);
    const [linkIndex, setLinkIndex] = useState([]);
    const [copyLinkList, setCopyLinkList] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [isOpen, setIsOpen] = useState(1);
    const [editData, setEditData] = useState(null);
    const [videoInputs, setVideoInputs] = useState({
        subject: editData ? editData.title : '',
        explain: editData ? editData.title_sub : '',
        videoUrl: editData ? editData.link : '',
    });
    const { userInfo } = useSelector(state => state.auth);
    const { subject, explain, videoUrl } = videoInputs;
    let deleteLink = [];

    const videoInputsChange = e => {
        const { name, value } = e.target;
        setVideoInputs({
            ...videoInputs,
            [name]: value,
        });
    }
    const onSortEnd = ({oldIndex, newIndex}) => {
        let sortResult = arrayMove(linkList, oldIndex, newIndex);
        let reSortData = sortResult.map((value) => {
            return value.link_id
        });

        setLinkIndex(reSortData);
        setLinkList(sortResult);
    };

    const updateOrder = async () => {
        let params = {
            cp_id: userInfo.cp_id,
            list_index: linkIndex
        }
        try {
            // await bsApi.post(`/link/updateIndex`, params);
        } catch (e) {
            throw new Error(e);
        }
    }

    const deleteCard = async (link_id) => {
        if (confirm('정말로 삭제하시겠습니까?')) {
            deleteLink.push(link_id);

            try {
                const resultData = await bsApi.post("/link/deleteLink", deleteLink);
                if (resultData.data.success === true) {
                    router.reload();
                    deleteLink = [];
                }
            } catch (e) {
                throw new Error(e);
            }
        }
    }

    const handleEditOpen = () => setEditOrder(true);
    const handleEditCancel = () => {
        setLinkList(copyLinkList);
        setEditOrder(false);
    }
    const handleEditComplete = async () => {
        let params = {
            cp_id: userInfo.cp_id,
            list_index: linkIndex
        }

        try {

        } catch(e) {
            throw new Error(e);
        }

        setCopyLinkList(linkList);
        setEditOrder(false);
    }

    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => {
        setOpenModal(false);
        setVideoInputs({
            subject: '',
            explain: '',
            videoUrl: '',
        });
    }
    const handleRadioChange = e => setIsOpen(parseInt(e.target.value, 10));
    const handleUpdateOpen = async id => {
        const res = await axios.get(`${serverProtocol}${serverURL}/videoLink/${id}`);
        setEditData(res.data);
        setVideoInputs({
            subject: res.data.title,
            explain: res.data.title_sub,
            videoUrl: res.data.video_link
        });
        handleOpenModal(true);
    }

    const onVideoUpload = () => {
        let youtubeId = null;

        console.info(subject);

        if (subject === '') {
            alert('제목을 입력해주세요.');
        } else if (explain === '') {
            alert('설명 내용을 입력해주세요.');
        } else if (videoUrl === '') {
            alert('동영상 링크 주소를 입력해주세요.');
        } else {
            // if (videoUrl.includes('youtu')) {
            let regExp = /^.*(youtu.be\/|v\/|embed\/|watch\?|youtube.com\/user\/[^#]*#([^\/]*?\/)*)\??v?=?([^#\&\?]*).*/;
            youtubeId = videoUrl.match(regExp) && videoUrl.match(regExp)[3];
            // }

            let params = {
                subject: subject,
                explain: explain,
                videoUrl: urlChecker(videoUrl),
                youtubeId: youtubeId,
            }
            console.info('업로드 data : ', params);

            setVideoInputs({
                subject: '',
                explain: '',
                videoUrl: '',
            });

        }
    }

    useEffect(() => setCopyLinkList(linkList), []);
    useEffect(() => {
        if (!userInfo || (userInfo && userInfo.user_type !== "admin")) {
            alert('접근 권한이 없습니다.');
            router.push(`/`);
        }
    }, [userInfo]);

    return (
        <>
            <VideoEmbedPresentational
                videoList={linkList}
                editOrder={editOrder}
                userInfo={userInfo}
                onSortEnd={onSortEnd}
                updateOrder={updateOrder}
                deleteCard={deleteCard}
                handleEditOpen={handleEditOpen}
                handleEditCancel={handleEditCancel}
                handleEditComplete={handleEditComplete}
                openModal={openModal}
                handleOpenModal={handleOpenModal}
                handleCloseModal={handleCloseModal}
                subject={subject}
                explain={explain}
                videoUrl={videoUrl}
                videoInputsChange={videoInputsChange}
                onVideoUpload={onVideoUpload}
                handleUpdateOpen={handleUpdateOpen}
                handleRadioChange={handleRadioChange}
                isOpen={isOpen}
                editData={editData}
            />
        </>
    )
}

VideoEmbed.getInitialProps = async (ctx) => {
    initialize(ctx);

    const res = await axios.get(`${serverProtocol}${serverURL}/videoLink`);

    return {
        videoList: res.data,
    }
}

export default VideoEmbed;