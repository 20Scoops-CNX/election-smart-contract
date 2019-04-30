const UserStorage = artifacts.require('UserStorage');
const App = artifacts.require('App');

module.exports = async deployer => {
  deployer.deploy(UserStorage).then(() => {
    return deployer.deploy(App, UserStorage.address);
  });
};
