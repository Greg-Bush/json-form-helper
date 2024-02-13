import { Downloading } from '@mui/icons-material';
import CloudUpload from '@mui/icons-material/CloudUpload';
import Button from '@mui/material/Button';
import first from 'lodash.first';
import { useFilePicker } from 'use-file-picker';
import { SelectedFiles } from 'use-file-picker/dist/interfaces';


export default function UploadJsonFileButton(props: {
    onSelect: <T extends {}>(text: T) => void,
    hasSelected?: boolean,
    onError?: (error: unknown) => void,
    loading?: boolean
}) {
    const { openFilePicker, loading, plainFiles } = useFilePicker({
        accept: '.json',
        multiple: false,
        onFilesSuccessfullySelected: async (data: SelectedFiles<string>) => {
            try {
                const text = await first(data.plainFiles)?.text()
                if (text) {
                    props.onSelect(JSON.parse(text))
                } else {
                    throw new Error('no text')
                }
            } catch (e) {
                props.onError?.(e)
            }
        }
    })
    return (
        <Button disabled={loading} onClick={openFilePicker} component="label" variant="contained" endIcon={loading || props.loading ? <Downloading /> : <CloudUpload />}>
            {plainFiles.length || props.hasSelected ? "Change file" : "Upload file"}
        </Button>
    )
}