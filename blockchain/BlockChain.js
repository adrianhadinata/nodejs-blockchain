let hash = require("object-hash");

class BlockChain {
  constructor() {
    // Create new chain
    this.chain = [];

    // Transactions
    this.current_transaction = [];
  }

  // Create new block
  addNewBlock(previousHash) {
    let block = {
      index: this.chain.length + 1,
      timestamp: Date.now(),
      transactions: this.current_transaction,
      previousHash: previousHash,
    };

    // Hashing the block
    this.hash = hash(block);

    // Add to chain
    this.chain.push(block);

    // Reset current transaction
    this.current_transaction = [];

    return block;
  }

  // Create new transaction
  addNewTransaction(sender, recipient, amount) {
    this.current_transaction.push({
      sender: sender,
      recipient: recipient,
      amount: amount,
    });
  }

  // Get last block on chain
  getLastBlock() {
    return this.chain.slice(-1)[0];
  }

  // Is block empty?
  isEmpty() {
    return this.chain.length === 0;
  }
}

module.exports = BlockChain;
