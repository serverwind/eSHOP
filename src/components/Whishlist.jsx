import { useState, useEffect } from "react";
import axios from "axios";

const Order = ({ whish, handleRemove, handleUpdate }) => {
  const [button, setButton] = useState('block')
  const [input, setInput] = useState('hidden')

  function handleButtons() {
    setButton('hidden')
    setInput('block')
  }

  function handleSave(id) {
    let value = document.getElementById('new-book').value
    axios.put(`http://localhost:3001/whishlist/${id}`, {
      book: value
    })
    .then((response) => {
      handleUpdate(response.data);
      setInput('hidden');
      setButton('block');
    })
    .catch((error) => {
      console.error("There was an error updating the wish!", error);
    });
  }

  return(
    <>
      <div className="text-xl font-bold mb-2"> {whish.book} </div>
      <div className={ `mb-2 flex gap-2 ${ input }` }>
        <input id="new-book" type="text" />
        <button onClick={() => handleSave(whish.id)} className="bg-blue-300 rounded py-2 px-4 text-sm">Save</button>
    </div>
        <div className={ `flex gap-2 ${ button }` }>
        <button onClick={handleButtons} className="bg-blue-300 rounded p-2 text-sm">Edit</button>
        <button onClick={handleRemove} className="bg-blue-400 rounded p-2 text-sm"> Remove </button>
    </div>
    </>
  )
}


const Orders = ({ whishes, handleRemove, handleUpdate }) => {
  return whishes.map((whish) => (
    <div className="grid bg-blue-200 min-h-36 justify-center content-center text-center py-4 rounded" key={whish.id}>
      <Order whish={whish} handleRemove={handleRemove} handleUpdate={handleUpdate} />
    </div>
  ));
};

const Form = () => {
  const [order, setOrder] = useState([]);
  const [whishes, setWhish] = useState([]);

  // первоначальная загрузка данных
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

  // прием и сохранение запроса в бд + моментальный вывод новых данных (юзер сделал новый заказ - он виден во фронтенде без перезагрузки)
  function handleOrder() {
    let value = document.getElementById("book").value;
    let id = Math.floor(Math.random() * 1000);

    if (value != "") {
      let whish = {
        book: document.getElementById("book").value,
        id: id.toString(),
      };

      axios
        .post("http://localhost:3001/whishlist", whish)
        .then((response) => {
          setOrder([...order, whish]);
          order.push(response.data);
          return axios.get("http://localhost:3001/whishlist");
        })
        .then((response) => {
          setWhish(response.data);
        })
        .catch((error) => {
          console.error("There was an error fetching the books!", error);
        });

      value = "";
    }
  }

  // удаление из бд

  function handleRemove(id) {
    axios
      .delete(`http://localhost:3001/whishlist/${id}`)
      .then(() => {
        setWhish(whishes.filter((whish) => whish.id !== id));
      })
      .catch((error) => {
        console.error("There was an error fetching the books!", error);
      });
  }

// обновление данных после изменения в бд (Order)

const handleUpdate = (updatedWhish) => {
    setWhish(
      whishes.map((whish) => (whish.id === updatedWhish.id ? updatedWhish : whish))
    );
};

  return (
    <div className="flex flex-col gap-4">
      <textarea id="book" className="border border-blue-400 min-h-16 rounded" type="text" />
      <button className="bg-blue-300 rounded p-2 font-bold" onClick={handleOrder}>
        Order
      </button>
      <div className="flex flex-col gap-4">
        <h3 className="text-3xl mt-8 font-bold">Orders</h3>
        <Orders whishes={whishes} handleRemove={handleRemove} handleUpdate={handleUpdate} />
        <p>Your books will be added to store as soon as possible!</p>
      </div>
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
