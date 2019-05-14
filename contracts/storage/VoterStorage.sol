pragma solidity >=0.4.24 <0.6.0;

contract VoterStorage {

    mapping(address => bool) private voter;
    mapping(address => uint) private voterMapCandidate;
    address[] private users;

    function setUserVote(address _address, uint _candidateId) public {
        voter[_address] = true;
        voterMapCandidate[_address] = _candidateId;
        users.push(_address);
    }

    function isUserVoted(address _address) public view returns (bool) {
        return voter[_address];
    }

    function getCountVoter() public view returns (uint) {
        return users.length;
    }

    function getVoterAddress(uint index) public view returns (address) {
        return users[index];
    }

    function getVoterMapCandidate(address _address) public view returns (uint candidateId) {
        return voterMapCandidate[_address];
    }
}