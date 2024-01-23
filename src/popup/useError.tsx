import { useEffect } from "react";
import useMessage from "../messaging/useData";

export default function useError(e: unknown) {
    const { send } = useMessage('error')
    useEffect(() => {
        if (e) {
            console.error(e)
            send(e)
        }
    }, [e, send])
}