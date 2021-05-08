import FactoryInterface from '../src/FactoryInterface';
import Container from '../src/Container';
import PsrContainerInterface from '@chubbyjs/psr-container/dist/ContainerInterface';

test('construct', () => {
    const container = new Container(
        new Map<string, FactoryInterface>([
            [
                'id',
                (): {} => {
                    return {};
                },
            ],
        ]),
    );

    expect(container.get('id')).toEqual({});
});

test('factories', () => {
    const container = new Container();

    container.factories(
        new Map<string, FactoryInterface>([
            [
                'id',
                (): {} => {
                    return {};
                },
            ],
        ]),
    );

    expect(container.get('id')).toEqual({});
});

test('factory with existing prototype factory', () => {
    const container = new Container();

    container.prototypeFactory('id', (): {} => {
        return {};
    });

    expect(() =>
        container.factory('id', (): {} => {
            return {};
        }),
    ).toThrow('Factory with id "id" already exists as "prototype factory"');
});

test('factory', () => {
    const container = new Container();

    container.factory('id', (): {} => {
        return {};
    });

    expect(container.get('id')).toEqual({});
});

test('factory extend', () => {
    const container = new Container();

    container.factory(
        'id',
        (): Map<string, string> => {
            return new Map<string, string>([['key1', 'value1']]);
        },
    );
    container.factory(
        'id',
        (container: PsrContainerInterface, previous?: FactoryInterface): Map<string, string> => {
            if (!previous) {
                throw Error('Missing previous');
            }

            const service: Map<string, string> = previous(container);
            service.set('key2', 'value2');

            return service;
        },
    );
    container.factory(
        'id',
        (container: PsrContainerInterface, previous?: FactoryInterface): Map<string, string> => {
            if (!previous) {
                throw Error('Missing previous');
            }

            const service: Map<string, string> = previous(container);
            service.set('key3', 'value3');

            return service;
        },
    );

    const service: Map<string, string> = container.get('id');

    expect(service.get('key1')).toBe('value1');
    expect(service.get('key2')).toBe('value2');
    expect(service.get('key3')).toBe('value3');
});

test('factory replace', () => {
    const container = new Container();

    container.factory('id', () => {
        throw new Error('Should not be called!');
    });
    container.factory(
        'id',
        (): Map<string, string> => {
            return new Map<string, string>([['key1', 'value1']]);
        },
    );
    container.factory(
        'id',
        (container: PsrContainerInterface, previous?: FactoryInterface): Map<string, string> => {
            if (!previous) {
                throw Error('Missing previous');
            }

            const service: Map<string, string> = previous(container);
            service.set('key2', 'value2');

            return service;
        },
    );

    const service: Map<string, string> = container.get('id');

    expect(service.get('key1')).toBe('value1');
    expect(service.get('key2')).toBe('value2');
});

test('factory replace after service instanciated', () => {
    const container = new Container();

    container.factory('id', (): {} => {
        return {};
    });

    const service = container.get('id');

    container.factory('id', (): {} => {
        return {};
    });

    expect(container.get('id')).not.toBe(service);
});

test('prototype factories', () => {
    const container = new Container();

    container.prototypeFactories(
        new Map<string, FactoryInterface>([
            [
                'id',
                (): {} => {
                    return {};
                },
            ],
        ]),
    );

    expect(container.get('id')).toEqual({});
});

test('prototype factory with existing factory', () => {
    const container = new Container();

    container.factory('id', (): {} => {
        return {};
    });

    expect(() =>
        container.prototypeFactory('id', (): {} => {
            return {};
        }),
    ).toThrow('Factory with id "id" already exists as "factory"');
});

test('prototype factory', () => {
    const container = new Container();

    container.prototypeFactory('id', (): {} => {
        return {};
    });

    expect(container.get('id')).toEqual({});
});

test('prototype factory extend', () => {
    const container = new Container();

    container.prototypeFactory(
        'id',
        (): Map<string, string> => {
            return new Map<string, string>([['key1', 'value1']]);
        },
    );
    container.prototypeFactory(
        'id',
        (container: PsrContainerInterface, previous?: FactoryInterface): Map<string, string> => {
            if (!previous) {
                throw Error('Missing previous');
            }

            const object: Map<string, string> = previous(container);
            object.set('key2', 'value2');

            return object;
        },
    );
    container.prototypeFactory(
        'id',
        (container: PsrContainerInterface, previous?: FactoryInterface): Map<string, string> => {
            if (!previous) {
                throw Error('Missing previous');
            }

            const object: Map<string, string> = previous(container);
            object.set('key3', 'value3');

            return object;
        },
    );

    const service: Map<string, string> = container.get('id');

    expect(service.get('key1')).toBe('value1');
    expect(service.get('key2')).toBe('value2');
    expect(service.get('key3')).toBe('value3');
});

test('prototype factory replace', () => {
    const container = new Container();

    container.prototypeFactory('id', () => {
        throw new Error('Should not be called!');
    });
    container.prototypeFactory(
        'id',
        (): Map<string, string> => {
            return new Map<string, string>([['key1', 'value1']]);
        },
    );
    container.prototypeFactory('id', (container: PsrContainerInterface, previous?: FactoryInterface) => {
        if (!previous) {
            throw Error('Missing previous');
        }

        const object: Map<string, string> = previous(container);
        object.set('key2', 'value2');

        return object;
    });

    const service: Map<string, string> = container.get('id');

    expect(service.get('key1')).toBe('value1');
    expect(service.get('key2')).toBe('value2');
});

test('get with missing id', () => {
    const container = new Container();

    expect(() => container.get('id')).toThrow('There is no service with id "id"');
});

test('get with factory', () => {
    const container = new Container();

    container.factory('id', (): {} => {
        return {};
    });

    const service = container.get('id');

    expect(service).toEqual({});

    expect(container.get('id')).toBe(service);
});

test('get with prototype factory', () => {
    const container = new Container();

    container.prototypeFactory('id', (): {} => {
        return {};
    });

    const service = container.get('id');

    expect(service).toEqual({});

    expect(container.get('id')).not.toBe(service);
});

test('get with factory and exception', () => {
    const container = new Container();

    container.factory('id', (container: PsrContainerInterface, previous?: FactoryInterface) => {
        return container.get('unknown');
    });

    expect(() => container.get('id')).toThrow('Could not create service with id "id"');
});

test('get with prototype factory and exception', () => {
    const container = new Container();

    container.prototypeFactory('id', (container: PsrContainerInterface, previous?: FactoryInterface) => {
        return container.get('unknown');
    });

    expect(() => container.get('id')).toThrow('Could not create service with id "id"');
});

test('has', () => {
    const container = new Container();

    expect(container.has('id')).toBe(false);
});

test('has with factory', () => {
    const container = new Container();

    container.factory('id', (): {} => {
        return {};
    });

    expect(container.has('id')).toBe(true);
});

test('has with prototype factory', () => {
    const container = new Container();

    container.prototypeFactory('id', (): {} => {
        return {};
    });

    expect(container.has('id')).toBe(true);
});
