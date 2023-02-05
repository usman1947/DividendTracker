import PouchDB from 'pouchdb';
import PouchDBAdapterIdb from 'pouchdb-adapter-idb';
import PouchDBFind from 'pouchdb-find';
import { fetchHoldings, updateHoldings } from 'services/holdingSlice';
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

export const getAllHoldings = async (dispatch) => {
    try {
      const response = await holdingsDb.find({
        selector: {
          type: 'holding'
        }
      });
      dispatch(fetchHoldings(response.docs))
    } catch (error) {
      console.log(error);
      throw error;
    }
};
  
// Create a new holding
export const createHoldings = async (objectArray, dispatch) => {
    try {
        objectArray.map(async (holding) => {
                return await holdingsDb.post({
                    _id: new Date().toISOString(),
                    type: 'holding',
                    ticker: holding.ticker,
                    shares: holding.shares,
                    cost: holding.cost,
                    createdAt: new Date().toISOString()
                })
            })
        await getAllHoldings(dispatch)
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
export const updateHolding = async (id, shares, cost, dispatch) => {
    try {
        const holding = await holdingsDb.get(id);
        holding.shares = shares;
        holding.cost = cost;
        const response = await holdingsDb.put(holding);
        dispatch(updateHoldings(
            {
                id: id,
                updatedObject: holding
            },
        ))
        console.log(response);
    } catch (error) {
        console.error(error);
    }
};
  
// Delete a holding
export const deleteHolding = async (id, dispatch) => {
    try {
        const holding = await holdingsDb.get(id);
        const response = await holdingsDb.remove(holding);
        console.log(response);
        await getAllHoldings(dispatch)

    } catch (error) {
        console.error(error);
    }
};