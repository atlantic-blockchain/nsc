pragma solidity ^0.5.0;
contract SimpleStorage {

    uint public storedData;

    event Change(string message, uint newVal);

    constructor() public {
        storedData = 1;
    }

    function set(uint x) public {
        emit Change("set", x);
        storedData = x;
    }

    function get() view public returns (uint retVal) {
        return storedData;
    }

}
