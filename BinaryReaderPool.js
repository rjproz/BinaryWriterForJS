const BinaryReader = require("./BinaryReader");

class BinaryReaderPool {
  constructor(initialSize = 50) {
    this.pool = [];

    for (let i = 0; i < initialSize; i++) {
      this.pool.push(new BinaryReader());
    }
  }

  acquire(buffer) {
    let reader;

    if (this.pool.length > 0) {
      reader = this.pool.pop();
    } else {
      reader = new BinaryReader();
    }

    reader.reset(buffer);
    return reader;
  }

  release(reader) {
    reader.buffer = null; // avoid accidental retention
    reader.offset = 0;
    this.pool.push(reader);
  }
}

module.exports = BinaryReaderPool;