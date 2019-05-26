pragma solidity ^0.5.0;
contract NST {

    mapping (address => uint256) public balances;

    address[] public citizens;
    uint256 public citizenCount;

    uint256 public currentSupply;
    address owner;

    Issue[] public issues;
    uint256 public issueCount;

    struct Issue {
      string name;
      string description;
      uint256 balance;
      address owner;
    }

    constructor() public {
      owner = msg.sender;
      currentSupply = 10;
      issueCount = 0;
    }

    function transfer(address receiver, uint256 amount) public
    checkBalance(amount)
    {
      balances[msg.sender] -= amount;
      balances[receiver] += amount;
      emit Transfer(msg.sender, receiver);
    }

    function register(address citizen) public {
      balances[citizen] = 0;
      citizens.push(citizen);
      citizenCount += 1;
    }

    function distribute()
    public
    onlyOwner
    {
      uint index;
      for (index = 0; index < citizens.length; index++) {
        balances[citizens[index]] = 1;
        currentSupply -= 1;
        emit Distribution(citizens[index], balances[citizens[index]], currentSupply);
      }
    }

    function reset() public {
      uint index;
      for (index = 0; index < citizens.length; index++) {
        balances[citizens[index]] = 0;
      }

      for (index = 0; index < issues.length; index++) {
        issues[index].balance = 0;
      }
      currentSupply = 1000000;
      emit Reset(currentSupply);
    }

    function newIssue(string memory issueName, string memory description, address owner) public {
      issues.push(Issue(issueName, description, 0, owner));
      issueCount += 1;
      emit NewIssue();
    }

    function vote(uint256 id, uint256 amount) public
      checkBalance(amount)
    {
      balances[msg.sender] -= amount;
      issues[id].balance += amount;
    }
    
    event Transfer (address sender, address receiver);
    event Distribution(address citizen, uint256 balance, uint256 currentSupply);
    event Reset (uint currentSupply);
    event NewIssue ();

    modifier onlyOwner() {require(msg.sender == owner, "Only the host can use this function"); _;}
    modifier checkBalance(uint256 amount) {
      require(
        balances[msg.sender] >= amount,
        "Transfer amount must be greater or equal to the balance of the address"
      );
      _;
    }
}
