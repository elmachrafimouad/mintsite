const hre = require("hardhat");

async function main() {

  const DeGodsYachtClub = await hre.ethers.getContractFactory("DeGodsYachtClub");
  const degodsyachtclub = await DeGodsYachtClub.deploy();

  await degodsyachtclub.deployed();

  console.log("DeGodsYachtClub deployed to:", degodsyachtclub.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
