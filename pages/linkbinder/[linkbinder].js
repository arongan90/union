import React, {useState, useEffect} from 'react';
import LinkBinderPresentation from "../../components/linkBinder/LinkBinderPresentation";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import arrayMove from "array-move";
import {useRouter} from "next/router";
import * as constants from "../../utils/constants";
import initialize from "../../utils/initialize";
import {setCorp} from "../../modules/corpInfo";

const serverProtocol = constants.config.chatServer.PROTOCOL;
const serverURL = constants.config.chatServer.URL;

const LinkBinder = ({linkData, corpName}) => {
    const router = useRouter();
    const [linkList, setLinkList] = useState(linkData);
    const [editOrder, setEditOrder] = useState(false);
    const [linkIndex, setLinkIndex] = useState([]);
    const [secureValue, setSecureValue] = useState(new Set());
    const [copyLinkList, setCopyLinkList] = useState([]);
    const {userInfo} = useSelector(state => state.auth);

    const secureSwitchHandler = (id, isChecked) => {
        if (isChecked) {
            secureValue.add(id);
            setSecureValue(secureValue);
        } else if (!isChecked && secureValue.has(id)) {
            secureValue.delete(id);
            setSecureValue(secureValue);
        }
        console.info(':!!!!!', secureValue);
    }

    let deleteLink = [];

    useEffect(() => {
        setCopyLinkList(linkList);

    }, []);

    const goPage = async (value) => {
        let parameter = {
            link_id: value.link_id
        }
        try {
            // const resultData = await bsApi.post("/link/viewCount", parameter);
        } catch (e) {
            throw new Error(e);
        }
        window.open(`${value.address}`);
    }

    const onSortEnd = ({oldIndex, newIndex}) => {
        setCopyLinkList(linkList);

        let sortResult = arrayMove(linkList, oldIndex, newIndex);
        let reSortData = sortResult.map((value) => {
            return value.link_id
        });

        setLinkIndex(reSortData);
        setLinkList(sortResult);
    };

    const deleteCard = async (link_id) => {
        if (confirm('정말로 삭제하시겠습니까?')) {
            deleteLink.push(link_id);

            try {
                // const resultData = await bsApi.post("/link/deleteLink", deleteLink);
                // if (resultData.data.success === true) {
                //     router.reload();
                //     deleteLink = [];
                // }
            } catch (e) {
                throw new Error(e);
            }
        }
    }




    const handleEditOpen = () => {
        setEditOrder(true);
    }
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
            // await bsApi.post(`/link/updateIndex`, params);
        } catch (e) {
            throw new Error(e);
        }
        setCopyLinkList(linkList);
        setEditOrder(false);
    }

    return (
        <LinkBinderPresentation
            linkList={linkList}
            editOrder={editOrder}
            userInfo={userInfo}
            router={router}
            goPage={goPage}
            onSortEnd={onSortEnd}
            deleteCard={deleteCard}
            handleEditOpen={handleEditOpen}
            handleEditCancel={handleEditCancel}
            handleEditComplete={handleEditComplete}
            secureSwitchHandler={secureSwitchHandler}
        />
    );
}

LinkBinder.getInitialProps = async (ctx) => {

    const res = await axios.get(`${serverProtocol}${serverURL}/linkbinder`);
    const linkData = res.data;


    return {
        linkData,
    }
};

export default LinkBinder;