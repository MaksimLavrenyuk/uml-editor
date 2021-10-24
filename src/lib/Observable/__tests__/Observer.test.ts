import Observable from '../index';

describe('Observer', () => {
    it('Register listener.', () => {
        const observable = new Observable<string>();
        const handle = {
            deregister: expect.any(Function),
        };

        function listenerFirst(payload: string) {
            expect(payload).toBe('test');
        }

        function listenerSecond(payload: string) {
            expect(payload).toBe('test');
        }

        const mockListenerFirst = jest.fn(listenerFirst);
        const mockListenerSecond = jest.fn(listenerSecond);

        expect(observable.registerListener(mockListenerFirst)).toEqual(handle);
        expect(observable.registerListener(mockListenerSecond)).toEqual(handle);

        observable.emit('test');

        expect(mockListenerFirst).toHaveBeenCalled();
        expect(mockListenerSecond).toHaveBeenCalled();
    });

    it('Deregister listener.', () => {
        const observable = new Observable<string>();
        const dummyHandle = {
            deregister: expect.any(Function),
        };

        function listener(payload: string) {
            expect(payload).toBe('test');
        }

        function dummyListener() {
            console.log('dummy');
        }

        expect(observable.registerListener(listener)).toEqual(dummyHandle);

        observable.emit('test');

        expect(observable.deregisterListener(dummyListener)).toBeFalsy();
        expect(observable.deregisterListener(listener)).toBeTruthy();
    });

    it('Deregister by handle.', () => {
        const observable = new Observable<string>();
        const dummyHandle = {
            deregister: expect.any(Function),
        };

        function listener(payload: string) {
            expect(payload).toBe('test');
        }

        const mockListener = jest.fn(listener);
        const handle = observable.registerListener(mockListener);

        expect(handle).toEqual(dummyHandle);
        handle.deregister();
        observable.emit('test');
        expect(mockListener).not.toHaveBeenCalled();
    });
});
