import PsrNotFoundExceptionInterface from '@chubbyjs/psr-container/dist/NotFoundExceptionInterface';

class NotFoundException extends Error implements PsrNotFoundExceptionInterface {
    private constructor(message: string) {
        super(message);
        this.name = 'NotFoundException';
    }

    public static create(id: string): NotFoundException {
        return new NotFoundException(`There is no service with id "${id}"`);
    }
}

export default NotFoundException;
