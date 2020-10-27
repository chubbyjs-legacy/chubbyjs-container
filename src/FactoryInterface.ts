import PsrContainerInterface from 'psr-container/dist/ContainerInterface';

interface FactoryInterface {
    (container: PsrContainerInterface, previous?: FactoryInterface): any;
}

export default FactoryInterface;
