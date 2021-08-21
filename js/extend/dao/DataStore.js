import AsyncStorage from '@react-native-async-storage/async-storage';

export default class DataStore {
  fetchData(url) {
    return new Promise((resolve, reject) => {
      this.fetchLocalData(url)
        .then(wrappedData => {
          if (
            wrappedData &&
            DataStore.checkTimestampValid(wrappedData.timestamp)
          ) {
            resolve(wrappedData);
          } else {
            this.fetchRemoteDate(url)
              .then(data => {
                resolve(this._wrapData(data));
              })
              .catch(error => reject(error));
          }
        })
        .catch(() => {
          this.fetchRemoteDate(url)
            .then(data => {
              resolve(this._wrapData(data));
            })
            .catch(error => reject(error));
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
          reject(error);
          console.error(error);
        }
      });
    });
  }

  fetchRemoteDate(url) {
    return new Promise((resolve, reject) => {
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
