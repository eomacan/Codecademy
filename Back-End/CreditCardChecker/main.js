// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8];
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9];
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6];
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5];
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6];

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5];
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3];
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4];
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5];
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4];

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4];
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9];
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3];
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3];
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3];

// An array of all the arrays above
const batch = [
  valid1,
  valid2,
  valid3,
  valid4,
  valid5,
  invalid1,
  invalid2,
  invalid3,
  invalid4,
  invalid5,
  mystery1,
  mystery2,
  mystery3,
  mystery4,
  mystery5,
];

// Add your functions below:
function validateCred(card) {
  let x = 0;
  let checkSum = card.reduceRight((a, c) => {
    // Calculate check sum from right to left. Start with Accumulator (a) = the check(last) digit.
    let c2 = x % 2 === 0 ? 2 * c : c; // Double every second digit.
    c2 = c2 > 9 ? c2 - 9 : c2; // Reduce by 9 if > 9

    x++; // Next Digit.

    return a + c2; // Accumulate Check Sum
  });

  console.log(
    `Num Digits = ${x}, Check Sum = ${checkSum}, Mod 10 = ${checkSum % 10}`
  );

  return checkSum % 10 === 0; // Valid if Mod 10 = 0
}

function findInvalidCards(cardBatch) {
  let isValid;
  let invalidCards = [];

  cardBatch.forEach((card, seq) => {
    console.log(`Checking Card No : ${card}`);
    isValid = validateCred(card);
    console.log(`Card Seq : ${seq + 1}, Valid = ${isValid}\n`);
    if (!isValid) {
      invalidCards.push(card);
    }
  });

  return invalidCards;
}

const cardCompanies = [];

cardCompanies[3] = 'Amex (American Express)';
cardCompanies[4] = 'Visa';
cardCompanies[5] = 'Mastercard';
cardCompanies[6] = 'Discover';

function invalidCardCompanies(cards) {
    const companies = {};
    let companyId, companyName;

    cards.forEach(card => {
        companyId = card[0];
        companyName = cardCompanies[companyId];
        if (companyName) {
            if (companies[companyName]) {
                companies[companyName]++;
            } else {
                companies[companyName] = 1;
            }

        } else {
            console.log(`Company not found. Company Id : ${companyId}`);
        }
    });

    console.log(companies);
    console.log(typeof companies);

    return Object.keys(companies);
}

let invalidCards = findInvalidCards(batch);
console.log(`${invalidCards.length} Invalid Cards\n${invalidCards.join("\n")}`);

console.log(invalidCardCompanies(invalidCards));