pragma solidity >=0.4.24 <0.6.0;

import "../storage/CandidateStorage.sol";
import "../storage/VoterStorage.sol";

contract StorageState {
    CandidateStorage public candidateStorage;
    VoterStorage public voterStorage;
}