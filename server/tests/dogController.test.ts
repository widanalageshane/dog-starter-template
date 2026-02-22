import { describe, it, expect, vi, beforeEach } from "vitest";
import { getDogImage } from "../controllers/dogController";
import * as dogService from "../services/dogService";

describe("dogController - getDogImage", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("returns success true with service data (positive)", async () => {
    const mockedServiceData = {
      imageUrl: "https://images.dog.ceo/breeds/husky/n02110185_1469.jpg",
      status: "success",
    };

    vi.spyOn(dogService, "getRandomDogImage").mockResolvedValue(mockedServiceData as any);

    const req = {} as any;
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    } as any;

    await getDogImage(req, res);

    expect(res.json).toHaveBeenCalledWith({
      success: true,
      data: mockedServiceData,
    });
  });
});