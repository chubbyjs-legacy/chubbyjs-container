import { expect, test } from '@jest/globals';
import FactoryInterface from '../src/FactoryInterface';
import MinimalContainer from '../src/MinimalContainer';
import PsrContainerInterface from '@chubbyjs/psr-container/dist/ContainerInterface';

test('construct', () => {
    const container = new MinimalContainer(
        new Map<string, FactoryInterface>().set('id', (): {} => {
            return {};
        }),
    );

    expect(container.get('id')).toEqual({});
});

test('factories', () => {
    const container = new MinimalContainer();

    container.factories(
        new Map<string, FactoryInterface>().set('id', (): {} => {
            return {};
        }),
    );

    expect(container.get('id')).toEqual({});
});

test('factory', () => {
    const container = new MinimalContainer();

    container.factory('id', (): {} => {
        return {};
    });

    expect(container.get('id')).toEqual({});
});

test('factory extend', () => {
    const container = new MinimalContainer();

    container.factory('id', (): Map<string, string> => {
        return new Map<string, string>().set('key1', 'value1');
    });
    container.factory('id', (container: PsrContainerInterface, previous?: FactoryInterface): Map<string, string> => {
        if (!previous) {
            throw Error('Missing previous');
        }

        const service: Map<string, string> = previous(container);
        service.set('key2', 'value2');

        return service;
    });
    container.factory('id', (container: PsrContainerInterface, previous?: FactoryInterface): Map<string, string> => {
        if (!previous) {
            throw Error('Missing previous');
        }

        const service: Map<string, string> = previous(container);
        service.set('key3', 'value3');

        return service;
    });

    const service: Map<string, string> = container.get('id');

    expect(service.get('key1')).toBe('value1');
    expect(service.get('key2')).toBe('value2');
    expect(service.get('key3')).toBe('value3');
});

test('factory replace', () => {
    const container = new MinimalContainer();

    container.factory('id', () => {
        throw new Error('Should not be called!');
    });
    container.factory('id', (): Map<string, string> => {
        return new Map<string, string>().set('key1', 'value1');
    });
    container.factory('id', (container: PsrContainerInterface, previous?: FactoryInterface): Map<string, string> => {
        if (!previous) {
            throw Error('Missing previous');
        }

        const service: Map<string, string> = previous(container);
        service.set('key2', 'value2');

        return service;
    });

    const service: Map<string, string> = container.get('id');

    expect(service.get('key1')).toBe('value1');
    expect(service.get('key2')).toBe('value2');
});

test('factory replace after service instanciated', () => {
    const container = new MinimalContainer();

    container.factory('id', (): {} => {
        return {};
    });

    const service = container.get('id');

    container.factory('id', (): {} => {
        return {};
    });

    expect(container.get('id')).not.toBe(service);
});

test('get with missing id', () => {
    const container = new MinimalContainer();

    expect(() => container.get('id')).toThrow('There is no service with id "id"');
});

test('get with factory', () => {
    const container = new MinimalContainer();

    container.factory('id', (): {} => {
        return {};
    });

    const service = container.get('id');

    expect(service).toEqual({});

    expect(container.get('id')).toBe(service);
});

test('get with factory and exception', () => {
    const container = new MinimalContainer();

    container.factory('id', (container: PsrContainerInterface, previous?: FactoryInterface) => {
        return container.get('unknown');
    });

    expect(() => container.get('id')).toThrow('Could not create service with id "id"');
});

test('has', () => {
    const container = new MinimalContainer();

    expect(container.has('id')).toBe(false);
});

test('has with factory', () => {
    const container = new MinimalContainer();

    container.factory('id', (): {} => {
        return {};
    });

    expect(container.has('id')).toBe(true);
});
