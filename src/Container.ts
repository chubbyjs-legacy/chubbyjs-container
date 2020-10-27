import ContainerException from './Exceptions/ContainerException';
import ContainerInterface from './ContainerInterface';
import ExistsException from './Exceptions/ExistsException';
import Factory from './Factory';
import FactoryInterface from './FactoryInterface';
import NotFoundException from './Exceptions/NotFoundException';

class Container implements ContainerInterface {
    private storedFactories = new Map<string, FactoryInterface>();
    private storedPrototypeFactories = new Map<string, FactoryInterface>();
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
        if (this.storedPrototypeFactories.has(id)) {
            throw ExistsException.create(id, ExistsException.TYPE_PROTOTYPE_FACTORY);
        }

        if (this.storedFactories.has(id)) {
            factory = Factory(this.storedFactories.get(id) as FactoryInterface, factory);
        }

        this.storedServices.delete(id);

        this.storedFactories.set(id, factory);

        return this;
    }

    public prototypeFactories(factories: Map<string, FactoryInterface>): ContainerInterface {
        factories.forEach((factory: FactoryInterface, id: string) => {
            this.prototypeFactory(id, factory);
        });

        return this;
    }

    public prototypeFactory(id: string, factory: FactoryInterface): ContainerInterface {
        if (this.storedFactories.has(id)) {
            throw ExistsException.create(id, ExistsException.TYPE_FACTORY);
        }

        if (this.storedPrototypeFactories.has(id)) {
            factory = Factory(this.storedPrototypeFactories.get(id) as FactoryInterface, factory);
        }

        this.storedPrototypeFactories.set(id, factory);

        return this;
    }

    public get(id: string): any {
        const prototypeFactory = this.storedPrototypeFactories.get(id);

        if (prototypeFactory) {
            return this.createFromPrototypeFactory(id, prototypeFactory);
        }

        if (!this.storedServices.has(id)) {
            this.storedServices.set(id, this.create(id));
        }

        return this.storedServices.get(id);
    }

    public has(id: string): boolean {
        return this.storedFactories.has(id) || this.storedPrototypeFactories.has(id);
    }

    private create(id: string): any {
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

    private createFromPrototypeFactory(id: string, prototypeFactory: FactoryInterface): any {
        try {
            return prototypeFactory(this);
        } catch (e) {
            throw ContainerException.create(id, e);
        }
    }
}

export default Container;
