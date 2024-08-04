import ReactDOM from 'react-dom/client'
import './output.css'
import Header from './components/Header'
import Shop from './components/Shop'
import Whishlist from './components/Whishlist'

ReactDOM.createRoot(document.getElementById('root')).render(
    <>
    <Header />
    <Shop />
    <Whishlist />
    </>
)
