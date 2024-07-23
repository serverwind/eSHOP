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
            <h1>eSHOP</h1>
            <p>More than <span>{books}</span> best books here!</p>
        </>
    )
}

const Header = () => {
    const BOOKS = Object.keys(data).length;

    return (
        <header>
            <Cart />
            <SignUp />
            <ShopDesc books={BOOKS} />
        </header>
    )
}

export default Header