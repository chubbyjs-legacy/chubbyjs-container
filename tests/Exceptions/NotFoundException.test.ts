import NotFoundException from '../../src/Exceptions/NotFoundException';

test('create', () => {
    const exception = NotFoundException.create('id');

    expect(exception.name).toBe('NotFoundException');
    expect(exception.message).toBe('There is no service with id "id"');
    expect(exception.stack).toBe(undefined);
});
