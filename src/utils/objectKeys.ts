function objectKeys<T extends Record<string, unknown>>(object: T) {
    return Object.keys(object) as (keyof T)[];
}

export default objectKeys;
