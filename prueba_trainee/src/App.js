import { useState, useEffect } from "react";

const Api = () => {
  const [datos, setDatos] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    capturarDatosApi();
  }, []);

  const capturarDatosApi = async () => {
    const data = await fetch(
      "https://dragon-ball-super-api.herokuapp.com/api/characters"
    );
    const int = await data.json();
    setDatos(
      int.sort((a, b) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      })
    );
  };

  const buscador = (e) => {
    setSearch(e.target.value);
  };
  let results = [];
  if (!search) {
    results = datos;
  } else {
    results = datos.filter((arreglo1) =>
      arreglo1.name.toUpperCase().includes(search.toUpperCase())
    );
  }
  return (
    <div>
      <div className="mt-5 mx-5  flex justify-center  ">
        <div>
          <div className="container">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/2/22/Dragon_Ball_Super.png"
              alt=""
              width="300px"
            />
          </div>
          <div className="input-group relative flex items-stretch w-full mb-2 mt-5 mx-1 rounded">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="search"
              className="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              placeholder="Buscar por nombre"
              aria-label="Search"
              aria-describedby="button-addon2"
            />
          </div>
        </div>
      </div>

      <h1 className="font-serif underline text-5xl text-center text-yellow-400 mb-5 mt-3">
        <strong> Prueba del Dragón</strong>
      </h1>

      <div className="flex flex-wrap border ml-5 mr-5 ">
        {results.map((item) => (
          <div
            key={item.id}
            className=" w-1/2 sm:w-1/3 md:w-1/5 items-center px-2 flex flex-col justify-center"
          >
            <img
              className="mt-5 w-52 h-80 shadow-xl"
              src={item.imageUrl}
              alt="img"
              width="50px"
            />
            <h5 className="mb-1 text-xl text-center font-serif text-yellow-100 dark:text-black">
              {item.name}
            </h5>

            <h5 className="mb-1 text-xl text-center font-serif text-yellow-100 dark:text-black">
              Universo {item.universe}
            </h5>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Api;
