import { useState} from 'react';
import Cart from "./Cart"
import data from "../db/products.json"

const SignUp = () => {

    const [login, setLogin] = useState(0);

    function handleLogin() {
        setLogin(1)
    }

    function handleExit() {
        setLogin(0)
    }

    if (login === 0) {
        return <button onClick={handleLogin}>Sign Up</button>
    }
    return <button onClick={handleExit}>Hello User!</button>
}

const ShopDesc = ({books}) => {
    return (
        <div className="self-center text-center">
            <h1 className="text-6xl font-bold mb-4">eSHOP</h1>
            <p className="italic text-sm">More than <span className="font-bold">{books}</span> best books here!</p>
        </div>
    )
}

const Header = () => {
    const BOOKS = Object.keys(data).length;

    return (
        <header className='h-screen bg-blue-400 grid grid-rows-[auto,_1fr] p-4'>
            <div className="justify-self-end">
                <Cart />
                <SignUp />
            </div>
            <ShopDesc books={BOOKS} />
        </header>
    )
}

export default Header