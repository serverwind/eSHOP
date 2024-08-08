import {useState} from 'react'
import axios from 'axios'

const Book = ({book}) => {
  return (
    <>
      <ul className="flex gap-2 justify-center text-center py-4 rounded">
      <li>{book.name}</li>
      <li>{book.author}</li>
      <li className="font-bold">{book.price}$</li>
    </ul>
    <hr/>
    </>
  )
}

const Books = ({books}) => {
  if (books.length > 0) {
    return (
      <div className="flex flex-col items-center bg-blue-200 min-h-36 justify-center text-center py-4 rounded">
        {books.map((book) => (
          <Book key={book.id} book={book} />
        ))}
      </div>
    )
  } else {
    return <p>Cart is empty</p>
  }
}

const Modal = ({books, close, display}) => {
  let totalPrice = 0

  books.map((book) => {
    totalPrice += book.price
  })

    return (
    <div id="default-modal" className={`overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full ${display}`}>
    <div className="relative p-4 w-full max-w-2xl max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Your Cart</h3>
                <button onClick={close} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                </button>
            </div>
            <div className="p-4 md:p-5 space-y-4">
              <Books books={books} />
            </div>
            <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                <button data-modal-hide="default-modal" type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Buy ({totalPrice}$)</button>
            </div>
        </div>
    </div>
</div>
    )
}

const Cart = () => {

    const [cart, setCart] = useState('hidden');
    const [books, setBooks] = useState([]);

    function openCart() {
        setCart('block')
    axios.get("http://localhost:3001/cart")
      .then((response) => {
        setBooks(response.data);
    });
    }

    function closeCart() {
        setCart('hidden')
    }

    return (
        <>
          <button onClick={openCart}>Cart: (<span id="cart-count">0</span>)</button>
          <Modal books={books} close={closeCart} display={cart}/>
        </>
    )
}

export default Cart
