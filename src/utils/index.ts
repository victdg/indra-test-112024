export const constants = {
  FILMS_URL: "https://swapi.py4e.com/api/films/",
  TABLE_NAME: "Orders",
  CODES: {
    200: {
      statusCode: 200,
      code: "SUCCESS",
    },
    404: {
      statusCode: 404,
      code: "NOT FOUND",
    },
    400: {
      statusCode: 400,
      code: "BAD REQUEST",
      message: "parámetros invalidos",
    },
    422: {
      statusCode: 422,
      code: "PROCESSING ERROR",
      message: "Error de procesamiento",
    },
    503: {
      statusCode: 503,
      code: "SERVICE UNAVAILABLE",
    },
    500: {
      statusCode: 500,
      code: "UNCONTROLLER ERROR",
      message: "Error no controlado",
    },
  },
};

type CodeType = {
  statusCode: number;
  code: string;
};

const dictionary = [
  ["title", "titulo"],
  ["episode_id", "idEpisodio"],
  ["openning_crawl", "introduccion"],
  ["director", "director"],
  ["producer", "productor"],
  ["release_date", "fechaPublicacion"],
  ["characteres", "personajes"],
  ["planets", "planetas"],
  ["starships", "naves"],
  ["vehicles", "vehiculos"],
  ["species", "especies"],
  ["created", "creado"],
  ["edited", "editado"],
  ["url", "url"],
];

const dictionaryObject = (() => {
  const mapperObject: Record<string, string> = {};
  dictionary.forEach((pair) => {
    mapperObject[pair[0]] = pair[1];
    mapperObject[pair[1]] = pair[0];
  });

  return mapperObject;
})();

export const mapper = (inputdataObject: Record<string, any>) => {
  const returnedObject: Record<string, any> = {};
  Object.entries(inputdataObject).forEach((dataPair) => {
    let key = dictionaryObject[dataPair[0]];
    if (key === undefined) {
      console.log(`Key: <${dataPair[0]}> not found in dictionary`);
      key = dataPair[0];
      // throw new Error(`Key: <${dataPair[0]}> not found in dictionary`)
    }
    returnedObject[key] = dataPair[1];
  });
  return returnedObject;
};
