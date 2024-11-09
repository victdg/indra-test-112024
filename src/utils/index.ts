export const constants = {
  FILMS_URL: "https://swapi.py4e.com/api/films/",
  TABLE_NAME: "Orders",
  ERRORS: {
    NOT_FOUND: "No se encontró",
    BAD_REQUEST_ERROR: "Parámetros inválidos",
    PROCESSING_ERROR: "Error de procesamiento",
    UNCONTROLLER_ERROR: "Error incontrolable",
    SERVICE_UNAVAILABLE: "Servicio no disponible",
  },
  CODES: <
    Record<
      number,
      { statusCode: number; code: string; message?: string; data?: any }
    >
  >{
    200: {
      statusCode: 200,
      code: "SUCCESS",
    },
    404: {
      statusCode: 404,
      code: "NOT FOUND",
      message: "No encontrado",
    },
    400: {
      statusCode: 400,
      code: "BAD REQUEST",
      message: "Parámetros invalidos",
    },
    422: {
      statusCode: 422,
      code: "PROCESSING ERROR",
      message: "Error de procesamiento",
    },
    503: {
      statusCode: 503,
      code: "SERVICE UNAVAILABLE",
      message: "Servicio no disponible",
    },
    500: {
      statusCode: 500,
      code: "UNCONTROLLER ERROR",
      message: "Error no controlado",
    },
  },
};

type CodeType = Record<
  number,
  { statusCode: number; code: string; message?: string; data?: any }
>;

const dictionary = [
  ["title", "titulo"],
  ["episode_id", "idEpisodio"],
  ["opening_crawl", "introduccion"],
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

export const responseObjectMaker = ({
  statusCode = constants.CODES[200].statusCode,
  code,
  message,
  data,
}: {
  statusCode?: number;
  code?: string;
  message?: string;
  data?: any;
}) => {
  return {
    statusCode,
    code: code ?? constants.CODES[statusCode].code,
    message: message ?? constants.CODES[statusCode].message,
    data: data,
  };
};

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
