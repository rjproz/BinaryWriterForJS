class BinaryReader {
  constructor() {
    this.buffer = null;
    this.offset = 0;
  }

  reset(buffer) {
    this.buffer = buffer;
    this.offset = 0;
  }


  readByte() {
    const val = this.buffer.readUInt8(this.offset);
    this.offset += 1;
    return val;
  }

  readShort() {
    const val = this.buffer.readInt16LE(this.offset);
    this.offset += 2;
    return val;
  }

  readUShort() {
    const val = this.buffer.readUInt16LE(this.offset);
    this.offset += 2;
    return val;
  }

  readInt() {
    const val = this.buffer.readInt32LE(this.offset);
    this.offset += 4;
    return val;
  }

  readUInt() {
    const val = this.buffer.readUInt32LE(this.offset);
    this.offset += 4;
    return val;
  }

  readLong() {
    const val = this.buffer.readBigInt64LE(this.offset);
    this.offset += 8;
    return val;
  }

  readULong() {
    const val = this.buffer.readBigUInt64LE(this.offset);
    this.offset += 8;
    return val;
  }

  readFloat() {
    const val = this.buffer.readFloatLE(this.offset);
    this.offset += 4;
    return val;
  }

  readString() {
    const length = this.readInt();
    const str = this.buffer.toString("utf8", this.offset, this.offset + length);
    this.offset += length;
    return str;
  }

  getRemainingBuffer() {
    return this.buffer.subarray(this.offset);
  }
}

module.exports = BinaryReader;
