import React, { useState, useCallback } from 'react';
import styled from "styled-components";
import colors from "../../styles/colors";
import uploadImage from "/public/images/share/upload.svg";

const UploadBox = styled.label`
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  display: block;
  position: relative;
  background: url(${uploadImage}) center no-repeat ${colors.inputBorder};
`;
const FileInput = styled.input`
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
  position: absolute;
`;
const PreviewBox = styled.div`
  position: absolute;
  padding: 10px;
  width: 100%;
  height: 100%;
`;
const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const FileUpload = ({ width, height, fileUpload, handleFileUpload  }) => {
    return (
        <UploadBox
            htmlFor="file_upload"
            width={width}
            height={height}
        >
            <FileInput
                id="file_upload"
                type="file"
                accept='image/jpg,image/png,image/jpeg'
                onChange={handleFileUpload}
            />
            {fileUpload && (fileUpload.file || fileUpload.previewUrl) &&
                <PreviewBox>
                    <PreviewImage src={fileUpload.previewUrl} />
                </PreviewBox>
            }
        </UploadBox>
    )
}

export default React.memo(FileUpload);