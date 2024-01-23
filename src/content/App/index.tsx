import useData from '../../messaging/useData'
import Container from './Container'

export default function App() {
    const { result } = useData('rehydrated')
    if (!result) {
        return null
    }
    return <Container />
}
