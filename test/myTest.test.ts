import { expect } from "chai";
import sinon from "sinon";

describe("Mi primera prueba", () => {
  it("new test", async () => {
    const obj1 = { execute: (x) => x + 1 };
    const stub = sinon.stub(obj1, "execute");
    stub.returns(99);
    expect(obj1.execute(5)).equal(99);
  });
});
