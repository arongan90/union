import React, {useCallback, useEffect, useState} from "react";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from "@material-ui/core/Typography";
import {connect, useSelector} from "react-redux";
import * as constants from "../../utils/constants";
import {useRouter} from "next/router";
import styled from "styled-components";
import axios from "axios";
import colors from "../../styles/colors";
import Switch from '@material-ui/core/Switch';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import OrderButton from "../../share/components/OrderButton";
import useInput from "../../hooks/useInput";
import inputCloseSvg from "/public/images/share/inputClose.svg";
// import moment from 'moment';


const serverURL = constants.config.chatServer.URL;
const serverProtocol = constants.config.chatServer.PROTOCOL;

const Wrapper = styled.div`
  width: 100%;
  min-height: calc(100vh - 60px);
  padding-top: 60px;
  background: ${colors.tabMenu};

  @media screen and (max-width: 767px) {
   padding: 0 10px;
  }
`;
const MemberListBox = styled.div`
  max-width: 530px;
  margin: 25px auto;
  padding: 40px 10px 70px;
  background: #fff;
  box-shadow: 0 0 8px ${colors.lightShadowColor};

  @media screen and (max-width: 767px) {
    padding: 10px 10px 30px;
  }
`;
const Title = styled.div`
  font-weight: bold;
  font-size: 24px;
  color: ${colors.chatDefaultColor};
  margin-bottom: 30px;
  text-align: center;
`;
const SearchBox = styled.div`
  width: 100%;
  height: 45px;
  border-radius: 2px;
  margin-bottom: 15px;
  padding: 4px;
  display: flex;
  align-items: center;
  border: 1px solid ${colors.loginTabBorder}
`;
const SearchInput = styled.input`
  width: 77%;
  height: 100%;
  border: none;
  outline: none;
  padding-left: 10px;

  &::placeholder {
    color: ${colors.loginDefaultFont}
  }
`;
const ResetImage = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 10px;
  cursor: pointer;
`;
const MemberTable = styled.table`
  width: 100%;
  margin: 0 auto;
  border-radius: 2px;

  thead tr th {
    font-weight: bold;
    background: ${colors.borderLightGray};
  }

  th, td {
    height: 34px;
    color: ${colors.blackColor};
    font-size: 12px;
    border: 1px solid ${colors.footerText};
    text-align: center;
    vertical-align: middle;
  }

  @media screen and (max-width: 767px) {
    display: none;
  }
`;

// Mobile
const MobileTableBox = styled.div`
  width: 100%;
  margin-bottom: 10px;
  position: relative;
  display: none;
  
  &::after {
    content: "";
    position: absolute;
    width: 1px;
    height: 100%;
    top: 0;
    right: 0;
    border-right: 1px solid ${colors.footerText};
  }
  
  @media screen and (max-width: 767px) {
    display: flex;
  }
`;
const NameBox = styled.div`
  text-align: center;
`;
const InfoBox = styled.div`
  width: 85%;
  display: flex;
  overflow: hidden;
  overflow-x: scroll;
`;
const TableBox = styled.div`
    margin-left: -1px;
`;

const TableTd = styled.div`
  width: ${({width}) => width}px;
  height: 40px;
  text-align: center;
  font-size: 12px;
  color: ${colors.blackColor};
  border: 1px solid ${colors.footerText};
  margin-top: -1px;
  padding: ${({padding}) => padding ? 'none' : '10px 0'};
`;
const TableHead = styled.div`
  font-size: 12px;
  height: 34px;
  padding: 7px 0;
  text-align: center;
  color: ${colors.blackColor};
  font-weight: bold;
  border: 1px solid ${colors.footerText};
  background: ${colors.borderLightGray};
