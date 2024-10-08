import { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./Filter";

const Buy = ({ price, book }) => {
  const [status, setStatus] = useState(false);
  const [cartNum, setCartNum] = useState(0);

  const handleStatus = () => {
    if (status) {
      setStatus(false);
      axios.delete(`http://localhost:3001/cart/${book.id}`)
        .then(() => {
          updateCartCount();
        });
    } else {
      setStatus(true);
      axios.post('http://localhost:3001/cart', { ...book })
        .then(() => {
          updateCartCount();
        });
    }
  };

  const updateCartCount = () => {
    axios.get("http://localhost:3001/cart")
      .then((response) => {
        setCartNum(response.data.length);
      });
  };

  useEffect(() => {
    updateCartCount();
  }, [status]);

  useEffect(() => {
    document.getElementById("cart-count").innerHTML = cartNum;
  }, [cartNum]);


  if (status) {
    return (
      <button onClick={handleStatus} className="bg-blue-400 rounded">
        Remove from cart
      </button>
    );
  }
  return (
    <button onClick={handleStatus} className="bg-blue-400 rounded">
      Buy ({price}$)
    </button>
  );
};

const Book = ({ books }) => {
  return books.map((book) => (
    <div className="grid bg-blue-200 min-h-36 justify-center text-center py-4 rounded" key={book.id}>
      <div className="text-xl">{book.name}</div>
      <div className="font-bold">{book.author}</div>
      <Buy price={book.price} book={book} />
    </div>
  ));
};

const Shop = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/books")
      .then((response) => {
        setBooks(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the books!", error);
      });
  }, []);

  return (
    <main className="flex flex-col gap-4 m-4">
      <Filter />
      <section>
        <h2 className="text-4xl mb-4 font-bold">Offers</h2>
        <div className="flex flex-col sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Book books={books} />
        </div>
      </section>
    </main>
  );
};

export default Shop;
