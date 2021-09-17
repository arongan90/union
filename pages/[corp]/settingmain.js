import React, {useState, useCallback, useEffect} from 'react';
import SettingMainPresentation from "../../components/settingMain/SettingMainPresentation";
import initialize from "../../utils/initialize";
import axios from "axios";
import useInput from "../../hooks/useInput";
import {useRouter} from "next/router";
import * as constants from "../../utils/constants";
import arrayMove from "array-move";
import {useSelector} from "react-redux";

const serverProtocol = constants.config.chatServer.PROTOCOL;
const serverURL = constants.config.chatServer.URL;

const SettingMain = ({settingData}) => {
    const router = useRouter();
    const { userInfo } = useSelector(state => state.auth);
    const [settingList, setSettingList] = useState(settingData);
    const [editOrder, setEditOrder] = useState(false);
    const [copySettingList, setCopySettingList] = useState([]);
    const [settingIndex, setSettingIndex] = useState([]);
    const [addLinkOpen, setAddLinkOpen] = useState(false);
    const [{introduction}, onIntroductionChange] = useInput('');
    const [logoFile, setLogoFile] = useState(undefined);
    const [tabActive, setTabActive] = useState({
        image: true,
        video: false
    });
    //* -------------------------------
    const [{videoUrl_1, videoUrl_2, videoUrl_3}, onVideoUrlChange, onReset, setForm] = useInput({
        videoUrl_1: '',
        videoUrl_2: '',
        videoUrl_3: ''
    }); /*/
    const [videoUrl, setVideoUrl] = useState({
        videoUrl_1: '',
        videoUrl_2: '',
        videoUrl_3: ''
    });
    const onVideoUrlChange = e => {
        setVideoUrl({...videoUrl, [e.target.name]: e.target.value});
    }
    const { videoUrl_1,videoUrl_2,videoUrl_3 } = videoUrl;
    const onReset = () => setVideoUrl({
        videoUrl_1: '',
        videoUrl_2: '',
        videoUrl_3: ''
    });// */
    const [fileList, setFileList] = useState({
        file: [],
        previewUrl: [],
        videoList: [],
    });
    const {file, previewUrl, videoList} = fileList;

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
        const deleteFile = file.filter(item => item.name !== image.name);
        setFileList({
            ...fileList,
            file: deleteFile
        });
    }

    const handleImageUpload = () => {
        const formData = new FormData();

        // formData.append('image', imageFileList.file[0]);
        console.info('image data: ');
        handleAddLinkClose();
    }

    const handleVideoUpload = () => {
        let params = {
            videoUrl_1: videoUrl_1,
            videoUrl_2: videoUrl_2,
            videoUrl_3: videoUrl_3,
        }
        console.info('url data: ', params);
        // handleAddLinkClose();
    }

    const handleDeleteUrl = index => {
        videoList.map((url, i) => {
            console.info(i, ':::',url);
        })
        let deleteUrl = videoList.filter((url, i) => i !== index);
        console.info('삭제된 후: ', deleteUrl)
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
            }
            if (list.link_type === "image") {
                newPreviewUrl = newPreviewUrl.concat(list);
            }
        });

        setFileList({
            file: newFile,
            previewUrl: newPreviewUrl,
            videoList: newVideoList
        });
    }, [settingData]);

    useEffect(() => {
        setForm({
            videoUrl_1: videoList[0] ? videoList[0].link_address : '',
            videoUrl_2: videoList[1] ? videoList[1].link_address : '',
            videoUrl_3: videoList[2] ? videoList[2].link_address : '',
        });
    }, [videoList]);

    useEffect(() => {
        setCopySettingList(settingList);
    }, []);


    return (
        <>
            <SettingMainPresentation
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
                onReset={onReset}

                handleImageUpload={handleImageUpload}
                handleVideoUpload={handleVideoUpload}

                introduction={introduction}
                onIntroductionChange={onIntroductionChange}
                logoFile={logoFile}
                handleLogoUpload={handleLogoUpload}

                //
                editOrder={editOrder}
                onSortEnd={onSortEnd}
                handleEditOpen={handleEditOpen}
                handleEditCancel={handleEditCancel}
                handleEditComplete={handleEditComplete}


                handleMainSettingComplete={handleMainSettingComplete}
            />
        </>
    )
}

SettingMain.getInitialProps = async ctx => {
    initialize(ctx);

    const res = await axios.get(`${serverProtocol}${serverURL}/mainSetting`);

    return {
        settingData: res.data,
    }
}

export default SettingMain;