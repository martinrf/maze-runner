const math = require('mathjs');
const MazeNode = require('./mazeNode');

class MazeRunner{

    constructor(matrix, startPosition, sequence = 'CCC-DDD-EEE-DDD', blocker = 'A', startBlock = 'B', endBlock = 'B') {
        this.matrix = matrix;
        const size = math.size(this.matrix).toArray();
        this.n = size[0];
        this.m = size[1];
        this.setStartPoint(startPosition);
        this.startBlock = new MazeNode(startPosition[0], startPosition[1], startBlock);
        this.endBlock = new MazeNode(null, null, endBlock);
        this.BLOCKER = blocker;
        this.route = [];
        this.sequence = `${sequence.split('-').join('')}`;
        this.visited = [];
        this.canMove = true;
        this.solution = false;
    }

    visitedNode(i, j){
        return !this.visited.find(x => x.i === i && x.j === j);
    }

    limitDown(){
        return this.start.i + 1 < this.n;
    }

    limitUp(){
        return this.start.i - 1 >= 0;
    }

    limitRight(){
        return this.start.j + 1 < this.m;
    }

    limitLeft(){
        return this.start.j - 1 >= 0;
    }

    isDestinationValid(i, j){
        return this.BLOCKER !== this.matrix.get([i, j]);
    }

    isDestinationSolution(i, j){
        if (this.endBlock.value === this.matrix.get([i, j]) && !(this.startBlock.i === i && this.startBlock.j === j)) {
            this.endBlock.i = i;
            this.endBlock.j = j;
            this.route.push(this.endBlock);
            this.solution = true;
            return true;
        }
        return false;
    }
    reorderSequence(seq){
        const start = this.sequence.indexOf(seq);
        this.sequence = `${this.sequence.substring(start, this.sequence.length)}${this.sequence.substring(0, start)}`;
    }

    isInSequence(i, j){
        const destination = this.matrix.get([i, j]);
        const solutionValues = this.route.map((e) => { if (e.value !== this.startBlock.value) return e.value; }).join('');
        let seq = `${solutionValues}${destination}`;
        if (seq.length === 4){
            this.reorderSequence(seq);
        }
        if(seq.length <= this.sequence.length){
            if (this.sequence.indexOf(seq) > -1){
                return true;
            }
        }else{
            while(seq.indexOf(this.sequence) > -1){
                seq = seq.substring(this.sequence.length, seq.length);
            }
            if (this.sequence.indexOf(seq) > -1){
                return true;
            }
        }
        return false;
    }

    destinationValueInCorrectSequence(i, j){
        if (this.start.value === this.startBlock.value){
            const destination = this.matrix.get([i, j]);
            if (this.sequence.indexOf(destination) > -1){
                return true;
            }
        }else{
            return this.isInSequence(i, j);
        }
        return false;
    }

    canMoveTo(i, j){
        if (this.isDestinationSolution(i, j)) return true;
        if (!this.isDestinationValid(i, j)) return false;
        if (!this.visitedNode(i, j)) return false;
        if (!this.destinationValueInCorrectSequence(i, j)) return false;
        return true;
    }

    canMoveDown(){
        const i = this.start.i + 1;
        const j = this.start.j;
        if (!this.limitDown(i, j)) return false;
        return this.canMoveTo(i, j);
    }

    canMoveRight(){
        const i = this.start.i;
        const j = this.start.j + 1;
        if (!this.limitRight(i, j)) return false;
        return this.canMoveTo(i, j);
    }

    canMoveUp(){
        const i = this.start.i - 1;
        const j = this.start.j;
        if (!this.limitUp(i, j)) return false;
        return this.canMoveTo(i, j);
    }

    canMoveLeft(){
        const i = this.start.i;
        const j = this.start.j - 1;
        if (!this.limitLeft(i, j)) return false;
        return this.canMoveTo(i, j);
    }

    moveDown(){
        return [this.start.i + 1, this.start.j];
    }

    moveUp(){
        return [this.start.i - 1, this.start.j];
    }

    moveLeft(){
        return [this.start.i, this.start.j - 1];
    }

    moveRight(){
        return [this.start.i, this.start.j + 1];
    }

    setStartPoint(start){
        this.start = new MazeNode(start[0], start[1], this.matrix.get(start));
    }

    resolveMaze(){
        this.route.push(this.start);
        this.visited.push(this.start);

        while(!this.solution && this.canMove){
            if (this.canMoveDown() && !this.solution){
                this.setStartPoint(this.moveDown());
                return this.resolveMaze();
            }
            if (this.canMoveRight() && !this.solution){
                this.setStartPoint(this.moveRight());
                return this.resolveMaze();
            }
            if (this.canMoveLeft() && !this.solution){
                this.setStartPoint(this.moveLeft());
                return this.resolveMaze();
            }
            if (this.canMoveUp() && !this.solution){
                this.setStartPoint(this.moveUp());
                return this.resolveMaze();
            }

            if (!this.solution && this.route.length >= 2){
                this.route.pop();
                this.start = this.route[this.route.length - 1];
                this.route.pop();
                return this.resolveMaze();
            }else {
                this.canMove = false;
            }
        }
        return this.route;
    }
}

module.exports = MazeRunner;
