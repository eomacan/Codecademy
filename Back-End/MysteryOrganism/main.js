const STRAND_LENGTH = 15;
const DNA_BASES = ['A', 'T', 'C', 'G'];
const BASE_COMPLEMENTS = {
  'A': 'T',
  'T': 'A',
  'C': 'G',
  'G': 'C'
};

// Generate Random Integer >= 0 and < maxInt
const randomInt = (maxInt) => {
  return Math.floor(Math.random() * maxInt);
}

// Returns a random DNA base
const returnRandBase = () => {
  return DNA_BASES[randomInt(4)];
};

// Returns a random single strand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < STRAND_LENGTH; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

// PAequror Object
const PAequor = {
  specimenNum: 0,
  dna: [],

  mutate() {
    let baseIdx = randomInt(STRAND_LENGTH);
    let baseFrom = this.dna[baseIdx];
    let baseTo;

    do {
      baseTo = returnRandBase();
    } while (baseFrom === baseTo);   // find a different base to mutate to

    console.log(`Mutating specimen #${this.specimenNum} DNA base ${baseFrom} @${baseIdx} to ${baseTo}`);

    this.dna[baseIdx] = baseTo;

    return this.dna;
  },

  compareDNA(pa) {  // compare dna with another paequor.
    let dna1 = this.dna;
    let dna2 = pa.dna;
    let strandLen = dna1.length;
    let cmnNum = 0;
    let cmnPrc = 0

    if (this.specimenNum === pa.specimenNum) {
      console.log(`No need to compare specimen with itself. :)`);
      return;
    }

    if (dna1.length !== dna2.length) {
      console.log(`Can't compare DNA strands with different lengths.`);
      return;
    }


    for (let i = 0; i < strandLen; i++) {
      if (dna1[i] === dna2[i]) {
        cmnNum += 1;
      }
    } 

    cmnPrc = Math.round(cmnNum / strandLen * 100);

    console.log(`Specimen #${this.specimenNum} and specimen #${pa.specimenNum} have ${cmnPrc}% DNA in common`);
  },

  willLikelySurvive () {
    let numCG = 0;
    let likeliness;
    this.dna.forEach(e => {

      if (e === 'C' || e === 'G') 
        numCG++;
    });

    likeliness = Math.round(numCG / this.dna.length * 10000) / 100;  

    // console.log(`Specimen #${this.specimenNum} has ${numCG} 'C' or 'G's out of ${this.dna.length} elements.\nIts likeliness to survive is ${likeliness}%.`);
    return likeliness >= 60.0;
  },

  complementStrand() {
    return this.dna.map(e => BASE_COMPLEMENTS[e]);
  },

  toString() {
    return `{ specimenNum: ${this.specimenNum}, dna: [${this.dna}] }`;
//    return this.specimenNum.toString() + ' ' + this.dna.toString();
  }

};

function pAequorFactory(specimenNum, dna) {
  let pa = Object.create(PAequor);

  pa.specimenNum = specimenNum;
  pa.dna = dna;

  return pa;
}

function createSpeciesLikelyToSurvive(batchSize) {
  let batch = [];
  let pa;

  console.log(`Create a batch of ${batchSize} specie DNAs likely to survive.`);

  for (let i = 0; i < batchSize; i++) {
    
    do {
      pa = pAequorFactory(i+1, mockUpStrand(STRAND_LENGTH));
    } while (!pa.willLikelySurvive());
    
    // console.log(pa.toString());

    batch.push(pa);
  }

  return batch;
}

// Testing codes to be deleted from the final project

// console.log(mockUpStrand());

const pa1 = pAequorFactory(1, mockUpStrand(STRAND_LENGTH));
const pa2 = pAequorFactory(2, mockUpStrand(STRAND_LENGTH));

console.log(pa1.toString());
console.log(pa2.toString());

pa1.mutate();

console.log(pa1.toString());
console.log(pa2.toString());

pa1.compareDNA(pa1);
pa1.compareDNA(pa2);

pa1.willLikelySurvive();
pa2.willLikelySurvive();

// const paBatch = createSpeciesLikelyToSurvive(30);
// console.log(paBatch.join('\n'));

console.log(pa1.complementStrand());

