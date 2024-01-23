import { CircularProgress } from '@mui/material';
import useData from '../messaging/useData';
import UploadJsonFileButtonContainer from './UploadJsonFileButtonContainer';

export default function App() {
  const { loading } = useData('rehydrated')
  if (loading) {
    return <CircularProgress />
  }
  return (
    <UploadJsonFileButtonContainer />
  );
}