`;


function Member({userData}) {
    const router = useRouter();
    const {userInfo} = useSelector(state => state.auth);
    const [{memberInfo}, onChange, onReset] = useInput({memberInfo: ''});
    const [searchMember, setSearchMember] = useState([]);

    const handleSwitch = async (e, name) => {
        if (!e.target.checked) {
            if (confirm(`${name} ?????? ????????? ?????????????????????????`)) {
                try {
                    toast.info(`${name}?????? ????????? ?????????????????????.`);
                } catch (e) {
                    throw new Error(e);
                }
            }
        } else {
            try {
                toast.info(`${name}?????? ??????????????? ?????????????????????.`);
            } catch (e) {
                throw new Error(e);
            }
        }
    }

    const onSearchMember = () => {
        if (memberInfo === '') {
            alert('????????? ????????? ????????? ??????????????????.');
        } else {
            let result = userData.find(user => user.name === memberInfo || user.nickname === memberInfo);
            if (result === undefined) {
                alert('????????? ????????? ????????? ????????????.');
            } else {
                setSearchMember([result]);
            }
            onReset();
        }
    }

    const onSearchReset = () => setSearchMember([]);

    useEffect(() => {
        if (!userInfo || (userInfo && userInfo.user_type !== "admin")) {
            alert('?????? ????????? ????????????.');
            router.push(`/`);
        }
    }, [userInfo]);

    return (
        <Wrapper>
            <MemberListBox>
                {userInfo && userInfo.user_type === 'admin'
                    ? <>
                        <Title>????????????</Title>
                        <SearchBox>
                            <SearchInput
                                type="text"
                                name="memberInfo"
                                placeholder="?????? ?????? ???????????? ??????????????????."
                                value={memberInfo}
                                onChange={onChange}
                                onKeyPress={e => e.key === "Enter" && onSearchMember()}
                            />
                            <ResetImage src={inputCloseSvg} onClick={onSearchReset} />
                            <OrderButton
                                width={85}
                                height={37}
                                bgColor={colors.loginPoint}
                                fontColor={colors.whiteColor}
                                borderRadius="2px"
                                // onClick={onSearchMember}
                            >??????</OrderButton>
                        </SearchBox>

                        <MobileTableBox>
                            <NameBox>
                                <TableBox>
                                    <TableHead>??????</TableHead>
                                    {userData.map(member => (
                                        <TableTd key={member.id} width={80}>{member.name}</TableTd>

                                    ))}
                                </TableBox>
                            </NameBox>
                            <InfoBox>
                                <TableBox>
                                    <TableHead>?????????</TableHead>
                                    {userData.map(member => (
                                        <TableTd key={member.id} width={100}>
                                            {member.nickname}
                                        </TableTd>
                                    ))}
                                </TableBox>
                                <TableBox>
                                    <TableHead>????????????</TableHead>
                                    {userData.map(member => (
                                        <TableTd key={member.id} width={150}>
                                            {member.phone_no}
                                        </TableTd>
                                    ))}
                                </TableBox>
                                <TableBox>
                                    <TableHead>?????????</TableHead>
                                    {userData.map(member => (
                                        <TableTd key={member.id} width={80}>
                                            {member.recommender}
                                        </TableTd>
                                    ))}
                                </TableBox>
                                <TableBox>
                                    <TableHead>?????????</TableHead>
                                    {userData.map(member => (
                                        <TableTd key={member.id} width={100}>
                                            {member.reg_dt}
                                        </TableTd>
                                    ))}
                                </TableBox>
                                <TableBox>
                                    <TableHead>????????????</TableHead>
                                    {userData.map(member => (
                                        <TableTd key={member.id} width={80} padding>
                                            <Switch
                                                color="primary"
                                                name={member.id.toString()}
                                                checked={!!member.approval}
                                                onChange={e => handleSwitch(e, member.name)}
                                            />
                                        </TableTd>
                                    ))}
                                </TableBox>
                            </InfoBox>
                        </MobileTableBox>


                        <MemberTable>
                            <thead>
                            <tr>
                                <th style={{width: '14%'}}>??????</th>
                                <th style={{width: '20%'}}>?????????</th>
                                <th style={{width: '29%'}}>????????????</th>
                                <th style={{width: '13%'}}>?????????</th>
                                <th style={{width: '14%'}}>?????????</th>
                                <th style={{width: '14%'}}>????????????</th>
                            </tr>
                            </thead>
                            <tbody>
                            {searchMember.length > 0
                                ?
                                searchMember.map(member => {
                                    return (
                                        <tr key={member.id}>
                                            <td>{member.name}</td>
                                            <td>{member.nickname}</td>
                                            <td>{member.phone_no}</td>
                                            <td>{member.recommender}</td>
                                            <td>
                                                {/*{moment(member.reg_dt).format('MM.DD')}*/}
                                                {member.reg_dt}
                                            </td>
                                            <td>
                                                <Switch
                                                    color="primary"
                                                    name={member.id.toString()}
                                                    checked={!!member.approval}
                                                    onChange={e => handleSwitch(e, member.name)}
                                                />
                                            </td>
                                        </tr>
                                    )})
                                :
                                userData.map(member => {
                                    return (
                                        <tr key={member.id}>
                                            <td>{member.name}</td>
                                            <td>{member.nickname}</td>
                                            <td>{member.phone_no}</td>
                                            <td>{member.recommender}</td>
                                            <td>
                                                {/*{moment(member.reg_dt).format('MM.DD')}*/}
                                                {member.reg_dt}
                                            </td>
                                            <td>
                                                <Switch
                                                    color="primary"
                                                    name={member.id.toString()}
                                                    checked={!!member.approval}
                                                    onChange={e => handleSwitch(e, member.name)}
                                                />
                                            </td>
                                        </tr>
                                    )
                                }
                            )}
                            </tbody>
                        </MemberTable>
                    </>
                    :
                    <>
                        <Avatar style={{margin: '0px auto', marginBottom: 40}}>
                            <LockOutlinedIcon/>
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            ????????? ????????????.
                        </Typography>
                    </>
                }
            </MemberListBox>
        </Wrapper>
    );
}

Member.getInitialProps = async (ctx) => {
    const res = await axios.get(`${serverProtocol}${serverURL}/member`);
    const userData = res.data;

    return {
        userData
    }
}

export default Member;