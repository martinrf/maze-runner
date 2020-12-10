class MazeNode {
    /***
     * Represents a Node in the Maze
     * @param i
     * @param j
     * @param value
     */
    constructor (i, j, value = null){
        this.i = i;
        this.j = j;
        this.value = value;
    }
}

module.exports = MazeNode;
