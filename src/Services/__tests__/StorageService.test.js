import StorageService from "../StorageService";

describe("StorageService", () => { 
    let storageService;

    beforeEach(() => {
        storageService = new StorageService();
    });

    afterEach(() => {
        storageService.clear();
    });

    it("should set item to local storage", () => {
        storageService.set("test", "test");
        expect(storageService.get("test")).toEqual("test");
    });

    it("should not set item to local storage if it already exists", () => {
        storageService.set("test", "test");
        storageService.set("test", "test");
        expect(storageService.get("test")).toEqual("test");
        const count = Object.keys(storageService.__STORE__).length;
        expect(count).toEqual(1);
    });

    it("should get item from local storage", () => {
        storageService.set("test", "test");
        expect(storageService.get("test")).toEqual("test");
    });

    it('gets json items from local storage', () => {
        const testObject = { test: "test" };
        storageService.set("test", JSON.stringify(testObject));
        expect(storageService.get("test")).toEqual(testObject);
    });

    it("should remove item from local storage", () => {
        storageService.set("test", "test");
        storageService.remove("test");
        expect(storageService.get("test")).toEqual(null);
    });

    it("should remove item from JSON list in local storage", () => {
        const testObject = [{ test: "test" }, { test2: "test2" }];
        storageService.set("testData", JSON.stringify(testObject));
        storageService.remove("testData", 0);
        expect(storageService.get("testData")).toEqual([testObject[1]]);
    });

    it("should clear local storage", () => {
        storageService.set("test", "test");
        storageService.clear();
        expect(storageService.get("test")).toEqual(null);
    });
});