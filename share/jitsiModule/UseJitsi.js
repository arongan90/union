import { useState, useEffect } from 'react'

const useJitsi = ({
                      domain = 'https://meet.healingt.catbell.xyz/conference',
                      parentNode,
                      subject,
                      password,
                      displayName,
                      onMeetingEnd,
                      ...options
                  }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [jitsi, setJitsi] = useState(null);

    useEffect(() => {
        // const window = require('window');
        if (!window.JitsiMeetExternalAPI) {
            setError('JitsiMeetExternalAPI is not available, check if https://meet.jit.si/external_api.js was loaded');
            return;
        }

        options.parentNode = document.getElementById(parentNode);

        if (!parentNode) {
            setError(`Parent node is not available, check container have the correct id: "${parentNode}"`)
            return;
        }

        const client = new window.JitsiMeetExternalAPI(domain, {...options});

        setJitsi(client);
        setLoading(false);
        setError(null);

        subject && client.executeCommand('subject', subject);

        client.addEventListener('videoConferenceJoined', () => {
            password && client.executeCommand('password', password);
            displayName && client.executeCommand('displayName', displayName);
        });

        client.addEventListener('passwordRequired', () => {
            password && client.executeCommand('password', password);
        });

        onMeetingEnd && client.addEventListener('readyToClose', onMeetingEnd);

        console.info('loading : ', loading, '\nerror : ', error, '\njitsi : ', jitsi);

        return () => jitsi && jitsi.dispose();
    }, [window.JitsiMeetExternalAPI]);

    return { jitsi, error, loading }
}

export default useJitsi;
