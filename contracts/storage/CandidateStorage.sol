pragma solidity >=0.4.24 <0.6.0;

contract CandidateStorage {

    struct Candidate {
        uint id;
        string name;
        string imageUrl;
        uint voteCount;
    }

    mapping(uint => Candidate) private candidates;

    uint private candidateCount;

    event NewCandidateEvent(uint id, string name, string imageUrl);

    function setCandidate(string memory _name, string memory _imageUrl) public {
        candidateCount++;
        Candidate memory candidate = Candidate(candidateCount, _name, _imageUrl, 0);
        candidates[candidateCount] = candidate;
        emit NewCandidateEvent(candidate.id, candidate.name, candidate.imageUrl);
    }

    function getCandidate(uint _id) public view returns(uint, string memory, string memory, uint) {
        Candidate memory candidate = candidates[_id];
        return (candidate.id, candidate.name, candidate.imageUrl, candidate.voteCount);
    }

    function updateVoteCount(uint _id) public {
        candidates[_id].voteCount++;
    }

    function getCount() public view returns (uint count) {
        return candidateCount;
    }
}