export interface Listener<Payload> {
    (payload: Payload): void
}

class Observable<Payload> {
    protected listeners = new Set<Listener<Payload>>();

    private getListenerHandle(listener: Listener<Payload>) {
        const exist = Boolean(this.listeners.has(listener));

        if (exist) {
            return {
                deregister: () => {
                    this.listeners.delete(listener);
                },
            };
        }

        return undefined;
    }

    public registerListener(listener: Listener<Payload>) {
        const { listeners } = this;
        listeners.add(listener);

        return {
            deregister() {
                listeners.delete(listener);
            },
        };
    }

    public deregisterListener(listener: Listener<Payload>) {
        const handle = this.getListenerHandle(listener);

        if (handle) {
            handle.deregister();
            return true;
        }
        return false;
    }

    public emit(payload: Payload) {
        this.listeners.forEach((listener) => {
            listener(payload);
        });
    }
}

export default Observable;
