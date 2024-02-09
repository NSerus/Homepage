export class IndexDBHandler {
  // IndexedDB functions

  static async openDB() {
    const dbName = "Database";
    const dbVersion = 1;

    return new Promise((resolve, reject) => {
      const request = window.indexedDB.open(dbName, dbVersion);

      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains("tasks")) {
          const objectStore = db.createObjectStore("tasks", { keyPath: "id" });

          // Create an index on the timestamp property
          objectStore.createIndex("timestamp", "timestamp", { unique: false });
        }

        if (!db.objectStoreNames.contains("weather")) {
          const objectStore = db.createObjectStore("weather", {
            keyPath: "label",
          });
        }
        if (!db.objectStoreNames.contains("pomo")) {
          const objectStore = db.createObjectStore("pomo", {
            keyPath: "break",
          });
        }
      };

      request.onsuccess = () => {
        resolve(request.result);
      };

      request.onerror = () => {
        reject(request.error);
      };
    });
  }

  static async getAllData(db, storeName) {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(storeName, "readonly");
      const store = transaction.objectStore(storeName);
      const index = store.index("timestamp");

      const request = index.openCursor(null, "prev"); // "prev" for descending order

      const tasks = [];

      request.onsuccess = (event) => {
        const cursor = event.target.result;
        if (cursor) {
          tasks.push(cursor.value);
          cursor.continue();
        } else {
          resolve(tasks);
        }
      };

      request.onerror = () => {
        reject(request.error);
      };
    });
  }
  static async getLabel(db, storeName) {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(storeName, "readonly");
      const store = transaction.objectStore(storeName);
      const request = store.getAll();
    
      request.onsuccess = () => {
        resolve(request.result || []);
      };

      request.onerror = () => {
        reject(request.error);
      };
    });
  }

  static async updateInIndexedDB(newData, storeName) {
    try {
      const db = await IndexDBHandler.openDB();
      const transaction = db.transaction(storeName, "readwrite");
      const store = transaction.objectStore(storeName);


      // Clear existing data
      const clearPromise = new Promise((resolve, reject) => {
        const clearRequest = store.clear();
        clearRequest.onsuccess = () => resolve();
        clearRequest.onerror = () => reject(clearRequest.error);
      });

      // Wait for the clear operation to complete before adding new tasks
      await clearPromise;

      if (Array.isArray(newData)) {
        // Handle array of tasks
        await Promise.all(
          newData.map((task) => {
            return new Promise((resolve, reject) => {
              const addRequest = store.add(task);
              addRequest.onsuccess = () => resolve();
              addRequest.onerror = () => reject(addRequest.error);
            });
          })
        );
      } else if (
        typeof newData === "object" &&
        newData !== null
      ) {

        try {
          const addRequest = store.add(newData);
          await new Promise((resolve, reject) => {
            addRequest.onsuccess = () => resolve();
            addRequest.onerror = () => reject(addRequest.error);
          });
        } catch (error) {
          console.error("Error adding data to store:", error);
        }
      } else {
        console.error("Unsupported data type:", newData);
      }
    } catch (error) {
      console.error("Error updating tasks in IndexedDB:", error);
    }
  }
}
