exports.seed = (knex, Promise) => {
    // Deletes ALL existing entries
    return knex('client').del()
    .then(() => {
      return Promise.all([
        // Inserts seed entries
        knex('client').insert({
            name        : 'Gerardo',
            lastnamefa  : 'Gutierrez',
            lastnamemo  : 'Castaneda',
            birthdate   : new Date(1993,11,20),
            address     : 'Somewhere #12'
        }),
        knex('client').insert({
            name        : 'Francisco',
            lastnamefa  : 'Lopez',
            lastnamemo  : 'Lopez',
            birthdate   : new Date(1994,05,24),
            address     : 'Somewhere esle #11'
        })
      ]);
    });
  };