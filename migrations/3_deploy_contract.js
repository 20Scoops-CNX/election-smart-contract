const ElectionContract = artifacts.require('ElectionContract');

module.exports = async deployer => {
  deployer.deploy(ElectionContract);
};
