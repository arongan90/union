import React, {useState, useCallback, useEffect} from 'react';
import SettingMainPresentation from "../../components/settingMain/settingMainPresentation";
import initialize from "../../utils/initialize";
import axios from "axios";
import useInput from "../../hooks/useInput";
import {useRouter} from "next/router";

const SettingMain = ({settingData}) => {
    const router = useRouter();
    const [imageFileList, setImageFileList] = useState({
        file: [],
        previewUrl: [],
    });
    const [addLinkOpen, setAddLinkOpen] = useState(false);
    const [tabActive, setTabActive] = useState({
        image: true,
        video: false
    });

    const handleAddLinkOpen = () => setAddLinkOpen(true);
    const handleAddLinkClose = () => setAddLinkOpen(false);
    const onImageTab = () => setTabActive({image: true, video: false});
    const onVideoTab = () => setTabActive({image: false, video: true});

    const [{ introduction }, onIntroductionChange] = useInput('');
    const [{ videoUrl_1, videoUrl_2, videoUrl_3}, onVideoUrlChange, onReset] = useInput({
        videoUrl_1: '',
        videoUrl_2: '',
        videoUrl_3: ''
    })

    const handleUploadImage = useCallback(e => {
        let reader = new FileReader();
        let img = e.target.files[0];

        reader.onload = () => {
            setImageFileList({
                file: [...imageFileList.file, img],
                previewUrl: [...imageFileList.previewUrl, reader.result]
            });
        }
        reader.readAsDataURL(img);
    }, [imageFileList.file]);

    const handleDeleteImage = useCallback((file) => {
        imageFileList.file.filter(item => item.name !== file.name);

        // imageFileList.file.filter((item) => {
        //     console.info('item.type ::: ', item.name);
        //     console.info('file.name ::: ', file.name);
        //     console.info('===== ::: ', item.name !== file.name);
        //     return item.name !== file.name;
        // });
    }, [imageFileList.file]);

    useEffect(() => {
        console.info(imageFileList.file);
    }, [imageFileList.file]);

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

    const handleDeleteUrl = (index) => {

    }

    const handleMainSettingComplete = () => {
        console.info('완료');
    }

    const goBack = () => router.back();

    return (
        <>
            <SettingMainPresentation
                addLinkOpen={addLinkOpen}
                handleAddLinkOpen={handleAddLinkOpen}
                handleAddLinkClose={handleAddLinkClose}
                tabActive={tabActive}
                onImageTab={onImageTab}
                onVideoTab={onVideoTab}
                imageFileList={imageFileList}
                handleUploadImage={handleUploadImage}
                handleDeleteImage={handleDeleteImage}

                videoUrl_1={videoUrl_1}
                videoUrl_2={videoUrl_2}
                videoUrl_3={videoUrl_3}
                onVideoUrlChange={onVideoUrlChange}
                onReset={onReset}

                handleImageUpload={handleImageUpload}
                handleVideoUpload={handleVideoUpload}

                introduction={introduction}
                onIntroductionChange={onIntroductionChange}

                handleMainSettingComplete={handleMainSettingComplete}
                goBack={goBack}
            />
        </>
    )
}

SettingMain.getInitialProps = async ctx => {
    initialize(ctx);

    const res = await axios.get(`http://localhost:4000/mainSetting`);

    return {
        settingData: res.data,
    }
}

export default SettingMain;