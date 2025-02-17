import { JSONSerializerService } from "../app/common/json-serializer.service";
import { Crop } from "../app/crop/crop";
import { TestUtils } from "./TestUtils";

describe("JSONSerializer service tests", () => {
  const utils: TestUtils = new TestUtils();
  const service = new JSONSerializerService();

  it("dump crops", () => {
    const crop = utils.createCrop(3, true, false);
    const json = service.dump(crop);
    expect(crop.sowingDate.day).toBeGreaterThan(0);
    expect(json["sowingDate"]["day"]).toBe(crop.sowingDate.day);
  });

  it("load crops", () => {
    const sowingDay = 23;
    const json = {
      "id": 2,
      "name": "crop2",
      "type": "crop",
      "isSowing": true,
      "sowingDate": { "month": 3, "day": sowingDay }
    };
    const crop = service.load(json) as Crop;
    expect(crop.sowingDate.day).toBe(sowingDay);
  });
});