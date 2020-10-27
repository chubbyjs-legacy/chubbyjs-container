import PsrNotFoundExceptionInterface from 'psr-container/dist/NotFoundExceptionInterface';

class NotFoundException implements PsrNotFoundExceptionInterface {
    name: string;
    message: string;
    stack?: string;

    public constructor(message: string, stack?: string) {
        this.name = 'NotFoundException';
        this.message = message;
        this.stack = stack;
    }

    public static create(id: string): NotFoundException {
        return new NotFoundException(`There is no service with id "${id}"`);
    }
}

export default NotFoundException;
