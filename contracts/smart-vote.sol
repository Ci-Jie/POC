pragma solidity ^0.4.11;

contract Test {

  struct Voter {
    bool voted;
    string candidate;
  }

  struct Candidate {
    string name;
    uint voteCount;
  }

  mapping(address => Voter) public voters;
  mapping(uint => Candidate) public candidates;

  uint candidateCount;

  event Vote(address addr);
  event AddCandidate(uint index);

  function Test () {
    candidateCount = 0;
  }

  function vote (uint candidateID, string candidateName) returns (bool, string) {
    voters[msg.sender].voted = true;
    voters[msg.sender].candidate = candidateName;
    Vote(msg.sender);
    candidates[candidateID].voteCount += 1;
    return (
      voters[msg.sender].voted,
      voters[msg.sender].candidate
    );
  }

  function getVoter () returns (bool, string) {
    return (
      voters[msg.sender].voted,
      voters[msg.sender].candidate
    );
  }

  function addCandidate (uint index, string voterName) returns (string, uint) {
    candidates[index].name = voterName;
    candidates[index].voteCount = 0;
    AddCandidate(index);
    candidateCount += 1;
    return (
      candidates[index].name,
      candidates[index].voteCount
    );
  }

  function getCandidate (uint index) returns (string, uint) {
    return (candidates[index].name, candidates[index].voteCount);
  }

  function getCandidateCount () returns (uint) {
    return candidateCount;
  }
}
