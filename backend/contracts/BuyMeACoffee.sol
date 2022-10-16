// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract BuyMeACoffee {
    //event to emit when the memo is created
    event NewMemo(
        address indexed from,
        uint256 timestamp,
        string name,
        string message
    );
    //indexed makes easier to search addresses

    //memo struct
    struct Memo {
        address from;
        uint256 timestamp;
        string name;
        string message;
    }

    //List of all memos received from friends .list of the Memo struct inside the memos
    Memo[] memos;

    //state variable payable means we can pay to this address
    //this is the addres of the contract deployer /owner
    address payable owner;

    //constructor runs only one time while the contract is being deployed
    constructor() {
        owner = payable(msg.sender); //when I deploy the contract my metamask wallet address is the owner and can receive the amount
    }

    /**
     * @dev buy a coffee for the contract owner
     * @param _name name of the coffee buyer
     * @param _message a message from the coffee buyer
     */
    function buyCoffee(string memory _name, string memory _message)
        public
        payable
    {
        require(msg.value > 0, "Cannot buy a coffee with 0 ether ");
        //if condition success create a new memo
        //New memo is created lets save it in to memos array
        memos.push(
            //this is our memo
            Memo(
                msg.sender, //who invoked this function
                block.timestamp,
                _name,
                _message
            )
        );
        //emit the event when the ne memo is created
        emit NewMemo(msg.sender, block.timestamp, _name, _message);
    }

    //Note all the balance get stored in balance and the owner can withdraw it

    /**
     * @dev send the entire balance stored in the contract to the owner
     */
    function withdrawTips() public {
        //actually the balance is stored in ths balance variable of this contract address
        address(this).balance; //this is whwere balance is stored
        require(owner.send(address(this).balance)); //sending the balance to the owner only
        //this is public function so anyone cal call it but we have given the require condition so only the
    }

    /**
     * @dev get all the momos stored on the blockchain
     */
    //it doesnot change any state on the blockchain so we use view so that it saves the gas
    function getMemos() public view returns (Memo[] memory) {
        return memos;
    }
}
