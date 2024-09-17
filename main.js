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
    (async () => {
      let getPreviousHash = await blockChain.getLastBlock();

      let previousHash = getPreviousHash ? getPreviousHash.hash : null;
      console.log("Detected previous hash: ", previousHash);
      blockChain.addNewBlock(previousHash);

      console.log("Chain: ", blockChain.chain);
    })();
  } else {
    console.error("Failed to connect to the database, exiting...");
    process.exit(1); // Exit the app if the connection fails
  }
})();
