//SPDX-License-Identifier: UNLICENSE
pragma solidity ^0.8.9;

contract BuyMeACoffee {
    // Event to emit when a Memo is created.
    event NewMemo(
        address indexed from,
        string name,
        string message,
        uint256 timestamp
    );
    //indexed means search for index in this event

    // Memo structure
    struct Memo {
        address from; //address of sender
        string name; // name of sender
        string message;
        uint256 timestamp;
    }

    // address of the contract deployer which is payable
    address payable owner;

    // List of all memos of type Memo struct.
    Memo[] memos;

    constructor() {
        owner = payable(msg.sender);
    }

    // get all memos
    function getMemos() public view returns (Memo[] memory) {
        return memos;
    }

    // buy a coffee
    function buyCoffee(string memory _name, string memory _message)
        public
        payable
    {
        require(msg.value > 0, "can't buy coffee for free!");
        memos.push(Memo(msg.sender, _name, _message, block.timestamp));
        // here msg.sender is the one who buys the coffee
        emit NewMemo(msg.sender, _name, _message, block.timestamp);
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    // owner can withdraw the amount
    function withdrawTips() public onlyOwner {
        require(owner.send(address(this).balance));
    }
}
