import axios from "axios";
import { SwapiServices } from "../../../../src/infrastructure/driven/services/SwapiServices";

import assert from "assert";
import sinon from "sinon";

describe("swapiServices test", () => {
  let axiosStub: any;

  it("Axios throws error, swapiServices return 503", async () => {
    axiosStub = sinon.stub(axios, "get").rejects({ response: { status: 503 } });
    const swapiRepository = new SwapiServices();
    const repositoryResponse = await swapiRepository.getFilm("id");
    assert.equal(repositoryResponse.statusCode, 503);
    axiosStub.restore();
  });

  it("Axios returns 200, swapiServices return 200", async () => {
    axiosStub = sinon.stub(axios, "get").resolves({ data: {} });
    const swapiRepository = new SwapiServices();
    const repositoryResponse = await swapiRepository.getFilm("id");
    assert.equal(repositoryResponse.statusCode, 200);
    axiosStub.restore();
  });
});
