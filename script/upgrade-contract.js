const web3 = require('./web3');

async function upgradeContract() {
  const proxyConfig = require('../app/src/contracts/App.json');
  const electionConfig = require('../app/src/contracts/ElectionContract.json');
  const proxyABI = proxyConfig.abi;
  const proxyAddress = proxyConfig.networks['4'].address;
  const electionAddress = electionConfig.networks['4'].address;
  const instanceProxy = await new web3.eth.Contract(proxyABI, proxyAddress);
  const accounts = await web3.eth.getAccounts();
  // upgrade to app address (first time or you upgrade contract only)
  const addressImpl = await instanceProxy.methods.implementation().call();
  console.log(addressImpl);
  try {
    const tx = await instanceProxy.methods
      .upgradeTo(electionAddress)
      .send({ from: accounts[0] });
    console.log(`upgrade contract successfully: ${tx}`);
  } catch (err) {
    console.log(`upgrade contract error: ${err.message}`);
  }
  process.exit(0);
}

upgradeContract();
