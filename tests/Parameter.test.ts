import { Mock } from 'moq.ts';
import FactoryInterface from '../src/FactoryInterface';
import Parameter from '../src/Parameter';
import PsrContainerInterface from 'psr-container/dist/ContainerInterface';

test('parameter', () => {
    const container = new Mock<PsrContainerInterface>().object();

    const parameter: FactoryInterface = Parameter('value');

    expect(parameter(container)).toBe('value');
});
