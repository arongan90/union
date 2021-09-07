import React, {useState, useEffect} from 'react';
import LinkBinderPresentation from "../../../components/linkBinder/LinkBinderPresentation";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import arrayMove from "array-move";
import {useRouter} from "next/router";
import initialize from "../../../utils/initialize";

const LinkBinder = ({linkData}) => {
    const router = useRouter();
    const [linkList, setLinkList] = useState(linkData);
    const [editOrder, setEditOrder] = useState(false);
    const [linkIndex, setLinkIndex] = useState([]);
    const {userInfo} = useSelector(state => state.auth);
    let deleteLink = [];

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

    const handleEditOrder = () =>setEditOrder(!editOrder);

    return (
        <LinkBinderPresentation
            linkList={linkList}
            editOrder={editOrder}
            userInfo={userInfo}
            router={router}
            goPage={goPage}
            onSortEnd={onSortEnd}
            updateOrder={updateOrder}
            deleteCard={deleteCard}
            handleEditOrder={handleEditOrder}
        />
    );
}

LinkBinder.getInitialProps = async (ctx) => {
    const res = await axios.get('http://localhost:4000/linkbinder');
    const linkData = res.data;

    return {
        linkData
    }
};

export default LinkBinder;