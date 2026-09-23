import { network } from "hardhat";

const { ethers } = await network.connect();

const address = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

const code = await ethers.provider.getCode(address);

console.log("RPC: http://127.0.0.1:8545");
console.log("Contract:", address);
console.log("Bytecode length:", code.length);
console.log("Has contract:", code !== "0x");

await network.disconnect();