import * as StorageService from "../StorageService";

window.localStorage = {
    __STORE__: {},
    getItem: key => this.__STORE__[key],
    setItem: (key, value) => this.__STORE__[key] = value.toString(),
    removeItem: key => delete this.__STORE__[key],
    clear: () => this.__STORE__ = {}
};

describe("StorageService", () => { 

    afterEach(() => {
        StorageService.clear();
    });

    it("should set item to local storage", () => {
        StorageService.set("test", "test");
        expect(StorageService.get("test")).toEqual("test");
    });

    it("should replace item in local storage if it already exists", () => {
        StorageService.set("test", "test");
        StorageService.set("test", "test2");
        expect(StorageService.get("test")).toEqual("test2");
    });

    it("should get item from local storage", () => {
        StorageService.set("test", "test");
        expect(StorageService.get("test")).toEqual("test");
    });

    it('gets json items from local storage', () => {
        const testObject = { test: "test" };
        StorageService.set("test", JSON.stringify(testObject));
        expect(JSON.parse(StorageService.get("test"))).toEqual(testObject);
    });

    it("should remove item from local storage", () => {
        StorageService.set("test", "test");
        StorageService.remove("test");
        expect(StorageService.get("test")).toEqual(null);
    });

    it("should remove item from JSON list in local storage", () => {
        const testObject = [{ "id": "test" }, { "id": "test2" }];
        StorageService.set("testData", JSON.stringify(testObject));
        StorageService.removeFromItem("testData", { "id": "test" });
        expect(JSON.parse(StorageService.get("testData"))).toEqual([testObject[1]]);
    });

    it("should clear local storage", () => {
        StorageService.set("test", "test");
        StorageService.clear();
        expect(StorageService.get("test")).toEqual(null);
    });
});