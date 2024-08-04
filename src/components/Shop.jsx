import { useState } from "react"
import Filter from "./Filter"
import data from "../db/products.json"

const Buy = ({ price }) => {
    const [status, setStatus] = useState(false);

    function handleStatus() {
        (status) ? setStatus(false) : setStatus(true)
    }

    if (status) {
        return <button onClick={handleStatus} className="bg-blue-400 rounded">Added to cart</button>;
    }
    return <button onClick={handleStatus} className="bg-blue-400 rounded">Buy ({price}$)</button>;
};

const Book = () => {

    return(
        data.map(book => 
        
        <div className="grid bg-blue-200 min-h-36 justify-center text-center py-4 rounded" key={book.id}>
            <div className="text-xl">{book.name}</div>
            <div className="font-bold">{book.author}</div>
            <Buy price={book.price} />
         </div>
        
        )
    )
}

const Shop = () => {

    return (
      <main className="flex flex-col gap-4 m-4">
            <Filter />
            <section>
                <h2 className="text-4xl mb-4 font-bold">Offers</h2>
              <div className="flex flex-col sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Book />
                </div>
            </section>
        </main>
    )
}

export default Shop
