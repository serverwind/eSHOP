import { useState, useEffect } from "react";
import axios from "axios";

const Orders = () => {
  const [whishes, setWhish] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/whishlist")
      .then((response) => {
        setWhish(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the books!", error);
      });
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-3xl mt-8 font-bold">Orders</h3>
      {whishes.map((whish) => (
        <div className="grid bg-blue-200 min-h-36 justify-center content-center py-4 rounded font-bold text-xl" key={whish.id}>
          {whish.book}
        </div>
      ))}
      <p>Your books will be added to store as soon as possible!</p>
    </div>
  );
};

const Form = () => {
  const [order, setOrder] = useState([]);

  function handleOrder() {
    let value = document.getElementById("book").value;

    if (value != "") {
      let whish = {
        book: document.getElementById("book").value,
        id: Object.keys(order).length + 1,
      };

      axios
        .post("http://localhost:3001/whishlist", whish)
        .then((response) => {
          setOrder([...order, whish]);
          order.push(response.data);
        })
        .catch((error) => {
          console.error("There was an error fetching the books!", error);
        });

      value = "";
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <textarea id="book" className="border border-blue-400 min-h-16 rounded" type="text" />
      <button className="bg-blue-300 rounded p-2 font-bold" onClick={handleOrder}>
        Order
      </button>
      <Orders />
    </div>
  );
};

const Whishlist = () => {

  return (
    <section className="bg-blue-400 py-8">
      <div className="flex flex-col gap-4 m-4 sm:max-w-2xl sm:mx-auto">
        <h2 className="text-4xl mb-2 font-bold">Whishlist</h2>
        <p>You can order a book, which are not currently in store.</p>
        <Form />
      </div>
    </section>
  );
};

export default Whishlist;
