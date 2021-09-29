import React, {useEffect} from 'react';
import useJitsi from './UseJitsi';
import styled from "styled-components";

const JitsiWrapper = styled.div`
  width: 100%;
  height: 100%;
`;
const JitsiContainer = styled.div`
  width: 100%;
  height: 100%;
  
  display: ${({ loading }) => loading ? loading : 'block'};

  @media screen and (max-width: 767px) {
    
  }
`;

const JitsiModule = ({
                         loadingComponent,
                         errorComponent,
                         containerStyles,
                         jitsiContainerStyles,
                         onError,
                         onJitsi,
                         ...options
                     }) => {
    const {loading, error, jitsi} = useJitsi({
        parentNode: 'jitsi-container',
        ...options
    });

    useEffect(() => {
        if (jitsi && onJitsi) onJitsi(jitsi)
    }, [jitsi])

    useEffect(() => {
        if (error && onError) onError(error)
    }, [error])

    return (
        <JitsiWrapper style={{...containerStyles}}>
            {error && (errorComponent || <p>{error}</p>)}
            {!error && loading && (loadingComponent || <p>Loading ...</p>)}
            <JitsiContainer
                id='jitsi-container'
                loading={loading ? 'none' : null}
                style={{...jitsiContainerStyles}}
            />
        </JitsiWrapper>
    );
}

export default JitsiModule;
