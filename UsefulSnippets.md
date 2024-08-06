## первоначально грузим данные из базы данных и выводим их. После этого, если пользователь добавил что то в свой вишлист и это сохранилось в бд - сразу без обновления страницы выводим это во фронтенд

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

    if (value != "") {
      let whish = {
        book: document.getElementById("book").value,
        id: Math.floor(Math.random() * 1000),
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
        }).catch((error) => {
          console.error("There was an error fetching the books!", error);
        });


      value = "";
    }
  }
