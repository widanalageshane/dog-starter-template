import { describe, it, expect, vi, beforeEach } from "vitest";
import { getRandomDogImage } from "../services/dogService";

describe("dogService - getRandomDogImage", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("returns imageUrl and success status when API succeeds (positive)", async () => {
    const mockedApiJson = {
      message: "https://images.dog.ceo/breeds/terrier-welsh/lucy.jpg",
      status: "success",
    };

    const fetchMock = vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => mockedApiJson,
      } as any);

    const result = await getRandomDogImage();

    expect(result.imageUrl).toBe(mockedApiJson.message);
    expect(result.status).toBe("success");
    expect(fetchMock).toHaveBeenCalledOnce();
  });

  it("rejects with correct error message when response is not ok (negative)", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: false,
      status: 500,
      json: async () => ({ message: "Server error" }),
    } as any);

    await expect(getRandomDogImage()).rejects.toThrow(
      "Failed to fetch dog image: Dog API returned status 500"
    );
  });
});