import React, { useState, useEffect } from 'react';
import VideoEmbedPresentation from "../../components/videoEmbed/VideoEmbedPresentation";
import initialize from "../../utils/initialize";
import axios from "axios";
import {useSelector} from "react-redux";
import arrayMove from "array-move";
import {useRouter} from "next/router";
import useInput from "../../hooks/useInput";

const Videoembed = ({ videoList }) => {
    const router = useRouter();
    const [linkList, setLinkList] = useState(videoList);
    const [editOrder, setEditOrder] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [linkIndex, setLinkIndex] = useState([]);
    const [secureList, setSecureList] = useState();
    const [{ subject, explain, videoUrl}, onChange, onReset] = useInput({
        subject: '',
        explain: '',
        videoUrl: '',
    })
    const { userInfo } =useSelector(state => state.auth);
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

    const handleEditOrder = () => setEditOrder(!editOrder);
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    const onVideoUpload = () => {
        if (subject === '') {
            alert('제목을 입력해주세요.');
        } else if (explain === '') {
            alert('설명 내용을 입력해주세요.');
        } else if (videoUrl === '') {
            alert('동영상 링크 주소를 입력해주세요.');
        } else {
            console.info(subject, explain, videoUrl);
        }
    }

    const onChangeSecure = (secure, id) => {
        let changeSecure;

        if (secure === 1) {
            changeSecure = 0;
        } else {
            changeSecure = 1;
        }

        setSecureList({
            ...secureList,
            [id]: changeSecure
        });

        console.info(secureList);
    }

    return (
        <>
            <VideoEmbedPresentation
                videoList={linkList}
                editOrder={editOrder}
                userInfo={userInfo}
                onSortEnd={onSortEnd}
                updateOrder={updateOrder}
                deleteCard={deleteCard}
                handleEditOrder={handleEditOrder}
                openModal={openModal}
                handleOpenModal={handleOpenModal}
                handleCloseModal={handleCloseModal}
                subject={subject}
                explain={explain}
                videoUrl={videoUrl}
                modalInputOnChange={onChange}
                onVideoUpload={onVideoUpload}
                onChangeSecure={onChangeSecure}
            />
        </>
    )
}

Videoembed.getInitialProps = async (ctx) => {
    initialize(ctx);

    const res = await axios.get(`http://localhost:4000/videoLink`);

    return {
        videoList: res.data,
    }
}

export default Videoembed;