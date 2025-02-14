// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

const PAequor = {
  specimenNum: 0,
  dna: [],

  mutate() {
    let baseFrom = returnRandBase();
    let baseTo;

    do {
      baseTo = returnRandBase();
    } while (baseFrom === baseTo);   // find a different base to mutate to

    console.log(`Mutating specimen #${this.specimenNum} DNA base ${baseFrom}s to ${baseTo}s.`);

    let dna = this.dna;

    dna.forEach((e, i) => {
      if (e === baseFrom) {
        dna[i] = baseTo;
      }
    });

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
    
  }
  
};

function pAequorFactory(specimenNum, dna) {
  let pa = Object.create(PAequor);

  pa.specimenNum = specimenNum;
  pa.dna = dna;

  return pa;
}


// Testing codes to be deleted from the final project


// console.log(mockUpStrand());

const pa1 = pAequorFactory(1, mockUpStrand());
const pa2 = pAequorFactory(2, mockUpStrand());

console.log(pa1.specimenNum, pa1.dna);
console.log(pa2.specimenNum, pa2.dna);

pa1.mutate();

console.log(pa1.specimenNum, pa1.dna);
console.log(pa2.specimenNum, pa2.dna);

pa1.compareDNA(pa2);




