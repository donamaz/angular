import mysql from 'mysql2';

export const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'dung123@',
  database: 'banhang',
  connectionLimit: 10,
});

export const query = (sql: string, values?: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    pool.query(sql, values, (error, results) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(results);
    });
  });
};
