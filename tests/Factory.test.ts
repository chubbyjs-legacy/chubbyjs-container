import { Mock } from 'moq.ts';
import Factory from '../src/Factory';
import FactoryInterface from '../src/FactoryInterface';
import PsrContainerInterface from 'psr-container/dist/ContainerInterface';

test('factory', () => {
    const container = new Mock<PsrContainerInterface>().object();

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
