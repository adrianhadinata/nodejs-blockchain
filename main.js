let BlockChain = require("./blockchain/BlockChain");
let hash = require("object-hash");
let blockChain = new BlockChain();
let PROOF = 1000;

let isValidProof = (proof) => {
  let guessHash = hash(proof);
  console.log("Hashing: ", guessHash);
  return guessHash == hash(PROOF);
};

// Make sure the new block is valid before creating it
let proofOfWork = () => {
  let proof = 0;

  while (true) {
    if (!isValidProof(proof)) {
      proof++;
    } else {
      console.log("Found a valid proof");
      break;
    }
  }

  return proof;
};

if (proofOfWork() == PROOF) {
  blockChain.addNewTransaction("Adrian", "Hadi", 1000);

  // Check genesis block
  let previousHash = blockChain.getLastBlock()
    ? blockChain.getLastBlock().hash
    : null;
  blockChain.addNewBlock(previousHash);
}

console.log("Chain: ", blockChain.chain);
