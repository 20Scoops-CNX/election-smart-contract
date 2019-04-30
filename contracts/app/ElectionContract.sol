pragma solidity >=0.4.24 <0.6.0;

import "../state/StorageState.sol";
import "../permission/Ownable.sol";

contract ElectionContract is StorageState, Ownable {

    event NewCandidateEvent(uint id, string name, string imageUrl);
    event VoteCandidateEvent(uint id, string name, string imageUrl, uint voteCount);

    modifier onlyManager() {
        require(msg.sender == owner, "Sorry!, This function for manager only");
        _;
    }

    modifier requireCandidate(uint _candidateId) {
        require(_candidateId > 0 && _candidateId <= candidateStorage.getCount(), "System not found this candidate id");
        _;
    }

    modifier requireVote() {
        require(!(voterStorage.isUserVoted(msg.sender)), "This account already vote");
        _;
    }

    modifier requireVoter(uint voterId) {
        require(voterId < voterStorage.getCountVoter(), "System not found this voter id");
        _;
    }

    function addCandidate(string memory _name, string memory _imageUrl) public onlyManager {
        (uint id) = candidateStorage.setCandidate(_name, _imageUrl);
        emit NewCandidateEvent(id, _name, _imageUrl);
    }

    function getTotalCandidate() public view returns (uint) {
        return candidateStorage.getCount();
    }

    function getCandidate(uint id) public requireCandidate(id) view returns (uint, string memory, string memory, uint) {
        return candidateStorage.getCandidate(id);
    }

    function vote(uint _candidateId) public requireVote() requireCandidate(_candidateId) {
        voterStorage.setUserVote(msg.sender);
        candidateStorage.updateVoteCount(_candidateId);
        (uint id, string memory name, string memory imageUrl, uint voteCount) = candidateStorage.getCandidate(_candidateId);
        emit VoteCandidateEvent(id, name, imageUrl, voteCount);
    }

    function getTotalVoter() public view returns (uint total) {
        return voterStorage.getCountVoter();
    }

    function getVoter(uint id) public requireVoter(id) view returns (address) {
        return voterStorage.getVoterAddress(id);
    }
}