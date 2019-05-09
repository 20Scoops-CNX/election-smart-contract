pragma solidity >=0.4.24 <0.6.0;

contract CandidateStorage {

    struct Candidate {
        uint id;
        string name;
        string partyName;
        string partyLogo;
        string imageUrl;
        uint voteCount;
    }

    mapping(uint => Candidate) private candidates;

    uint private candidateCount;

    function setCandidate(
        string memory _name, 
        string memory partyName, 
        string memory partyLogo, 
        string memory _imageUrl
    ) public returns (uint) {
        candidateCount++;
        Candidate memory candidate = Candidate(candidateCount, _name, partyName, partyLogo, _imageUrl, 0);
        candidates[candidateCount] = candidate;
        return candidateCount;
    }

    function getCandidate(uint _id) public view returns(uint, string memory, string memory, string memory, string memory, uint) {
        Candidate memory candidate = candidates[_id];
        return (candidate.id, candidate.name, candidate.partyName, candidate.partyLogo, candidate.imageUrl, candidate.voteCount);
    }

    function updateVoteCount(uint _id) public {
        candidates[_id].voteCount++;
    }

    function getCount() public view returns (uint count) {
        return candidateCount;
    }
}