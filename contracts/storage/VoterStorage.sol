pragma solidity >=0.4.24 <0.6.0;

contract VoterStorage {

    mapping(address => bool) private voter;
    address[] private users;

    function setUserVote(address _address) public {
        voter[_address] = true;
        users.push(_address);
    }

    function isUserVoted(address _address) public view returns (bool) {
        return voter[_address];
    }

    function getCountVoter() public view returns (uint) {
        return users.length;
    }

    function getVoter(uint index) public view returns (address) {
        return users[index];
    }
}