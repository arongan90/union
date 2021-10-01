import React from 'react';
import styled from "styled-components";
import { CustomPicker } from 'react-color';
import { EditableInput, Hue, Saturation } from "react-color/lib/components/common";
import colors from "../../styles/colors";

const Wrapper = styled.div`
  padding: 10px;
  border: 1px solid ${colors.corpMainBorder};
  background: ${colors.tabMenu};
  box-shadow: 0 0 10px ${colors.ultraLightGray};
`;
const SaturationBox = styled.div`
  height: 150px;
  margin-bottom : 10px;
  position: relative;
  border: px solid ${colors.lightGray};
`;
const HueBox = styled.div`
  height: 10px;
  position: relative;
  margin-bottom: 10px;
`;
const InputBox = styled.div`
  display: flex;
  align-items: center;
  
  input {
    height: 34px;
    border: 1px solid ${colors.loginTabBorder};
    padding-left: 10px;
    outline: none;
  }
`;
const SwatchBox = styled.div`
  width: 50px;
  height: 34px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${colors.whiteColor};
  cursor: pointer;
  background: ${({hex}) => hex};
`;

const CustomColorPalette = (props) => {
    const { hex, hsl, hsv, onChange, closePalette } = props;

    return (
        <Wrapper>
            <SaturationBox>
                <Saturation hsl={hsl} hsv={hsv} onChange={onChange} />
            </SaturationBox>
            <HueBox>
                <Hue hsl={hsl} onChange={onChange} />
            </HueBox>
            <InputBox>
                <EditableInput
                    value={hex}
                    onChange={onChange}
                />
                <SwatchBox onClick={closePalette} hex={hex}>선택</SwatchBox>
            </InputBox>
        </Wrapper>
    )
}

export default CustomPicker(React.memo(CustomColorPalette));