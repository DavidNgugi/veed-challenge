import StorageService from "./StorageService";

describe("StorageService", () => {        

    afterEach(() => {
        StorageService.clear();
    });

    it("should set item to local storage", () => {
        const storageService = new StorageService();
        storageService.set("test", "test");
        expect(storageService.get("test")).toEqual("test");
    });

    it("should not set item to local storage if it already exists", () => {
        const storageService = new StorageService();
        storageService.set("test", "test");
        storageService.set("test", "test");
        expect(storageService.get("test")).toEqual("test");
        const count = Object.keys(storageService.__STORE__).length;
        expect(count).toEqual(1);
    });

    it("should get item from local storage", () => {
        const storageService = new StorageService();
        storageService.set("test", "test");
        expect(storageService.get("test")).toEqual("test");
    });

    it('gets json items from local storage', () => {
        const storageService = new StorageService();
        const testObject = { test: "test" };
        storageService.set("test", JSON.stringify(testObject));
        expect(storageService.get("test")).toEqual(testObject);
    });

    it("should remove item from local storage", () => {
        const storageService = new StorageService();
        storageService.set("test", "test");
        storageService.remove("test");
        expect(storageService.get("test")).toEqual(null);
    });

    it("should clear local storage", () => {
        const storageService = new StorageService();
        storageService.set("test", "test");
        storageService.clear();
        expect(storageService.get("test")).toEqual(null);
    });
});