import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log("Put to jate Database");

  const jateDB = await openDB("jate", 1);

  const transact = jateDB.transaction("jate", "readwrite");

  const store = transact.objectStore("jate");

  const request = store.add({ content: content });

  const result = await request;
  console.log("data saved to the jate Database", result);
};
// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.LOG("Get from jate Database");

  const jateDB = await openDB("jate", 1);

  const transact = jateDB.transaction("jate", "readonly");

  const store = transact.objectStore("jate");

  const request = store.getAll();

  const result = await request;
  console.log("result.value", result);
  return result;
};

initdb();
