const ElectionContract = artifacts.require('ElectionContract');
const AppContract = artifacts.require('App');

contract('ElectionContract', accounts => {
  var app, example;

  beforeEach(async () => {
    app = await AppContract.deployed();
    example = await ElectionContract.deployed();
  });

  it('register user', async () => {
    await app.upgradeTo(example.address);
    app = await ElectionContract.at(app.address);
    const tx = await app.register('20scoops');
    assert.ok(tx);
  });
});
