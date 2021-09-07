import React, {useState, useCallback, useEffect} from 'react';
import SettingMainPresentation from "../../components/settingMain/settingMainPresentation";
import initialize from "../../utils/initialize";
import axios from "axios";

const SettingMain = ({settingData}) => {
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
    }, [imageFileList]);

    const handleDeleteImage = useCallback((file) => {
        console.info('imageFileList ::: ', imageFileList);
        imageFileList.file.filter(img => img.name === file.name);
        console.info('imageFileList ::: ', imageFileList);
    }, []);


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