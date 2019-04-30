pragma solidity >=0.4.24 <0.6.0;

import "../state/StorageState.sol";
import "../permission/Ownable.sol";

contract ElectionContract is StorageState, Ownable {

    event VoteCandidateEvent(uint id, string name, string imageUrl, uint voteCount);

    modifier onlyManager() {
        require(msg.sender == owner, "Sorry!, This function for manager only");
        _;
    }

    modifier requireVote(uint _candidateId) {
        require(!(voterStorage.isUserVoted(msg.sender)), "This account already vote");
        require(_candidateId > 0 && _candidateId <= candidateStorage.getCount(), "System not found this candidate id");
        _;
    }

    function addCandidate(string memory _name, string memory _imageUrl) public onlyManager {
        candidateStorage.setCandidate(_name, _imageUrl);
    }

    function getTotalCandidate() public view returns (uint) {
        return candidateStorage.getCount();
    }

    function getCandidate(uint id) public view returns (uint, string memory, string memory, uint) {
        return candidateStorage.getCandidate(id);
    }

    function vote(uint _candidateId) public requireVote(_candidateId) {
        voterStorage.setUserVote(msg.sender);
        candidateStorage.updateVoteCount(_candidateId);
        (uint id, string memory name, string memory imageUrl, uint voteCount) = candidateStorage.getCandidate(_candidateId);
        emit VoteCandidateEvent(id, name, imageUrl, voteCount);
    }

    function getTotalVoter() public view returns (uint total) {
        return voterStorage.getCountVoter();
    }

    function getVoter(uint index) public view returns (address) {
        return voterStorage.getVoter(index);
    }
}