import React, {useState, useCallback, useEffect} from 'react';
import MainSettingPresentational from "../../components/mainSetting/MainSettingPresentational";
import initialize from "../../utils/initialize";
import axios from "axios";
import useInput from "../../hooks/useInput";
import {useRouter} from "next/router";
import arrayMove from "array-move";
import {useSelector} from "react-redux";
import {toast} from "react-toastify";
import {urlChecker} from "../../utils/common";
import * as constants from "../../utils/constants";

const serverProtocol = constants.config.chatServer.PROTOCOL;
const serverURL = constants.config.chatServer.URL;

const MainsSetting = ({settingData}) => {
    const router = useRouter();
    const { userInfo } = useSelector(state => state.auth);
    const [settingList, setSettingList] = useState(settingData);
    const [editOrder, setEditOrder] = useState(false);
    const [copySettingList, setCopySettingList] = useState([]);
    const [settingIndex, setSettingIndex] = useState([]);
    const [addLinkOpen, setAddLinkOpen] = useState(false);
    const [{introduction}, onIntroductionChange] = useInput('');
    const [logoFile, setLogoFile] = useState(null);
    const [tabActive, setTabActive] = useState({
        image: true,
        video: false
    });
    const [fileList, setFileList] = useState({
        file: [],
        previewUrl: [],
        videoList: [],
    });
    const {file, previewUrl, videoList} = fileList;
    /* -------------------------------
    const [{videoUrl_1, videoUrl_2, videoUrl_3}, onVideoUrlChange, onReset, setForm] = useInput({
        videoUrl_1: '',
        videoUrl_2: '',
        videoUrl_3: ''
    });
    useEffect(() => {
        setForm({
            videoUrl_1: videoList[0] ? videoList[0].link_address : '',
            videoUrl_2: videoList[1] ? videoList[1].link_address : '',
            videoUrl_3: videoList[2] ? videoList[2].link_address : '',
        });
    }, [videoList]);
    /*/
    const [videoUrl, setVideoUrl] = useState({
        videoUrl_1: '',
        videoUrl_2: '',
        videoUrl_3: ''
    });
    const { videoUrl_1,videoUrl_2,videoUrl_3 } = videoUrl;
    const onVideoUrlChange = e => setVideoUrl({...videoUrl, [e.target.name]: e.target.value});

    useEffect(() => {
        setVideoUrl({
            videoUrl_1: videoList[0] ? videoList[0].link_address : '',
            videoUrl_2: videoList[1] ? videoList[1].link_address : '',
            videoUrl_3: videoList[2] ? videoList[2].link_address : '',
        });
    }, [videoList]);
    // */

    const handleAddLinkOpen = () => setAddLinkOpen(true);
    const handleAddLinkClose = () => setAddLinkOpen(false);
    const onImageTab = () => setTabActive({image: true, video: false});
    const onVideoTab = () => setTabActive({image: false, video: true});

    const onSortEnd = ({oldIndex, newIndex}) => {
        setCopySettingList(settingList);

        let sortResult = arrayMove(settingList, oldIndex, newIndex);
        let reSortData = sortResult.map((value) => {
            return value.id
        });

        setSettingIndex(reSortData);
        setSettingList(sortResult);
    };
    const handleEditOpen = () => setEditOrder(true);
    const handleEditCancel = () => {
        setSettingList(copySettingList);
        setEditOrder(false);
    }
    const handleEditComplete = async () => {
        let params = {
            cp_id: userInfo.cp_id,
            list_index: settingIndex
        }

        try {
            // await
            setCopySettingList(settingList);
            setEditOrder(false);
        } catch(e) {
            throw new Error(e);
        }
    }

    const toggleVisible = useCallback(secure => {
        if (secure) {
            toast.info("비공개로 설정 되었습니다.");
        } else {
            toast.info("공개로 설정 되었습니다.");
        }
    }, []);

    const handleUploadImage = useCallback(e => {
        let reader = new FileReader();
        let img = e.target.files[0];

        reader.onload = () => {
            setFileList({
                ...fileList,
                file: [...file, img],
                previewUrl: [...previewUrl, reader.result],
            });
        }
        reader.readAsDataURL(img);
    }, [file]);

    const handleLogoUpload = useCallback(e => {
        let reader = new FileReader();
        let img = e.target.files[0];

        reader.onload = () => {
            setLogoFile(reader.result);
        }
        reader.readAsDataURL(img);
    }, [logoFile]);

    const handleDeleteImage = image => {
        setFileList({
            ...fileList,
            file: file.filter(item => item.id !== image.id),
        });
    }

    const handleImageUpload = () => {
        const formData = new FormData();

        formData.append('image_0',fileList.file[0] && fileList.file[0]);
        formData.append('image_1',fileList.file[1] && fileList.file[1]);
        formData.append('image_2',fileList.file[2] && fileList.file[2]);

        for (let pair of formData.entries()) {
            console.info(pair[0] + ', ' + pair[1]);
        }

        // handleAddLinkClose();
    }

    const handleVideoUpload = () => {
        let regExp = /^.*(youtu.be\/|v\/|embed\/|watch\?|youtube.com\/user\/[^#]*#([^\/]*?\/)*)\??v?=?([^#\&\?]*).*/;

        let youtubeId_1 = videoUrl_1 && videoUrl_1.match(regExp) && videoUrl_1.match(regExp)[3];
        let youtubeId_2 = videoUrl_2 && videoUrl_2.match(regExp) && videoUrl_2.match(regExp)[3];
        let youtubeId_3 = videoUrl_3 && videoUrl_3.match(regExp) &&  videoUrl_3.match(regExp)[3];
        let params = {};

        if (videoUrl_2 === "" && videoUrl_3 === "") {
            params = {
                videoUrl_1: videoUrl_1 && urlChecker(videoUrl_1),
                youtubeId_1: youtubeId_1,
            }
        } else if (videoUrl_1 !== "" && videoUrl_2 !== "" && videoUrl_3 === "") {
            params = {
                videoUrl_1: urlChecker(videoUrl_1),
                videoUrl_2: urlChecker(videoUrl_2),
                youtubeId_1: youtubeId_1,
                youtubeId_2: youtubeId_2,
            }
        } else {
            params = {
                videoUrl_1: urlChecker(videoUrl_1),
                videoUrl_2: urlChecker(videoUrl_2),
                videoUrl_3: urlChecker(videoUrl_3),
                youtubeId_1: youtubeId_1,
                youtubeId_2: youtubeId_2,
                youtubeId_3: youtubeId_3
            }
        }

        console.info('url data: ', params);
        // handleAddLinkClose();
    }

    const handleDeleteUrl = index => {
        let deleteUrl = videoList.filter((url, i) => i !== index);
        setFileList({
            ...fileList,
            videoList: deleteUrl
        });
    }

    const handleMainSettingComplete = () => {
        console.info('저장하기 누름:');
    }

    useEffect(() => {
        let newFile = [];
        let newPreviewUrl = [];
        let newVideoList = [];

        settingData.forEach(list => {
            if (list.link_type === "video") {
                newVideoList = newVideoList.concat(list);
            } else if (list.link_type === "image") {
                newFile = newFile.concat(list);
                newPreviewUrl = newPreviewUrl.concat(list);
            }
        });

        setFileList({
            file: newFile,
            previewUrl: newPreviewUrl,
            videoList: newVideoList
        });
    }, [settingData]);

    useEffect(() => {setCopySettingList(settingList)}, []);
    useEffect(() => {
        if (!userInfo || (userInfo && userInfo.user_type !== "admin")) {
            alert('접근 권한이 없습니다.');
            router.push(`/`);
        }
    }, [userInfo]);


    return (
        <>
            <MainSettingPresentational
                userInfo={userInfo}
                settingList={settingList}
                addLinkOpen={addLinkOpen}
                handleAddLinkOpen={handleAddLinkOpen}
                handleAddLinkClose={handleAddLinkClose}
                tabActive={tabActive}
                onImageTab={onImageTab}
                onVideoTab={onVideoTab}
                fileList={fileList}
                handleUploadImage={handleUploadImage}
                handleDeleteImage={handleDeleteImage}
                handleDeleteUrl={handleDeleteUrl}

                videoUrl_1={videoUrl_1}
                videoUrl_2={videoUrl_2}
                videoUrl_3={videoUrl_3}
                onVideoUrlChange={onVideoUrlChange}

                handleImageUpload={handleImageUpload}
                handleVideoUpload={handleVideoUpload}

                introduction={introduction}
                onIntroductionChange={onIntroductionChange}
                logoFile={logoFile}
                handleLogoUpload={handleLogoUpload}

                editOrder={editOrder}
                onSortEnd={onSortEnd}
                handleEditOpen={handleEditOpen}
                handleEditCancel={handleEditCancel}
                handleEditComplete={handleEditComplete}

                toggleVisible={toggleVisible}

                handleMainSettingComplete={handleMainSettingComplete}
            />
        </>
    )
}

MainsSetting.getInitialProps = async ctx => {
    initialize(ctx);

    const res = await axios.get(`${serverProtocol}${serverURL}/mainSetting`);

    return {
        settingData: res.data,
    }
}

export default MainsSetting;