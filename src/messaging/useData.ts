import { GetDataType, GetReturnType } from '@webext-core/messaging';
import { useCallback, useEffect, useState } from 'react';
import { Requests, sendMessage } from '.';

export default function useData<T extends keyof Requests>(type: T) {
    const [result, setResult] = useState<GetReturnType<Requests[T]>>();
    const [error, setError] = useState<unknown>();
    const [loading, setLoading] = useState(false);

    const send = useCallback(async function fetch(data: GetDataType<Requests[T]>) {
        setLoading(true);
        try {
            setResult(await sendMessage(type, data));
        }
        catch (e) {
            setError(e);
        }
        finally {
            setLoading(false);
        }
    }, [type]);

    const refetch = useCallback(() => {
        // @ts-ignore
        send(null)
    }, [send])

    useEffect(refetch, [refetch])

    return { send, result, loading, error };
}
