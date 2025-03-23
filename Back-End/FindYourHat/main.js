const prompt = require('prompt-sync')({sigint: true});

const HAT = '^';
const HOLE = 'O';
const FIELD_CHAR = '░';
const PATH_CHAR = '*';

class Field {
    constructor(fldArray) {
        this._fldArray = fldArray;
    }  

    get width() {
        return this._fldArray[0].length;
    } 

    get height() {
        return this._fldArray.length;
    }

    getXY(x, y) {
        return this._fldArray[y][x];
    }

    setXY(x, y, value) {
        this._fldArray[y][x] = value;
    }
    // String representaipon of the field
    toString() {
        return this._fldArray.map(line => line.join('')).join('\n');
    }

    // print field
    print() {
        console.log(this.toString());
    };

    // Generates a new empty field (of FIELD_CHAR only) array filled of given width and height 
    static generateEmptyFieldArray(width, height) {
        const row = new Array(width).fill(FIELD_CHAR);   // Generate an array of <width> number of elements amd filled with <FIELD_CHAR>
        const fldArray = new Array(height);              // Generate an array of <height> number of elements. 

        while (height-- > 0) {
            fldArray[height] = row.slice();              // Fill every row with a seperate copy of <row>
        }

        return fldArray;
    }

    static randomXY(width, height) {
        const x = Math.floor(Math.random() * width);
        const y = Math.floor(Math.random() * height);

        return { x, y };
    }

    // Generates a new field array of <width> and <height> with a <holeRatio> ratio of Holes  
    static generateField(width, height, holeRatio) {
        let fldArray = Field.generateEmptyFieldArray(width, height);        // First generate an empty field array 
        
        let numCells = width * height;                                      // Total number of Cells in the field
        let numHoles = Math.round(numCells * holeRatio) + 1;                // Total number of Holes to be generated + 1 for the HAT

        while (numHoles > 0) {
            const { x, y } = Field.randomXY(width, height);                 // Generate random coordinates for the Hole to be placed
            if ((x + y) !== 0 && fldArray[y][x] !== HOLE) {                 // If not the starting point and not already has a Hole
                numHoles--;                                                 // Decrease Hole Counter                                   
                if (numHoles == 0) {                                        // If reached the last hole
                    fldArray[y][x] = HAT;                                   // Place the HAT
                }
                else {                                                      // Else 
                    fldArray[y][x] = HOLE;                                  // Place a HOLE
                }
            }
        }

        fldArray[0][0] = PATH_CHAR;                                         // Finally place the PATH_CHAR on the starting position.

        return new Field(fldArray);                                         // Return a new Field with the generated field array.
    }

}

class FindYourHat {
    constructor(field) {
        this._field = field;
        this._x = 0;
        this._y = 0;
        this._found = false;
    }

    get field() {
        return this._field;
    }

    get found() {
        return this._found;
    }

    set found(value) {
        this._found = value;
    }

    check() {
        const x = this._x;
        const y = this._y;

        if (x < 0 || x === this.field.width || y < 0 || y === this.field.height) {
            throw new Error('Sorry, you ran off the field.');
        } else {
            const xy = this.field.getXY(x, y);
            switch (xy) {
                case HOLE: 
                    throw new Error('Sorry, you fell down a hole.');
                    break;
                
                case HAT:
                    this.found = true;
                    break;

                default:
                    this.field.setXY(x, y, PATH_CHAR);
            }
        }

        return this.found;
    }

    moveUp() {
        this._y--;
        this.check();
    }

    moveDown() {
        this._y++;
        this.check();
    }

    moveLeft() {
        this._x--;
        this.check();
    }

    moveRight() {
        this._x++;
        this.check();
    }

    play() {
        let cmd;
        let quit = false;
        while (!quit) {
            try {
                console.log(this.field.toString());
                cmd = prompt('Which way? ').toLowerCase();
                switch (cmd) {
                    case 'u' : 
                        this.moveUp();
                        break;

                    case 'd' : 
                        this.moveDown();
                        break;

                    case 'l' : 
                        this.moveLeft();
                        break;

                    case 'r' : 
                        this.moveRight();
                        break;

                    case 'q' : 
                        quit = true;
                        break;

                    default :
                        console.log(`Invalid command: ${cmd}`);
                }

                if (this.found) {
                    console.log('Congrats! You found your hat.');
                    quit = true;
                }                
            } catch (err) {
                console.log(err.message);
                quit = true;
            }
        }

    }
}

const fldArray = [
    ['*', '░', '░', 'O', '░'],
    ['░', 'O', 'O', '░', '░'],
    ['░', '░', 'O', '░', '░'],
    ['░', '░', '░', 'O', '^'],
    ['O', 'O', '░', 'O', '░'],
    ['░', '░', '░', 'O', '░'],
    ['░', 'O', 'O', '░', '░'],
    ['░', '░', 'O', '░', 'O'],
    ['O', '░', '░', '░', '░'],
    ['O', '░', 'O', '░', 'O'],
    ['░', 'O', '░', '░', 'O']
  ];
// const field = new Field(fldArray);
  
const field = Field.generateField(10, 10, 0.20);
const game = new FindYourHat(field);
game.play();


