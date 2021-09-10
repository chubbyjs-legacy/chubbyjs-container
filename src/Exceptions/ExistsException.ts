import PsrContainerExceptionInterface from '@chubbyjs/psr-container/dist/ContainerExceptionInterface';

class ExistsException extends Error implements PsrContainerExceptionInterface {
    public static readonly TYPE_FACTORY = 'factory';
    public static readonly TYPE_PROTOTYPE_FACTORY = 'prototype factory';

    private constructor(message: string) {
        super(message);
        this.name = 'ExistsException';
    }

    public static create(id: string, type: string): ExistsException {
        return new ExistsException(`Factory with id "${id}" already exists as "${type}"`);
    }
}

export default ExistsException;
