import React, {useCallback, useState} from 'react';
import AddCoverPresentation from "../../../components/linkBinder/AddCoverPresentational";
import useInput from "../../../hooks/useInput";
import {useRouter} from "next/router";

const AddCover = () => {
    const router = useRouter();
    const [fileUpload, setFileUpload] = useState({
        file: undefined,
        previewUrl: ''
    });
    const [{ youtubeLink, instaLink, blogLink, kakaoLink }, snsLinkChange] = useInput({
        youtubeLink: "",
        instaLink: "",
        blogLink: "",
        kakaoLink: ""
    })
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

    const handleSaveCoverImage = () => {

    }
    const handleCancel = () => router.back();

    return (
        <AddCoverPresentation
            fileUpload={fileUpload}
            handleFileUpload={handleFileUpload}
            snsLinkChange={snsLinkChange}
            youtubeLink={youtubeLink}
            instaLink={instaLink}
            blogLink={blogLink}
            kakaoLink={kakaoLink}
            handleCancel={handleCancel}
        />
    )
}

export default AddCover;