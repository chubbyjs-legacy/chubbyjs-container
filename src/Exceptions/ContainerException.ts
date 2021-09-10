import PsrContainerExceptionInterface from '@chubbyjs/psr-container/dist/ContainerExceptionInterface';

class ContainerException extends Error implements PsrContainerExceptionInterface {
    previous?: unknown;

    private constructor(message: string, previous?: unknown) {
        super(message);
        this.name = 'ContainerException';
        this.previous = previous;
    }

    public static create(id: string, previous: unknown): ContainerException {
        return new ContainerException(`Could not create service with id "${id}"`, previous);
    }
}

export default ContainerException;
