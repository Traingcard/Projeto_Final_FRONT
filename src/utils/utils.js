export function getFromStorage(key) {
    if (!key) {
        return null;
    }
    try {
        const value = localStorage.getItem(key);
        if (value) {
            return JSON.parse(value);
        }
        return null;
    } catch (error) {
        return null;
    }
}

export function setInStorage(key, data) {
    if (!key) {
        return null;
    }
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
        return null;
    }
}

export function removeFromStorage(key, data) {
    if (!key) {
        return null;
    }
    try {
        localStorage.removeItem(key, JSON.stringify(data))
    } catch (error) {
        return null;
    }
}