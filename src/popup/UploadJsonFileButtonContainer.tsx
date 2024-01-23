import { useState } from 'react';
import useRequest from '../messaging/useData';
import UploadJsonFileButton from './UploadFIleButton';
import useError from './useError';


export default function UploadJsonFileButtonContainer() {
    const { send, result, loading, error } = useRequest('resume')

    const [componentError, setError] = useState<unknown>()

    useError(componentError)
    useError(error)

    return (
        <UploadJsonFileButton
            hasSelected={Boolean(result)}
            onSelect={send}
            onError={setError}
            loading={loading} />
    );
}
