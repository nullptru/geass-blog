import mysql from 'mysql';

const container = () => {
  let pool;

  const getPool = () => {
    return pool || mysql.createPool({
      connectionLimit: 10,
      host: 'localhost',
      user: 'root',
      password: '130907',
      database: 'geass_blog',
    });
  };
  return {
    query: (sql, params) => {
      return new Promise((resolve, reject) => {
        getPool().getConnection((err, connection) => {
          if (err) {
            reject(err);
          } else {
            connection.query(sql, params, (errs, results) => {
              connection.release();
              if (errs) {
                reject(errs);
              }
              resolve(results);
            });
          }
        });
      });
    },
  };
};

export default container();
