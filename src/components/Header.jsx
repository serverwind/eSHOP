import Cart from "./Cart"
import data from "../db/products.json"

const SignUp = () => {
    return (
        <a href="#">Sign up</a>
    )
}

const ShopDesc = ({books}) => {
    return (
        <>
            <h1 className="text-6xl">eSHOP</h1>
            <p className="italic text-sm">More than <span>{books}</span> best books here!</p>
        </>
    )
}

const Header = () => {
    const BOOKS = Object.keys(data).length;

    return (
        <header className='h-screen bg-blue-400'>
            <Cart />
            <SignUp />
            <ShopDesc books={BOOKS} />
        </header>
    )
}

export default Header