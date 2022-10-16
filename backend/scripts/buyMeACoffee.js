const hre = require("hardhat");

//Helper function
// Returns the Ether balance of the given address.
async function getBalance(address) {
  const balanceBigInt = await hre.ethers.provider.getBalance(address);
  return hre.ethers.utils.formatEther(balanceBigInt);
}

//Helper function
//Logs the Ether balances of a list of addresses.
async function printBalances(addresses) {
  let idx = 0;
  for (const address of addresses) {
    console.log(`Address ${idx} balance :`, await getBalance(address));
    idx++;
  }
}

//Logs the memos stored on-chain from coffee purchases.
async function printMemos(memos) {
  for (const memo of memos) {
    const timestamp = memo.timestamp;
    const tipper = memo.name;
    const tipperAddress = memo.name;
    const message = memo.message;
    console.log(`At ${timestamp}, ${tipper} (${tipperAddress}) said : "${message}"`);
  }
}

async function main() {
  //Get example account
  const [owner, tipper, tipper2, tipper3] = await hre.ethers.getSigners();

  //Get the contract to deploy and deploy
  const BuyMeACoffee = await hre.ethers.getContractFactory("BuyMeACoffee");
  const buyMeACoffee = await BuyMeACoffee.deploy();
  await buyMeACoffee.deployed();
  console.log("BuyMeACoffee contract deployed to", buyMeACoffee.address);

  //Check the balance before coffee purchase
  const addresses = [owner.address, tipper.address, buyMeACoffee.address];
  await printBalances(addresses);

  // Buy the owner a few coffees.
  const tip = { value: hre.ethers.utils.parseEther("1") };
  await buyMeACoffee.connect(tipper).buyCoffee("Loki", "message 1 from Loki", tip);
  await buyMeACoffee.connect(tipper2).buyCoffee("Yadav", "message 2 from yadav", tip);
  await buyMeACoffee.connect(tipper3).buyCoffee("Samir", "message 3 from samir", tip);

  // Check balances after the coffee purchase.
  console.log("== bought coffee ==");
  await printBalances(addresses);

  // Withdraw.
  await buyMeACoffee.connect(owner).withdrawTips();

  // Check balances after withdrawal.
  console.log("== withdrawTips ==");
  await printBalances(addresses);

  // Check out the memos.
  console.log("== memos ==");
  const memos = await buyMeACoffee.getMemos();
  printMemos(memos);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
