import React, {useCallback, useEffect, useState} from 'react';
import { useRouter } from "next/router";
import useInput from "../../../../hooks/useInput";
import UpdateLinkPresentation from "../../../../components/linkBinder/UpdateLinkPresentation";
import {useSelector} from "react-redux";
import initialize from "../../../../utils/initialize";
import axios from "axios";
import * as constants from "../../../../utils/constants";

const serverProtocol = constants.config.chatServer.PROTOCOL;
const serverURL = constants.config.chatServer.URL;

const LinkId = ({ linkData }) => {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(linkData.secure);
    const [linkType, setLinkType] = useState('');
    const [fileUpload, setFileUpload] = useState({
        file: undefined,
        previewUrl: linkData.image_path
    });
    const [{ linkTitle, linkUrl }, handleInputChange, onReset] = useInput({
        linkTitle: linkData.title,
        linkUrl: linkData.address
    });
    const { corpInfo } = useSelector(state => state.auth);

    const handleSelected = e => setLinkType(e.target.value);
    const handleRadioChange = e => setIsOpen(parseInt(e.target.value, 10));
    const onCancel = () => router.back();
    const handleFileUpload = useCallback(e => {
        let reader = new FileReader();
        let img = e.target.files[0];

        reader.onload = () => {
            setFileUpload({
                file: img,
                previewUrl: reader.result
            });
        }
        reader.readAsDataURL(img);
    }, [fileUpload]);

    const onRegister = useCallback(async () => {
        let formData = new FormData();

        // if (fileUpload.file === undefined) {
        //     alert('이미지를 등록해주세요.');
        // } else
        if (!linkTitle) {
            alert('링크 제목을 입력해주세요.');
        } else if (linkType === '선택하기') {
            alert('링크 종류를 선택해주세요.');
        } else if (!linkUrl) {
            alert('링크 주소를 입력해주세요.');
        } else {
            // formData.append('uploadFiles', fileUpload.file);
            // formData.append('kinds', linkType);
            // formData.append('title', linkTitle);
            // formData.append('address', linkUrl);
            // formData.append('secure', isOpen);
            // formData.append('image_path', fileUpload.previewUrl);
            // formData.append('cp_id', corpInfo.id);
            // formData.append('mode', props.pathname);
            // formData.append('link_id', update.id);
        }

        // for (let pair of formData.entries()) {
        //     console.log(pair[0]+ ', ' + pair[1]);
        // }

        // fetch(`${serverProtocol}${serverURL}/link/newInsertLink`, {
        //     method: "POST",
        //     body: formData,
        //     // headers: {
        //     //     'Accept': 'application/json; odata=verbose',
        //     //     'Content-Type': 'application/json'
        //     // }
        // }).then(response => response.json())
        //     .then(res => {
        //         // window.location = `/${props.corpname}/linkbinder/${props.corpname}`;
        //         router.push(`/${props.corpname}/linkbinder/${props.corpname}`);
        //     });
    }, []);

    return (
        <>
            <UpdateLinkPresentation
                isOpen={isOpen}
                handleSelected={handleSelected}
                handleRadioChange={handleRadioChange}
                linkTitle={linkTitle}
                linkUrl={linkUrl}
                handleInputChange={handleInputChange}
                onCancel={onCancel}
                onRegister={onRegister}
                fileUpload={fileUpload}
                setFileUpload={setFileUpload}
                handleFileUpload={handleFileUpload}
                linkData={linkData}
            />
        </>
    )
}

LinkId.getInitialProps = async (ctx) => {
    initialize(ctx);

    let linkId = ctx.query.linkid
    const res = await axios.get(`${serverProtocol}${serverURL}/linkbinder/${linkId}`);

    return {
        linkData: res.data,
    }
}

export default LinkId;