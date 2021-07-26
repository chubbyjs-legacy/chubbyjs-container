import { expect, test } from '@jest/globals';
import Factory from '../src/Factory';
import FactoryInterface from '../src/FactoryInterface';
import PsrContainerInterface from '@chubbyjs/psr-container/dist/ContainerInterface';
import MockByCalls from '@chubbyjs/chubbyjs-mock/dist/MockByCalls';

test('factory', () => {
    const mockByCalls = new MockByCalls();

    const container = mockByCalls.create<PsrContainerInterface>(class PsrContainer {}, []);

    const factory = Factory(
        (container: PsrContainerInterface, previous?: FactoryInterface) => {
            return new Map<string, string>();
        },
        (container: PsrContainerInterface, previous?: FactoryInterface) => {
            if (!previous) {
                throw new Error('previous should exists');
            }

            const service: Map<string, string> = previous(container);

            service.set('key', 'value');

            return service;
        },
    );

    const service: Map<string, string> = factory(container);

    expect(service).toBeInstanceOf(Map);

    expect(service.get('key')).toBe('value');
});
