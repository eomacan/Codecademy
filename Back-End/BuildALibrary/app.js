class Media {
    constructor(creator, title) {
        this._creator = creator;
        this._title = title;
        this._isCheckedOut = false;
        this._ratings = [];
    }

    get creator() {
        return this._creator;
    }

    set creator(creator) {
        this._creator = creator;
    }

    get title() {
        return this._title;
    }

    set title(title) {
        this._title = title;
    }

    get isCheckedOut() {
        return this._isCheckedOut;
    }

    set isCheckedOut(isCheckedOut) {
        this._isCheckedOut = isCheckedOut;
    }

    get ratings() {
        return this._ratings;
    }

    set ratings(ratings) {
        this._ratings = ratings;
    }

    toggleCheckOutStatus() {
        this._isCheckedOut = !this._isCheckedOut;
    }

    addRating(rating) {
        if (rating >= 1 && rating <= 5) {
            this._ratings.push(rating);
        } else {
            throw Error('Rating has to be between 1 and 5');
        }
    }

    getAverageRating() {
        let sumRatings = this._ratings.reduce((acc, curr) => {
            return acc + curr;
        });

        return sumRatings / this.ratings.length;
    }
}
  
class Book extends Media {
    constructor (author, title, pages) {
        super(author, title);
        this._pages = pages;
    }

    get author() {
        return this.creator;
    }

    set author(author) {
        this.creator = author;
    }

    get pages() {
        return this._pages;
    }

    set pages(pages) {
        this._pages = pages;
    }
}

class Movie extends Media {
    constructor(director, title, runTime) {
        super(director, title);
        this._runTime = runTime;
    }

    get director() {
        return this.creator;
    }

    set director(director) {
        this.creator = director;
    }

    get runTime() {
        return this._runTime;
    }

    set runtime(runTime) {
        this._runTime = runtime;
    }
}
  
class CD extends Media {
    constructor(artist, title, songs) {
        super(artist, title);
        this._songs = songs;
    }

    get artist() {
        return this.creator;
    }

    set artist(artist) {
        this.creator = artist;
    }

    get songs() {
        return this._songs;
    }

    set songs(songs) {
        this._songs = songs;
    }

    shuffle() {
        return this.songs;
    }
}

const historyOfEverything = new Book('Bill Bryson', 'A Short History of Nearly Everything', 544);

historyOfEverything.toggleCheckOutStatus();
console.log(historyOfEverything.isCheckedOut);

historyOfEverything.addRating(4);
historyOfEverything.addRating(5);
historyOfEverything.addRating(5);

console.log(historyOfEverything.getAverageRating());

const speed = new Movie('Jan de Bont', 'Speed', 116);

speed.toggleCheckOutStatus();
console.log(speed.isCheckedOut);

speed.addRating(1);
speed.addRating(1);
speed.addRating(5);

console.log(speed.getAverageRating());

