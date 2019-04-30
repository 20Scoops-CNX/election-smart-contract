pragma solidity >=0.4.24 <0.6.0;

import "../state/StorageState.sol";
import "../permission/Ownable.sol";

contract ElectionContract is StorageState, Ownable {

    struct Candidate {
        uint id;
        string name;
        string imageUrl;
        uint voteCount;
    }

    mapping(address => bool) public voter;
    mapping(uint => Candidate) public candidates;

    uint public candidateCount;

    event NewCandidateEvent(uint id, string name, string imageUrl);
    event VoteCandidateEvent(uint id, string name, string imageUrl, uint voteCount);

    modifier onlyManager() {
        require(msg.sender == owner, "Sorry!, This function for manager only");
        _;
    }

    modifier requireVote(uint _candidateId) {
        require(!(voter[msg.sender]), "This account already vote");
        require(_candidateId > 0 && _candidateId <= candidateCount, "System not found this candidate id");
        _;
    }

    function addCandidate(string memory _name, string memory _imageUrl) public onlyManager {
        candidateCount++;
        Candidate memory candidate = Candidate(candidateCount, _name, _imageUrl, 0);
        candidates[candidateCount] = candidate;
        emit NewCandidateEvent(candidate.id, candidate.name, candidate.imageUrl);
    }

    function vote(uint _candidateId) public requireVote(_candidateId) {
        voter[msg.sender] = true;
        candidates[_candidateId].voteCount++;
        Candidate memory candidate = candidates[_candidateId];
        emit VoteCandidateEvent(candidate.id, candidate.name, candidate.imageUrl, candidate.voteCount);
    }
}