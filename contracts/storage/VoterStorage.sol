pragma solidity >=0.4.24 <0.6.0;

contract VoterStorage {

    mapping(address => bool) public voter;

    function setUserVote(address _address) public {
        voter[_address] = true;
    }

    function isUserVoted(address _address) public view returns (bool) {
        return voter[_address];
    }
}