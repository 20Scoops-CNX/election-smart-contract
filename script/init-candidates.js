const web3 = require('./web3');
const candidates = require('./candidates.json');

async function initCandidates() {
  const proxyConfig = require('../app/src/contracts/App.json');
  const electionConfig = require('../app/src/contracts/ElectionContract.json');
  const proxyAddress = proxyConfig.networks['3'].address;
  const electionABI = electionConfig.abi;
  const instanceApp = await new web3.eth.Contract(electionABI, proxyAddress);
  const accounts = await web3.eth.getAccounts();

  for (const item of candidates) {
    await instanceApp.methods
      .addCandidate(item.name, item.partyName, item.logoUrl, item.imageUrl)
      .send({ from: accounts[0] });
  }

  process.exit(0);
}

initCandidates();
