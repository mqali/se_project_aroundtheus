export default class UserInfo {
  constructor({ profileName, profileJob }) {
    this._profileName = profileName;
    this._profileJob = profileJob;
  }
  getUserInfo() {
    const nameElement = document.querySelector(this._profileName);
    const jobElement = document.querySelector(this._profileJob);

    const userInfo = {
      name: nameElement.textContent,
      job: jobElement.textContent,
    };

    return userInfo;
  }

  setUserInfo(data) {
    const nameElement = document.querySelector(this._profileName);
    const jobElement = document.querySelector(this._profileJob);

    nameElement.textContent = data.name;
    jobElement.textContent = data.job;
  }
}
