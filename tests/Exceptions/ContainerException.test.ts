import { expect, test } from '@jest/globals';
import ContainerException from '../../src/Exceptions/ContainerException';

test('create', () => {
    const error = new Error('test');

    const exception = ContainerException.create('id', error);

    expect(exception.name).toBe('ContainerException');
    expect(exception.message).toBe('Could not create service with id "id"');
    expect(exception.previous).toBe(error);
});
