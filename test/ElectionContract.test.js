const ElectionContract = artifacts.require('ElectionContract');
const AppContract = artifacts.require('App');
const truffleAssert = require('truffle-assertions');

contract('ElectionContract', accounts => {
  var app, election;

  it('create and upgrade contract', async () => {
    app = await AppContract.deployed();
    election = await ElectionContract.deployed();
    const tx = await app.upgradeTo(election.address);
    app = await ElectionContract.at(app.address);
    truffleAssert.eventEmitted(tx, 'Upgraded');
  });

  it('add Donald Trump to candidate from owner should be success', async () => {
    const tx = await app.addCandidate(
      'Donald Trump',
      'http://www.gstatic.com/tv/thumb/persons/1805/1805_v9_bb.jpg'
    );
    assert.ok(tx);
    truffleAssert.eventEmitted(tx, 'NewCandidateEvent');
  });

  it('add Donald Trump to candidate from guest should be error', async () => {
    try {
      await await app.addCandidate(
        'Donald Trump',
        'http://www.gstatic.com/tv/thumb/persons/1805/1805_v9_bb.jpg',
        { from: accounts[1] }
      );
    } catch (err) {
      assert(err);
      return;
    }
    assert(false);
  });

  it('get total candidate should be 1', async () => {
    const result = await app.getTotalCandidate();
    assert.equal(result, 1);
  });

  it('get candidate from id 1 should be success', async () => {
    const tx = await app.getCandidate(1);
    assert.ok(tx);
  });

  it('get candidate from id 2 should be error', async () => {
    try {
      await app.getCandidate(2);
    } catch (err) {
      assert(err);
      return;
    }
    assert(false);
  });

  it('vote Donald Trump from account 1 should be success', async () => {
    const tx = await app.vote(1);
    assert.ok(tx);
    truffleAssert.eventEmitted(tx, 'VoteCandidateEvent');
  });

  it('vote Barack Obama from account 1 should be error', async () => {
    try {
      await app.vote(2);
    } catch (err) {
      assert(err);
      return;
    }
    assert(false);
  });

  it('vote Donald Trump from account 1 round 2 should be error', async () => {
    try {
      await app.vote(1, { from: accounts[0] });
    } catch (err) {
      assert(err);
      return;
    }
    assert(false);
  });

  it('get total voter should be 1', async () => {
    const result = await app.getTotalVoter();
    assert.equal(result, 1);
  });

  it('get voter from index 0 should be account 1', async () => {
    const address = await app.getVoter(0);
    assert.equal(address, accounts[0]);
  });

  it('get voter from index 1 should be error', async () => {
    try {
      await app.getVoter(1);
    } catch (err) {
      assert(err);
      return;
    }
    assert(false);
  });
});
