import React, {useState} from 'react';
import styled, {css} from 'styled-components';
import DaumPostcode from "react-daum-postcode";
import {lighten, darken} from "polished";
import {
    TextField,
    Modal,
    Dialog,
    DialogContent,
    DialogTitle
} from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import colors from '../../styles/colors';
import Terms from "./Term";
import closeIcon from "/public/images/layout/closeIcon.svg";

const Wrap = styled.div`
  width: 100%;
  height: 100vh;
  padding-top: 60px;
`;
const Title = styled.h1`
  font-size: 30px;
  margin: 30px auto 10px;
  text-align: center;
`;
const Form = styled.form`
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
`;
const InputBox = styled.div`
  margin: 0 auto 40px;
  ${({term}) => term && css`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `}
`;
const Inputs = styled(TextField)`
  width: 100%;
  height: 50px;
`;
const PostModal = styled(Modal)`
  width: 500px;
  margin: 30% auto;
`;
const AgreeLabel = styled(FormControlLabel)`
  .Mui-checked {
    color: ${colors.loginPoint};
  }
`;
const AgreeCheckBox = styled(Checkbox)`
  color: ${colors.inputBorder};
`;
const ShowTerm = styled.span`
  font-size: 15px;
  font-weight: bold;
  color: ${colors.loginPoint};
  cursor: pointer;
  text-decoration: underline;
  text-underline-position: under;
`;
const Button = styled.button`
  width: 100%;
  height: 50px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  color: ${colors.whiteColor};
  background: ${colors.loginPoint};

  &:hover {
    background: ${lighten(0.1, colors.loginPoint)};
  }

  &:active {
    background: ${darken(0.1, colors.loginPoint)};
  }
`;
const DialogTitleBox = styled.div`
  display: flex;
  justify-content: space-between;
`;
const DialogClose = styled.div`
  width: 30px;
  height: 30px;
  cursor: pointer;
  background: url(${closeIcon}) no-repeat center;
`;


const SignUpPresentational = ({
                                  submitted,
                                  setSubmitted,
                                  signUpSuccess,
                                  setSignUpSuccess,
                                  validate,
                                  setValidate,
                                  helperText,
                                  setHelperText,
                                  data,
                                  setData,
                                  emailDomains,
                                  autoHyphenPhone,
                                  validateData,
                                  onInputChange
                              }) => {
    const [openAddress, setOpenAddress] = useState(false);
    const [openTerm, setOpenTerm] = useState(false);
    const handleAddressComplete = (addrData) => {
        // let tmpData = {...data, cpId : cpData.id};
        // let tmpValid = {...validate};
        // tmpData.region = `${addrData.sido} ${addrData.sigungu}`;
        // tmpValid.region = true;
        // setData(tmpData);
        // setValidate(tmpValid);
        // setOpenAddressApi(false);
    };

    return (
        <Wrap>
            <Title>회원가입</Title>
            <Form noValidate>
                <InputBox>
                    <Inputs
                        id="email"
                        name="email"
                        label="Email"
                        variant="outlined"
                        autoComplete="email"
                        fullWidth
                        required
                        helperText={helperText.email}
                        onChange={e => validateData(e, 'email')}
                    />
                </InputBox>
                <InputBox>
                    <Inputs
                        id="password"
                        name="email"
                        label="비밀번호"
                        type="password"
                        variant="outlined"
                        autoComplete="current-password"
                        fullWidth
                        required
                        helperText={helperText.password}
                        onChange={e => validateData(e, 'password')}
                    />
                </InputBox>
                <InputBox>
                    <Inputs
                        id="password2"
                        name="password2"
                        label="비밀번호 확인"
                        type="password"
                        variant="outlined"
                        fullWidth
                        required
                        helperText={helperText.password2}
                        onChange={e => validateData(e, 'password2')}
                    />
                </InputBox>
                <InputBox>
                    <Inputs
                        id="name"
                        name="name"
                        label="이름"
                        variant="outlined"
                        autoComplete="name"
                        fullWidth
                        required
                        helperText={helperText.name}
                        onChange={e => onInputChange(e, validate, data, setData, setValidate)}
                    />
                </InputBox>
                <InputBox>
                    <Inputs
                        id="phoneNo"
                        name="phoneNo"
                        label="전화번호"
                        variant="outlined"
                        autoComplete="phoneNo"
                        fullWidth
                        required
                        helperText={helperText.phoneNo}
                        onKeyUp={autoHyphenPhone}
                    />
                </InputBox>
                <InputBox>
                    <Inputs
                        id="nickname"
                        name="nickname"
                        label="닉네임"
                        variant="outlined"
                        autoComplete="nickname"
                        fullWidth
                        required
                        helperText={helperText.nickname}
                        onInput={e => e.target.value = e.target.value.slice(0, 12)}
                        onChange={e => validateData(e, 'nickname')}
                    />
                </InputBox>
                <InputBox>
                    <Inputs
                        id="region"
                        name="region"
                        label="생활지역 (시, 군, 구단위)"
                        variant="outlined"
                        InputProps={{
                            readOnly: true,
                        }}
                        fullWidth
                        required
                        onClick={() => setOpenAddress(true)}
                        helperText={validate.region ? '' : helperText.region}
                    />
                    <PostModal
                        open={openAddress}
                        onClose={() => setOpenAddress(false)}
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                    >
                        <DaumPostcode onComplete={handleAddressComplete}/>
                    </PostModal>
                </InputBox>
                <InputBox>
                    <Inputs
                        id="snsUrl"
                        name="snsUrl"
                        label="개인 SNS주소"
                        variant="outlined"
                        autoComplete="sns"
                        fullWidth
                        required
                        helperText={helperText.snsUrl}
                        onInput={e => e.target.value = e.target.value.slice(0, 255)}
                        onChange={e => onInputChange(e, validate, data, setData, setValidate)}
                    />
                </InputBox>
                <InputBox>
                    <Inputs
                        id="recommender"
                        name="recommender"
                        label="추천인 이름"
                        variant="outlined"
                        fullWidth
                        required
                        helperText={helperText.recommender}
                    />
                </InputBox>
                <InputBox term>
                    <AgreeLabel
                        control={<AgreeCheckBox name="agree"/>}
                        label="회원가입 정책에 동의합니다."
                    />
                    <ShowTerm
                        onClick={() => setOpenTerm(true)}
                    >약관 보기</ShowTerm>
                    <Dialog
                        open={openTerm}
                        onClose={() => setOpenTerm(false)}
                        scroll="paper"
                    >
                        <DialogTitle id="scroll-dialog-title">
                            <DialogTitleBox>
                                회원가입약관
                                <DialogClose onClick={() => setOpenTerm(false)}/>
                            </DialogTitleBox>
                        </DialogTitle>
                        <DialogContent dividers={true}>
                            <Terms/>
                        </DialogContent>
                    </Dialog>
                </InputBox>
                <InputBox>
                    <Button type="button">회원가입</Button>
                </InputBox>
            </Form>
        </Wrap>
    )
}

export default SignUpPresentational;