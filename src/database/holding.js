import PouchDB from 'pouchdb';
import PouchDBAdapterIdb from 'pouchdb-adapter-idb';
import PouchDBFind from 'pouchdb-find';

PouchDB.plugin(PouchDBFind);
PouchDB.plugin(PouchDBAdapterIdb);

let db;

const getDb = () => {
    if (!db) {
        db = new PouchDB('holdings', {adapter: 'idb'});
    }
    return db;
}

const holdingsDb = getDb();

export const getAllHoldings = async () => {
    try {
      const response = await holdingsDb.find({
        selector: {
          type: 'holding'
        }
      });
      console.log(response.docs);
    } catch (error) {
      console.error(error);
    }
};
  
// Create a new holding
export const createHolding = async (ticker, shares, cost) => {
    try {
        const response = await holdingsDb.post({
        _id: new Date().toISOString(),
        type: 'holding',
        ticker: ticker,
        shares: shares,
        cost: cost,
        createdAt: new Date().toISOString()
        });
        console.log(response);
    } catch (error) {
        console.error(error);
    }
};
  
// Read a holding
export const readHolding = async (id) => {
    try {
        const response = await holdingsDb.get(id);
        console.log(response);
    } catch (error) {
        console.error(error);
    }
};
  
// Update a holding
export const updateHolding = async (id, ticker, shares, cost) => {
    try {
        const holding = await holdingsDb.get(id);
        holding.ticker = ticker;
        holding.shares = shares;
        holding.cost = cost;
        const response = await holdingsDb.put(holding);
        console.log(response);
    } catch (error) {
        console.error(error);
    }
};
  
// Delete a holding
export const deleteHolding = async (id) => {
    try {
        const holding = await holdingsDb.get(id);
        const response = await holdingsDb.remove(holding);
        console.log(response);
    } catch (error) {
        console.error(error);
    }
};