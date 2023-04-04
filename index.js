const hash = require('crypto-js/sha256');

class Block {
	constructor(preHash, data) {
		this.preHash = preHash;
		this.data = data;
		this.timeStamp = new Date();

		this.hash = this.calculateHash();
		this.mineVar = 0;
	}

	calculateHash() {
		return hash(this.preHash + JSON.stringify(this.data) + this.timeStamp + this.mineVar).toString();
	}

	mine(difficulty) {
		while (!this.hash.startsWith('0'.repeat(difficulty))) {
			this.mineVar++;
			this.hash = this.calculateHash();
		}
	}
}

class BlockChain {
	constructor(difficulty = 5) {
		const genesisBlock = new Block('0000', {
			isGenesis: true
		});

		this.difficulty = difficulty;
		this.chain = [genesisBlock];
	}

	getLastBlock() {
		return this.chain[this.chain.length - 1];
	}

	addBlock(data) {
		const lastBlock = this.getLastBlock();
		const newBlock = new Block(lastBlock.hash, data);

		console.log('start mining');
		console.time('mine');
		newBlock.mine(this.difficulty);
		console.timeEnd('mine');
		console.log('end mining', newBlock);

		this.chain.push(newBlock);
	}

	isValid() {
		for (let i = 1; i < this.chain.length; i++) {
			const preBlock = this.chain[i - 1];
			const currentBlock = this.chain[i];

			if (currentBlock.preHash !== preBlock.hash) return false;
			if (currentBlock.hash !== currentBlock.calculateHash()) return false;

			return true;
		}
	}
}

const blockChain = new BlockChain();
console.log(blockChain);

blockChain.addBlock({
	from: 'Hung',
	to: 'abc',
	vnd: 100
});

blockChain.addBlock({
	from: 'Hung',
	to: 'abc',
	vnd: 200
});

blockChain.addBlock({
	from: 'Hung',
	to: 'abc',
	vnd: 150
});

blockChain.addBlock({
	from: 'Hung',
	to: 'abc',
	vnd: 300
});
