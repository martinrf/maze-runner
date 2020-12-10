fs = require('fs');
const math = require('mathjs');
const MazeRunner = require('./src/mazeRunner');
const myArgs = process.argv.slice(2);
const mazeName = myArgs[0];
fs.readFile(`./maze-collection/${mazeName}`, 'utf8', function (err,data) {
    if (err) {
        return console.log(err);
    }
    let matrix = [];
    let start = [];
    for(let row of data.split('\r\n')){
        if (start.length === 0){
            start = row.split(' ').map((x) => { return parseInt(x) });

        }else{
            if(row.trim()){
                matrix.push(row.split(' '));
            }
        }
    }
    const runner = new MazeRunner(math.matrix(matrix), start);
    const route = runner.resolveMaze()
    let output = {
        matrix,
        route
    };

    console.log(`Found a solution: ${runner.solution}`);
    fs.writeFile(`./maze-collection/solutions/${mazeName}`, `${JSON.stringify(output, null, 4)}`, function (err,data) {
        if (err) {
            return console.log(err);
        }
        console.log(`Maze solution can be found in /solutions/${mazeName}`);
    });
});
