exports.seed = (knex, Promise) => {
    // Deletes ALL existing entries
    return knex('product').del()
    .then(() => {
      return Promise.all([
        // Inserts seed entries
        knex('product').insert({
            name:         'Ball',
            price:        10.20,
            description:  'Multiple color ball'
        }),
        knex('product').insert({
            name:         'Potatoes',
            price:        11.20,
            description:  'Multiple flavors of Potatoes'
        })
      ]);
    });
};