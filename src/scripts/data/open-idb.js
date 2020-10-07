import { openDB } from 'idb';
import CONFIG from '../globals/config';

const {
  DATABASE_NAME, DATABASE_VERSION, OBJECT_STORE_NAME, OBJECT_STORE_BOOK_NAME,
} = CONFIG;

const dbPromise = openDB(DATABASE_NAME, DATABASE_VERSION, {
  upgrade(database) {
    database.createObjectStore(OBJECT_STORE_NAME, { keyPath: 'id' });
    database.createObjectStore(OBJECT_STORE_BOOK_NAME, { keyPath: 'id' });
  },
});

export default dbPromise;
