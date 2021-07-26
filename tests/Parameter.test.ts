import { expect, test } from '@jest/globals';
import FactoryInterface from '../src/FactoryInterface';
import Parameter from '../src/Parameter';
import PsrContainerInterface from '@chubbyjs/psr-container/dist/ContainerInterface';
import MockByCalls from '@chubbyjs/chubbyjs-mock/dist/MockByCalls';

test('parameter', () => {
    const mockByCalls = new MockByCalls();

    const container = mockByCalls.create<PsrContainerInterface>(class PsrContainer {}, []);

    const parameter: FactoryInterface = Parameter('value');

    expect(parameter(container)).toBe('value');
});
