exports.seed = (knex, Promise) => {
    // Deletes ALL existing entries
    return knex('order').del()
    .then(() => {
      return Promise.all([
        // Inserts seed entries
        knex('order').insert({
            status:       'pending' ,
            date:          Date.now,
            products:      [1,2],
            client_id:     1,
            created_at:    Date.now,
            updated_at:    Date.now,
            deleted_at:    Date.now
        }),
        knex('order').insert({
            status:       'pending' ,
            date:          Date.now,
            products:      [3,4],
            client_id:     2,
            created_at:    Date.now,
            updated_at:    Date.now,
            deleted_at:    Date.now
        })
      ]);
    });
};