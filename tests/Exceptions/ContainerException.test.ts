import { expect, test } from '@jest/globals';
import ContainerException from '../../src/Exceptions/ContainerException';

test('create', () => {
    const exception = ContainerException.create('id', new Error('test'));

    expect(exception.name).toBe('ContainerException');
    expect(exception.message).toBe('Could not create service with id "id"');
    expect(exception.stack).toMatch(/^Error: test/);
});
