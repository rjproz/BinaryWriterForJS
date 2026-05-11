const BinaryWriter = require("./BinaryWriter");

class BinaryWriterPool {
  constructor(initialSize = 50) {
    this.pool = [];

    for (let i = 0; i < initialSize; i++) {
      this.pool.push(new BinaryWriter());
    }
  }

  acquire() {
    if (this.pool.length > 0) {
      return this.pool.pop();
    }

    // fallback: create new if pool empty
    return new BinaryWriter();
  }

  release(writer) {
    writer.reset();
    this.pool.push(writer);
  }
}

module.exports = BinaryWriterPool;