import React, { useEffect } from 'react';
import useJitsi from './UseJitsi';

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
        <div style={{ ...{ width: '100%', height: '100%' }, ...containerStyles }}>
            {error && (errorComponent || <p>{error}</p>)}
            {!error && loading && (loadingComponent || <p>Loading ...</p>)}
            <div
                id='jitsi-container'
                style={{ ...{
                        display: loading ? 'none' : 'block',
                        width: '100%',
                        height: '100%'
                    },
                    ...jitsiContainerStyles }}
            />
        </div>
    );
}

export default JitsiModule;
