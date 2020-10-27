import FactoryInterface from './FactoryInterface';
import PsrContainerInterface from 'psr-container/dist/ContainerInterface';

interface ContainerInterface extends PsrContainerInterface {
    factories(factories: Map<string, FactoryInterface>): ContainerInterface;
    factory(id: string, factory: FactoryInterface): ContainerInterface;
}

export default ContainerInterface;
