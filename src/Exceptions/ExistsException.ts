import PsrContainerExceptionInterface from '@chubbyjs/psr-container/dist/ContainerExceptionInterface';

class ExistsException implements PsrContainerExceptionInterface {
    name: string;
    message: string;
    stack?: string;

    public static readonly TYPE_FACTORY = 'factory';
    public static readonly TYPE_PROTOTYPE_FACTORY = 'prototype factory';

    public constructor(message: string, stack?: string) {
        this.name = 'ExistsException';
        this.message = message;
        this.stack = stack;
    }

    public static create(id: string, type: string): ExistsException {
        return new ExistsException(`Factory with id "${id}" already exists as "${type}"`);
    }
}

export default ExistsException;
