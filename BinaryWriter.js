class BinaryWriter {
  constructor(size = 256) {
    this.buffer = Buffer.allocUnsafe(size);
    this.offset = 0;
  }

  reset() {
    this.offset = 0;
  }

  ensure(size) {
    if (this.offset + size > this.buffer.length) {
      const newBuffer = Buffer.allocUnsafe(this.buffer.length * 2);
      this.buffer.copy(newBuffer);
      this.buffer = newBuffer;
    }
  }


  writeByte(value) {
    this.ensure(1);
    this.buffer.writeUInt8(value, this.offset);
    this.offset += 1;
  }

  writeShort(value) {
    this.ensure(2);
    this.buffer.writeInt16LE(value, this.offset);
    this.offset += 2;
  }

  writeUShort(value) {
    this.ensure(2);
    this.buffer.writeUInt16LE(value, this.offset);
    this.offset += 2;
  }

  writeInt(value) {
    this.ensure(4);
    this.buffer.writeInt32LE(value, this.offset);
    this.offset += 4;
  }

  writeUInt(value) {
    this.ensure(4);
    this.buffer.writeUInt32LE(value, this.offset);
    this.offset += 4;
  }

  writeLong(value) {
    this.ensure(8);
    this.buffer.writeBigInt64LE(BigInt(value), this.offset);
    this.offset += 8;
  }

  writeULong(value) {
    this.ensure(8);
    this.buffer.writeBigUInt64LE(BigInt(value), this.offset);
    this.offset += 8;
  }

  writeFloat(value) {
    this.ensure(4);
    this.buffer.writeFloatLE(value, this.offset);
    this.offset += 4;
  }

  writeString(str) {
    const strBuf = Buffer.from(str, "utf8");
    this.writeInt(strBuf.length);
    this.ensure(strBuf.length);
    strBuf.copy(this.buffer, this.offset);
    this.offset += strBuf.length;
  }

  getBuffer() {
    return this.buffer.subarray(0, this.offset);
  }
}

module.exports = BinaryWriter;
