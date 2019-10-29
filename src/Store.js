export default class DataStore {
  static myInstance = null;

  _userID = '';

  IP='http://192.168.8.134/';

  userFullName='';

  /**
   * @returns {DataStore}
   */
  static getInstance() {
    if (DataStore.myInstance == null) {
      DataStore.myInstance = new DataStore();
    }

    return this.myInstance;
  }

  getUserID() {
    return this._userID;
  }

  setUserID(id) {
    this._userID = id;
  }
}
