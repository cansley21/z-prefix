/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.seed = async function (knex) {
    await knex('user').del()
    await knex('user').insert([
        {id: 1, username: 'John', email: 'JohnWick@gmail.com', pass: 'dog', user_id: 1}
    ])
}