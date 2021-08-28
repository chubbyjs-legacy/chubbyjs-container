import PsrContainerExceptionInterface from '@chubbyjs/psr-container/dist/ContainerExceptionInterface';

class ContainerException implements PsrContainerExceptionInterface {
    name: string;
    message: string;
    stack?: string;

    public constructor(message: string, stack?: string) {
        this.name = 'ContainerException';
        this.message = message;
        this.stack = stack;
    }

    public static create(id: string, previous: unknown): ContainerException {
        return new ContainerException(
            `Could not create service with id "${id}"`,
            previous instanceof Error ? previous.stack : undefined,
        );
    }
}

export default ContainerException;
