import AsyncStorage from '@react-native-async-storage/async-storage';
import {DATA_STORE_TYPES} from '../../config/constants';

export default class DataStore {
  fetchData(url, storeType = DATA_STORE_TYPES.popular) {
    return new Promise((resolve, reject) => {
      this.fetchLocalData(url).then(wrappedData => {
        if (
          wrappedData &&
          DataStore.checkTimestampValid(wrappedData.timestamp)
        ) {
          resolve(wrappedData);
        } else {
          this.fetchRemoteDate(url, storeType)
            .then(data => {
              resolve(this._wrapData(data));
            })
            .catch(error => {
              reject(error);
            });
        }
      });
    });
  }

  saveData(url, data, cb) {
    if (!data || !url) {
      return;
    }
    AsyncStorage.setItem(url, JSON.stringify(this._wrapData(data)), cb);
  }

  _wrapData(data) {
    return {data, timestamp: new Date().getTime()};
  }

  fetchLocalData(url) {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem(url, (error, result) => {
        if (!error) {
          try {
            resolve(JSON.parse(result));
          } catch (e) {
            reject(e);
            console.error(e);
          }
        } else {
          console.error(error);
          reject(error);
        }
      });
    });
  }

  fetchRemoteDate(url, storeType = DATA_STORE_TYPES.popular) {
    return new Promise((resolve, reject) => {
      if (storeType === DATA_STORE_TYPES.popular) {
        fetch(url)
          .then(response => {
            if (response.ok) {
              return response.json();
            }
            throw new Error('Network response was failed.');
          })
          .then(res => {
            this.saveData(url, res);
            resolve(res);
          })
          .catch(error => reject(error));
      } else {
        // fetch(url)
        //   .then(response => {
        //     console.log('>>>>>>>> response', response);
        //     if (response.ok) {
        //       return response.json();
        //     }
        //     throw new Error('Network response was failed.');
        //   })
        //   .then(res => {
        //     this.saveData(url, res);
        //     resolve(res);
        //   })
        //   .catch(error => {
        //     console.log('>>> error >>>', error);
        //     reject(error);
        //   });
      }
    });
  }

  static checkTimestampValid(timestamp) {
    const currentDate = new Date();
    const targetDate = new Date();
    targetDate.setTime(timestamp);
    if (currentDate.getFullYear() !== targetDate.getFullYear()) {
      return false;
    }
    if (currentDate.getMonth() !== targetDate.getMonth()) {
      return false;
    }
    if (currentDate.getDate() !== targetDate.getDate()) {
      return false;
    }
    if (currentDate.getHours() - targetDate.getHours() > 4) {
      return false;
    }

    return true;
  }
}
