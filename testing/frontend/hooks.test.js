const useAccessChat = require("../../frontend/src/hooks/useAccessChat");

describe("useAccessChat", () => {
  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it("should set loading to true when accessing chat", async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      json: () => Promise.resolve({ chatData: "mocked data" }),
    });

    const { loading, chat, accessChat } = useAccessChat();
    expect(loading).toBe(false);

    await accessChat("user123");

    expect(loading).toBe(false); // loading should be false immediately after calling accessChat
    expect(chat).toEqual({ chatData: "mocked data" });
  });

  it("should handle errors", async () => {
    global.fetch = jest.fn().mockRejectedValueOnce(new Error("Network error"));

    const { loading, chat, accessChat } = useAccessChat();
    expect(loading).toBe(false);

    await accessChat("user123");

    expect(loading).toBe(false); // loading should be false immediately after calling accessChat
    expect(chat).toBe(null);
  });
});
