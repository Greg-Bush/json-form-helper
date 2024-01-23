import { CircularProgress } from '@mui/material'
import { useMemo } from 'react'
import useData from '../../messaging/useData'
import Tree from './Tree'

export default function TreeSelect(props: {
    onLeafClick(text: string): void
}) {
    const { result: resume, loading } = useData('resume')

    const length = useMemo(() => {
        return resume ? Object.keys(resume).length : 0
    }, [resume])

    return (
        <>
            {loading && <CircularProgress />}
            <Tree
                data={resume || {}}
                length={length}
                parentName="JSON-resume"
                onLeafClick={props.onLeafClick}
            />
        </>
    )
}
