import ExistsException from '../../src/Exceptions/ExistsException';

test('create', () => {
    const exception = ExistsException.create('id', ExistsException.TYPE_PROTOTYPE_FACTORY);

    expect(exception.name).toBe('ExistsException');
    expect(exception.message).toBe('Factory with id "id" already exists as "prototype factory"');
    expect(exception.stack).toBe(undefined);
});
