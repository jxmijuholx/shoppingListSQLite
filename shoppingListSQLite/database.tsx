import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('shoppingList.db');

const initDatabase = () => {
  db.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY AUTOINCREMENT, product TEXT NOT NULL, amount TEXT NOT NULL);',
    );
  }, (err) => console.log('Database initialization error:', err),
    () => console.log('Database initialized successfully'));
};

const insertItem = (product: string, amount: string) => {
  db.transaction(tx => {
    tx.executeSql('INSERT INTO items (product, amount) VALUES (?, ?);', [product, amount]);
  });
};

const deleteItem = (id: number) => {
  db.transaction(tx => {
    tx.executeSql('DELETE FROM items WHERE id = ?;', [id]);
  });
};

const fetchItems = (setItems: React.Dispatch<React.SetStateAction<any[]>>) => {
  db.transaction(tx => {
    tx.executeSql('SELECT * FROM items;', [], (_, { rows: { _array } }) => {
      setItems(_array);
    });
  });
};

export { deleteItem, fetchItems, initDatabase, insertItem };

