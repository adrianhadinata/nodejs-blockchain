let hash = require("object-hash");

const TARGET_HASH = hash(1000);

module.exports.isValidProof = (proof) => {
  let guessHash = hash(proof);

  //   console.log("Hashing: ", guessHash);
  return guessHash == TARGET_HASH;
};

module.exports.proofOfWork = () => {
  let proof = 0;
  while (true) {
    if (!module.exports.isValidProof(proof)) {
      proof++;
    } else {
      console.log("Found a valid proof");
      break;
    }
  }

  return hash(proof);
};
