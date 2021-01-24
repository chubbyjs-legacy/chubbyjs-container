import ContainerException from './Exceptions/ContainerException';
import ContainerInterface from './ContainerInterface';
import Factory from './Factory';
import FactoryInterface from './FactoryInterface';
import NotFoundException from './Exceptions/NotFoundException';

class MinimalContainer implements ContainerInterface {
    private storedFactories = new Map<string, FactoryInterface>();
    private storedServices = new Map<string, any>();

    public constructor(factories: Map<string, FactoryInterface> = new Map<string, FactoryInterface>()) {
        this.factories(factories);
    }

    public factories(factories: Map<string, FactoryInterface>): ContainerInterface {
        factories.forEach((factory: FactoryInterface, id: string) => {
            this.factory(id, factory);
        });

        return this;
    }

    public factory(id: string, factory: FactoryInterface): ContainerInterface {
        if (this.storedFactories.has(id)) {
            factory = Factory(this.storedFactories.get(id) as FactoryInterface, factory);
        }

        this.storedServices.delete(id);

        this.storedFactories.set(id, factory);

        return this;
    }

    public get<T>(id: string): T {
        if (!this.storedServices.has(id)) {
            this.storedServices.set(id, this.create<T>(id));
        }

        return this.storedServices.get(id);
    }

    public has(id: string): boolean {
        return this.storedFactories.has(id);
    }

    private create<T>(id: string): T {
        const factory = this.storedFactories.get(id);

        if (!factory) {
            throw NotFoundException.create(id);
        }

        try {
            return factory(this);
        } catch (e) {
            throw ContainerException.create(id, e);
        }
    }
}

export default MinimalContainer;
