const CandidateStorage = artifacts.require('CandidateStorage');
const VoterStorage = artifacts.require('VoterStorage');
const App = artifacts.require('App');

module.exports = async deployer => {
  var candidateAddress;
  deployer
    .deploy(CandidateStorage)
    .then(() => {
      candidateAddress = CandidateStorage.address;
      return deployer.deploy(VoterStorage);
    })
    .then(VoterStorage => {
      return deployer.deploy(App, candidateAddress, VoterStorage.address);
    });
};
