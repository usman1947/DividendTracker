import PouchDB from 'pouchdb';
import PouchDBAdapterIdb from 'pouchdb-adapter-idb';
import PouchDBFind from 'pouchdb-find';
import { fetchHoldings, updateHoldings, isFetching } from 'services/holdingSlice';
import { v4 as uuid } from 'uuid';

PouchDB.plugin(PouchDBFind);
PouchDB.plugin(PouchDBAdapterIdb);
let database;
const getDb = () => {
    if (!database) {
        database = new PouchDB('dividendTrackerDb', {adapter: 'idb'});
    }
    return database;
}

const db = getDb();

export const getAllHoldings = async (dispatch) => {
    dispatch(isFetching(true))
    try {
      const response = await db.find({
        selector: {
          type: 'holding'
        }
      });
      dispatch(fetchHoldings(response.docs))
        dispatch(isFetching(false))
      return response.docs
    } catch (error) {
      console.log(error);
      throw error;
    }
};
  
// Create a new holding
export const createHoldings = async (objectArray, dispatch) => {
    try {
        objectArray.map(async (holding) => {
                return await db.post({
                    id: uuid(),
                    type: 'holding',
                    ticker: holding.ticker,
                    shares: holding.shares,
                    cost: holding.cost,
                    sector: holding.sector,
                    fiveYearDividendGrowth: holding.fiveYearDividendGrowth,
                    createdDate: new Date().toISOString()
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
        const response = await db.get(id);
        console.log(response);
    } catch (error) {
        console.error(error);
    }
};
  
// Update a holding
export const updateHolding = async (id, shares, cost, dispatch) => {
    try {
        const holding = await db.get(id);
        holding.shares = shares;
        holding.cost = cost;
        const response = await db.put(holding);
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
        const holding = await db.get(id);
        const response = await db.remove(holding);
        console.log(response);
        await getAllHoldings(dispatch)

    } catch (error) {
        console.error(error);
    }
};

export const getMarketData = async () => {
    try {
        const response = await db.find({
          selector: {
            type: 'marketData'
          }
        });
        return response.docs[0]
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const saveMarketData = async (data) => {
    try {
        const existingMarketData = await db.find({
            selector: { type: 'marketData' }
        });
        existingMarketData.docs.forEach(async element => {
            await db.remove(element);
        });
        await db.post({
            id: uuid(),
            type: 'marketData',
            ...data,
        })
    } catch (error) {
        console.error(error);
    }
}

export const getStocksData = async () => {
    try {
        const response = await db.find({
          selector: {
            type: 'stocksData'
          }
        });
        return response.docs[0]
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const saveStocksData = async (data) => {
    try {
        const existingMarketData = await db.find({
            selector: { type: 'stocksData' }
        });
        existingMarketData.docs.forEach(async element => {
            await db.remove(element);
        });
        await db.post({
            id: uuid(),
            type: 'stocksData',
            ...data,
        })
    } catch (error) {
        console.error(error);
    }
}