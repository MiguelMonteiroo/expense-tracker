import assert from 'node:assert/strict'
import { randomUUID } from 'crypto';
import { test, mock, suite } from 'node:test'
import { registerUserAsync, getUserByIdAsync, updateUserAsync, deleteUserAsync } from '../../services/userService.js'
import { User, Transaction } from '../../models/index.js'
import { UserDTO } from '../../services/dtos/userDTO.js'
import { Sequelize, UniqueConstraintError } from 'sequelize'

suite("registerUserAsync", () => {
    test("Can register a user", async () => {
        const data = {
            username: 'johndoe',
            email: 'johndoe@email.com',
            password: 'Abc123!@#',
        }
        const user = {
            id: randomUUID(),
            username: 'johndoe',
            email: 'johndoe@email.com',
            password: 'Abc123!@#',
            createdAt: '2025-09-20 08:45:42.874 +00:00',
            updatedAt: '2025-09-20 08:45:42.874 +00:00',
        }
        const dto = new UserDTO(user)

        mock.method(User, 'create', async (data) => {
            return user;
        })

        const result = await registerUserAsync(data);

        assert.deepStrictEqual(result, dto)
        assert.equal(result instanceof UserDTO, true)
    });


    test('Cannot register user with same email', async () => {
        const data = {
            username: 'johndoe',
            email: 'johndoe@email.com',
            password: 'Abc123!@#',
        };

        const user = {
            id: randomUUID(),
            username: 'johndoe2',
            email: 'johndoe@email.com',
            password: 'Abc1234!@#',
            createdAt: '2025-09-20 08:45:42.874 +00:00',
            updatedAt: '2025-09-20 08:45:42.874 +00:00',
        };

        const dto = new UserDTO(user);
        const ctx1 = mock.method(User, 'create', async () => user);

        const result1 = await registerUserAsync(data);
        mock.restoreAll();

        const ctx2 = mock.method(User, 'create', async () => {
            throw new UniqueConstraintError({
                message: 'email must be unique',
                errors: [
                    { message: 'email must be unique', path: 'email', value: data.email },
                ],
            });
        });

        assert.deepStrictEqual(result1, dto);
        assert.equal(result1 instanceof UserDTO, true);
        assert.strictEqual(ctx1.mock.calls.length, 1);

        await assert.rejects(() => registerUserAsync(data), UniqueConstraintError);
        assert.strictEqual(ctx2.mock.calls.length, 1);
    });

    test('Cannot register user with same username', async () => {
        const data = {
            username: 'johndoe',
            email: 'johndoe2@email.com',
            password: 'Abc1234!@#',
        };

        const user = {
            id: randomUUID(),
            username: 'johndoe2',
            email: 'johndoe@email.com',
            password: 'Abc1234!@#',
            createdAt: '2025-09-20 08:45:42.874 +00:00',
            updatedAt: '2025-09-20 08:45:42.874 +00:00',
        };

        const dto = new UserDTO(user);
        const ctx1 = mock.method(User, 'create', async () => user);

        const result1 = await registerUserAsync(data);
        mock.restoreAll();

        const ctx2 = mock.method(User, 'create', async () => {
            throw new UniqueConstraintError({
                message: 'email must be unique',
                errors: [
                    { message: 'email must be unique', path: 'email', value: data.email },
                ],
            });
        });

        assert.deepStrictEqual(result1, dto);
        assert.equal(result1 instanceof UserDTO, true);
        assert.strictEqual(ctx1.mock.calls.length, 1);

        await assert.rejects(() => registerUserAsync(data), UniqueConstraintError);
        assert.strictEqual(ctx2.mock.calls.length, 1);
    });
});


suite('getUserByIdAsync', () => {
    test('Return null when user not found', async () => {
        mock.method(User, 'findByPk', (id) => {
            return null
        })

        const result = await getUserByIdAsync(randomUUID());
        assert.equal(result, null)
    });

    test('Returns userDTO', async () => {

        const user = {
            id: randomUUID(),
            username: 'johndoe2',
            email: 'johndoe@email.com',
            password: 'Abc1234!@#',
            createdAt: '2025-09-20 08:45:42.874 +00:00',
            updatedAt: '2025-09-20 08:45:42.874 +00:00',
        };
        const dto = new UserDTO(user);
        mock.method(User, 'findByPk', async (id) => user)

        const result = await getUserByIdAsync(user.id);

        assert.deepStrictEqual(result, dto);
    });

})

suite('deleteUserAsync', () => {
    test('Return false when user not found', async () => {
        mock.method(User, 'findByPk', (id) => {
            return null
        })

        const result = await deleteUserAsync(randomUUID());
        assert.equal(result, false)
    });

    test('Returns true when user deleted', async () => {
        const user = {
            id: randomUUID(),
            username: 'johndoe2',
            email: 'johndoe@email.com',
            password: 'Abc1234!@#',
            createdAt: '2025-09-20 08:45:42.874 +00:00',
            updatedAt: '2025-09-20 08:45:42.874 +00:00',
            destroy: async () => true,
        };
        mock.method(User, 'findByPk', (id) => user)

        const result = await deleteUserAsync(user.id);

        assert.equal(result, true)
    });

})


suite('updateUserAsync', () => {
    test('Return null when user not found', async () => {
        const user = {
            id: randomUUID(),
            username: 'johndoe2',
            email: 'johndoe@email.com',
            password: 'Abc1234!@#',
            createdAt: '2025-09-20 08:45:42.874 +00:00',
            updatedAt: '2025-09-20 08:45:42.874 +00:00',
        };
        const userUpdate = {
            username: 'johndoe3',
        };

        mock.method(User, 'findByPk', (id) => {
            return null
        })

        const result = await updateUserAsync(randomUUID(), userUpdate);

        assert.equal(result, null)
    });

    test('Returns true when user updated', async () => {
        const user = {
            id: randomUUID(),
            username: 'johndoe2',
            email: 'johndoe@email.com',
            password: 'Abc1234!@#',
            createdAt: '2025-09-20 08:45:42.874 +00:00',
            updatedAt: '2025-09-20 08:45:42.874 +00:00',
            update: async (fields) => Object.assign(user, fields)
        };

        const userUpdate = {
            username: 'johndoe3',
        };

        mock.method(User, 'findByPk', (id) => {
            return user;
        })


        const result = await updateUserAsync(user.id, userUpdate);

        assert.ok(result)
        assert.equal(result.username, 'johndoe3')
    });

})

