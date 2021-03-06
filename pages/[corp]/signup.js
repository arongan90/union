import React, { useState } from 'react';
import SignUpPresentational from "../../components/signUp/SignUpPresentational";
import { chkValidPassword, isEmail, levenshteinenator } from "../../utils/common";

const Signup = ({ corpInfo }) => {
    const [submitted, setSubmitted] = useState(false);
    const [signUpSuccess, setSignUpSuccess] = useState(false);
    const [openTerm, setOpenTerm] = useState(false);
    const [openAddress, setOpenAddress] = useState(false);
    const emailDomains = ['yahoo.com','google.com','hotmail.com', 'naver.com', 'gmail.com', 'hanmail.net', 'daum.net'];
    const [validate, setValidate] = useState({
        stdtNo: false,
        name: false,
        nickname: false,
        email: false,
        phoneNo: false,
        password: false,
        password2: false,
        snsUrl: false,
        region: false,
        recommender: false,
    });
    const [data, setData] = useState(
        {
            name: '',
            phoneNo: '',
            nickname: '',
            email: '',
            password: '',
            password2: '',
            agreed: false,
            region: '',
            snsUrl: '',
            recommender: '',
            cpId:''
        }
    );
    const [helperText, setHelperText] = useState({
        nickname: '변경하실 수 없으니 신중하게 입력해주세요.',
        email: '이메일을 입력해주세요.',
        name: '실명을 입력해주세요.',
        phoneNo: '전화번호를 입력해주세요. (하이픈은 자동 입력됩니다)',
        password: '영문 + 숫자 8자리 이상',
        password2: '비밀번호를 다시 한번 입력해주세요.',
        snsUrl: '홈페이지, 블로그, 페이스북 등 개인 SNS주소',
        recommender: '추천인의 이름을 입력해주세요.',
        region: '생활지역을 입력해주세요.',
    });

    const autoHyphenPhone = (e) => {
        let value = e.target.value;
        if (value.length > 13) value = value.slice(0, 13);

        value = value.replace(/[^0-9]/g, "").replace(/(^02|^0505|^1[0-9]{3}|^0[0-9]{2})([0-9]+)?([0-9]{4})$/, "$1-$2-$3").replace("--", "-");

        console.info(value);

        let tmp = {...data};
        tmp.phoneNo = value;
        setData(tmp);

        console.info(tmp);

        validateData(e, 'phoneNo');
    };

    const handleAddressComplete = (addrData) => {
        let tmpData = {...data, cpId: corpInfo.id};
        let tmpValid = {...validate};
        tmpData.region = `${addrData.sido} ${addrData.sigungu}`;
        tmpValid.region = true;

        console.info(tmpData);

        setData({...data, tmpData});
        setValidate(tmpValid);
        // setOpenAddress(false);
    };

    const validateData = (e, type) => {
        let value = e.target.value;
        const pattern = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9]+$/;
        // let url = `${serverProtocol}${serverURL}/member/dupcheck`;
        let url = '';
        let checkLength = 0;


        switch (type) {
            case 'phoneNo':
                url += '/phoneNo/';
                checkLength = 11;
                break;
            case 'nickname':
                url += '/nickname/';
                break;
            case 'email':
                url += '/email/';
                checkLength = 3;
                break;
            case 'recommender':
                url += '/recommender/';
                checkLength = 0;
                break;
        }

        url += value.trim();

        let oldState = {...validate};
        let helperTexts = {...helperText};

        if (value.length > checkLength) {
            if (type === 'password') {
                let tmp = {...data};
                let check = chkValidPassword(value);

                if (check.ok) {
                    tmp.password = value;
                    oldState.password = true;
                    helperTexts.password = check.msg;
                } else {
                    oldState.password = false;
                    helperTexts.password = check.msg;
                }
                setData(tmp);
                setHelperText(helperTexts);
                setValidate(oldState);
            } else if (type === 'password2') {
                let tmp = {...data};

                if (tmp.password === value) {
                    oldState.password2 = true;
                    helperTexts.password2 = '비밀번호가 일치합니다.';
                    tmp.password2 = value;
                } else {
                    oldState.password2 = false;
                    helperTexts.password2 = '비밀번호가 일치하지 않습니다.';
                }
                setData(tmp);
                setHelperText(helperTexts);
                setValidate(oldState);
            } else if (type === 'snsUrl') {
                let tmp = {...data};

                if (value.length > 1) {
                    oldState.snsUrl = true;
                    helperTexts.snsUrl = '홈페이지, 블로그, 페이스북 등 개인 SNS주소';
                    tmp.snsUrl = value;
                } else {
                    oldState.snsUrl = false;
                    helperTexts.snsUrl = '홈페이지, 블로그, 페이스북 등 개인 SNS주소';
                }
                setData(tmp);
                setHelperText(helperTexts);
                setValidate(oldState);
            }
            // else if (type === 'snsUrl') {
            //     let tmp = {...data};
            //
            //     if (tmp.password === value) {
            //         oldState.password2 = true;
            //         helperTexts.password2 = '비밀번호가 일치합니다.';
            //         tmp.password2 = value;
            //     } else {
            //         oldState.password2 = false;
            //         helperTexts.password2 = '비밀번호가 일치하지 않습니다.';
            //     }
            //     setData(tmp);
            //     setHelperText(helperTexts);
            //     setValidate(oldState);
            // } else if (type === 'password2') {
            //     let tmp = {...data};
            //
            //     if (tmp.password === value) {
            //         oldState.password2 = true;
            //         helperTexts.password2 = '비밀번호가 일치합니다.';
            //         tmp.password2 = value;
            //     } else {
            //         oldState.password2 = false;
            //         helperTexts.password2 = '비밀번호가 일치하지 않습니다.';
            //     }
            //     setData(tmp);
            //     setHelperText(helperTexts);
            //     setValidate(oldState);
            // }
            else {
                // SendRequest.get(url).then(res => {
                    let res = { data: { dup: false}};
                    if (res.data.dup === false) {
                        let tmp = {...data};
                        switch (type) {
                            case 'phoneNo':
                                oldState.phoneNo = true;
                                tmp.phoneNo = value;
                                helperTexts.phoneNo = '가입 가능한 번호입니다.';
                                break;
                            case 'nickname':
                                if (!pattern.test(value)) {
                                    oldState.nickname = false;
                                    helperTexts.nickname = '한글, 영문, 숫자만 입력해주세요.';
                                } else {
                                    oldState.nickname = true;
                                    tmp.nickname = value;
                                    helperTexts.nickname = '가입 가능한 닉네임입니다.';
                                }
                                break;
                            case 'email':
                                oldState.email = true;
                                tmp.email = value.trim();
                                helperTexts.email = '가입 가능한 이메일입니다.';

                                if (!isEmail(value.trim())) {
                                    oldState.email = false;
                                    helperTexts.email = '올바른 이메일이 아닙니다.';
                                } else {
                                    let parts = tmp.email.split('@');

                                    for (let x = 0; x < emailDomains.length; x++) {
                                        let dist = levenshteinenator(emailDomains[x], parts[1]);
                                        if (dist === 1 || dist === 2) {
                                            helperTexts.email = `혹시 ${emailDomains[x]}이 아닌가요?`;
                                        }
                                    }
                                }

                                break;
                            case 'recommender':
                                oldState.recommender = false;
                                helperTexts.recommender = '없는 사용자입니다.';
                                break;
                        }

                        setData(tmp);
                    } else {
                        switch (type) {
                            case 'stdtNo':
                                oldState.stdtNo = false;
                                helperTexts.stdtNo = '이미 가입된 ID입니다.';
                                break;
                            case 'phoneNo':
                                oldState.phoneNo = false;
                                helperTexts.phoneNo = '이미 가입된 번호입니다.';
                                break;
                            case 'nickname':
                                oldState.nickname = false;
                                helperTexts.nickname = '이미 가입된 닉네임입니다.';
                                break;
                            case 'email':
                                oldState.email = false;
                                helperTexts.email = '이미 가입된 이메일입니다.';
                                break;
                            case 'recommender':
                                let tmp = {...data};
                                tmp.recommender = value;
                                setData(tmp);

                                oldState.recommender = true;
                                helperTexts.recommender = '올바른 추천인입니다.';
                                break;
                        }
                    }
                    setHelperText(helperTexts);
                    setValidate(oldState);
                // });
            }
        } else {
            switch (type) {
                case 'stdtNo':
                    oldState.stdtNo = false;
                    helperTexts.stdtNo = `${checkLength + 1}자 이상 입력해주세요.`;
                    break;
                case 'phoneNo':
                    oldState.phoneNo = false;
                    helperTexts.phoneNo = `${checkLength + 1}자 이상 입력해주세요.`;
                    break;
                case 'nickname':
                    oldState.nickname = false;
                    helperTexts.nickname = `${checkLength + 1}자 이상 입력해주세요.`;
                    break;
                case 'email':
                    oldState.email = false;
                    helperTexts.email = `${checkLength + 1}자 이상 입력해주세요.`;
                    break;
            }
            setHelperText(helperTexts);
            setValidate(oldState);
        }
    }

    const onSubmit = () => {
        if (!submitted) {
            if (!validate.email)
                alert("이메일을 확인하세요.");
            else if (!validate.password)
                alert("비밀번호를 확인하세요.");
            else if (!validate.password2)
                alert("비밀번호 확인이 일치하지 않습니다.");
            else if (!validate.name)
                alert("이름을 확인하세요.");
            else if (!validate.nickname)
                alert("닉네입을 확인하세요.");
            else if (!validate.phoneNo)
                alert("전화번호를 확인하세요.");
            else if (!validate.region)
                alert("생활지역을 확인하세요.");
            else if (!validate.snsUrl)
                alert("SNS주소를 확인하세요.");
            else if (!validate.recommender)
                alert("추천인을 확인하세요.");
            else if (data.agreed === false)
                alert("약관에 동의해주세요.");
            else {
                setSubmitted(true);

                let parameter = {
                    ...data, certification : corpInfo.certification
                }

                console.info('최종 파람:', parameter);

                // bsApi.post(`${serverProtocol}${serverURL}/member/signup`, parameter, {}).then(res => {
                //     setSubmitted(false);
                //     if (res.data.success) {
                //         setSignupSuccess(true);
                //     } else {
                //         alert(res.data.error);
                //     }
                // });
            }
        }
    };

    return (
        <SignUpPresentational
            submitted={submitted}
            setSubmitted={setSubmitted}
            signUpSuccess={signUpSuccess}
            setSignUpSuccess={setSignUpSuccess}
            validate={validate}
            setValidate={setValidate}
            helperText={helperText}
            setHelperText={setHelperText}
            data={data}
            setData={setData}
            emailDomains={emailDomains}
            autoHyphenPhone={autoHyphenPhone}
            validateData={validateData}
            openAddress={openAddress}
            setOpenAddress={setOpenAddress}
            handleAddressComplete={handleAddressComplete}
            openTerm={openTerm}
            setOpenTerm={setOpenTerm}
            onSubmit={onSubmit}
        />
    )
}

export default Signup;