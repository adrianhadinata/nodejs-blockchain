// let database = require("./src/config/database");
const { connectToDatabase } = require("./src/config/database");

// Call the function to establish the connection
(async () => {
  const isConnected = await connectToDatabase();

  if (isConnected) {
    console.log("Connection successful, proceed with the rest of the app.");
    // Your application logic here

    let BlockChain = require("./src/controllers/BlockChain");
    let hash = require("object-hash");

    const TARGET_HASH = 1000;

    let blockChain = new BlockChain();

    blockChain.addNewTransaction("Adrian", "Hadi", 200);
    blockChain.addNewBlock(null);

    console.log("Chain: ", blockChain.chain);
  } else {
    console.error("Failed to connect to the database, exiting...");
    process.exit(1); // Exit the app if the connection fails
  }
})();

/* ================================================== */
// database.onConnect(() => {
//   let BlockChain = require("./src/controllers/BlockChain");
//   let hash = require("object-hash");

//   const TARGET_HASH = 1000;

//   let blockChain = new BlockChain();

//   blockChain.addNewTransaction("Adrian", "Hadi", 200);
//   blockChain.addNewBlock(null);

//   console.log("Chain: ", blockChain.chain);
// });

// let isValidProof = (proof) => {
//   let guessHash = hash(proof);
//   console.log("Hashing: ", guessHash);
//   return guessHash == hash(TARGET_HASH);
// };

// Make sure the new block is valid before creating it
// let proofOfWork = () => {
//   let proof = 0;

//   while (true) {
//     if (!isValidProof(proof)) {
//       proof++;
//     } else {
//       console.log("Found a valid proof");
//       break;
//     }
//   }

//   return proof;
// };

// if (proofOfWork() == TARGET_HASH) {
//   blockChain.addNewTransaction("Adrian", "Hadi", 1000);

//   // Check genesis block
//   let previousHash = blockChain.getLastBlock()
//     ? blockChain.getLastBlock().hash
//     : null;
//   blockChain.addNewBlock(previousHash);
// }

/* ================================================== */
