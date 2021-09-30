import React, { useState, useEffect } from 'react';
import VideoEmbedPresentational from "../../components/videoEmbed/VideoEmbedPresentational";
import initialize from "../../utils/initialize";
import axios from "axios";
import {useSelector} from "react-redux";
import arrayMove from "array-move";
import {useRouter} from "next/router";
import useInput from "../../hooks/useInput";
import * as constants from "../../utils/constants";
import {urlChecker} from "../../utils/common";

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
    const [editData, setEditData] = useState(undefined);
    const [{ subject, explain, videoUrl}, onChange, onReset] = useInput({
        subject: '',
        explain: '',
        videoUrl: '',
    });
    const { userInfo } = useSelector(state => state.auth);
    let deleteLink = [];

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
        let parmas = {
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
    const handleCloseModal = () => setOpenModal(false);
    const handleRadioChange = e => setIsOpen(parseInt(e.target.value, 10));
    const handleUpdateOpen = async id => {
        const res = await axios.get(`${serverProtocol}${serverURL}/videoLink/${id}`);
        setEditData(res.data);
        handleOpenModal(true);
    }

    const onVideoUpload = () => {
        if (subject === '') {
            alert('제목을 입력해주세요.');
        } else if (explain === '') {
            alert('설명 내용을 입력해주세요.');
        } else if (videoUrl === '') {
            alert('동영상 링크 주소를 입력해주세요.');
        } else {
            let regExp = /^.*(youtu.be\/|v\/|embed\/|watch\?|youtube.com\/user\/[^#]*#([^\/]*?\/)*)\??v?=?([^#\&\?]*).*/;
            let youtubeId = videoUrl.match(regExp)[3];

            let params = {
                subject: subject,
                explain: explain,
                videoUrl: urlChecker(videoUrl),
                youtubeId: youtubeId,
            }
            console.info('업로드 data : ', params);

        }
    }

    useEffect(() => {
        setCopyLinkList(linkList);
    }, []);

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
                modalInputOnChange={onChange}
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