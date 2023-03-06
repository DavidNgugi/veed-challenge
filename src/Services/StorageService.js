const storage = window.localStorage

export const get = (key) => {
    return storage.getItem(key);
}

export const set = (key, value) => {
    const current = get(key);
    if (current && current === value) return;
    storage.setItem(key, value);
}

export const appendToItem = (key, value) => {
    let currentArray = [];

    const current = get(key);
    if (current) {
        currentArray = JSON.parse(current);
    }

    if (!currentArray.includes(value)) {
        currentArray.push(value);
        set(key, JSON.stringify(currentArray));
    }
}

export const remove = (key) => {
    storage.removeItem(key);
}

export const removeFromItem = (key, value) => {
    const current = get(key);
    if (current) {
        const currentArray = JSON.parse(current);
        const index = currentArray.findIndex((item) => item.id === value.id);
        if (index !== -1) {
            currentArray.splice(index, 1);
            set(key, JSON.stringify(currentArray));
        }
    }
}

export const clear = () => {
    storage.clear();
}
