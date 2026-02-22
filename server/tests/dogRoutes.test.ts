import { describe, it, expect, vi } from "vitest";
import request from "supertest";
import express from "express";

vi.mock("../controllers/dogController", () => ({
  getDogImage: vi.fn((_req: any, res: any) => {
    return res.status(200).json({
      success: true,
      data: { imageUrl: "https://mocked.dog/image.jpg", status: "success" },
    });
  }),
}));

import dogRoutes from "../routes/dogRoutes";

function createTestApp() {
  const app = express();
  app.use(express.json());
  app.use("/api/dogs", dogRoutes);
  return app;
}

describe("dogRoutes", () => {
  it("GET /api/dogs/random returns 200 + success true (positive)", async () => {
    const app = createTestApp();
    const res = await request(app).get("/api/dogs/random");

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.imageUrl).toContain("mocked.dog");
  });

  it("GET /api/dogs/random returns 500 + success false (negative)", async () => {
    const { getDogImage } = await import("../controllers/dogController");

    (getDogImage as any).mockImplementationOnce((_req: any, res: any) => {
      return res.status(500).json({
        success: false,
        error: "Failed to fetch dog image: Network error",
      });
    });

    const app = createTestApp();
    const res = await request(app).get("/api/dogs/random");

    expect(res.status).toBe(500);
    expect(res.body.success).toBe(false);
    expect(res.body.error).toMatch(/Failed to fetch dog image/i);
  });
});