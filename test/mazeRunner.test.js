const MazeRunner = require('../src/mazeRunner');
const math = require('mathjs');

describe('Maze Runner Features', () => {
    describe('maze movement', () => {
        it('B maze cannot move anywhere', () =>{
            const matrix = math.matrix([
                ['A', 'B', 'A']
            ]);
            const runner = new MazeRunner(matrix, [0, 1]);
            const solution = runner.resolveMaze();
            const solutionValues = solution.map(e => e.value);
            expect(solutionValues).toStrictEqual([
                'B'
            ]);
            expect(runner.solution).toStrictEqual(false);
            expect(runner.canMove).toStrictEqual(false);
        });

        it('B maze blocked', () =>{
            const matrix = math.matrix([
                ['A', 'B', 'A'],
                ['A', 'A', 'A'],
                ['A', 'A', 'A'],
                ['A', 'A', 'A']
            ]);
            const runner = new MazeRunner(matrix, [0, 1]);
            const solution = runner.resolveMaze();
            const solutionValues = solution.map(e => e.value);
            expect(solutionValues).toStrictEqual([
                'B'
            ]);
            expect(runner.solution).toStrictEqual(false);
            expect(runner.canMove).toStrictEqual(false);
        });

        it('BCB maze with only one step', () =>{
            const matrix = math.matrix([
                ['A', 'B', 'A'],
                ['A', 'C', 'A'],
                ['A', 'B', 'A'],
                ['A', 'A', 'A']
            ]);
            const runner = new MazeRunner(matrix, [0, 1]);
            const solution = runner.resolveMaze();
            const solutionValues = solution.map(e => e.value);
            expect(solutionValues).toStrictEqual([
                'B',
                'C',
                'B'
            ]);
            expect(runner.solution).toStrictEqual(true);
            expect(runner.canMove).toStrictEqual(false);
        });

        it('BCCCB all down direction maze', () =>{
            const matrix = math.matrix([
                ['A', 'B', 'A', 'A', 'A'],
                ['A', 'C', 'A', 'A', 'A'],
                ['A', 'C', 'A', 'A', 'A'],
                ['A', 'C', 'A', 'A', 'A'],
                ['A', 'B', 'A', 'A', 'A'],
                ['A', 'A', 'A', 'A', 'A']
            ]);
            const runner = new MazeRunner(matrix, [0, 1]);
            const solution = runner.resolveMaze();
            const solutionValues = solution.map(e => e.value);
            expect(solutionValues).toStrictEqual([
                'B',
                'C',
                'C',
                'C',
                'B',
            ]);
            expect(runner.solution).toStrictEqual(true);
            expect(runner.canMove).toStrictEqual(false);
        });

        it('BCCCB all right direction maze in a line', () =>{
            const matrix = math.matrix([
                ['A', 'A', 'A', 'A', 'A'],
                ['A', 'A', 'A', 'A', 'A'],
                ['B', 'C', 'C', 'C', 'B'],
                ['A', 'A', 'A', 'A', 'A'],
                ['A', 'A', 'A', 'A', 'A']
            ]);
            const runner = new MazeRunner(matrix, [2, 0]);
            const solution = runner.resolveMaze();
            const solutionValues = solution.map(e => e.value);
            expect(solutionValues).toStrictEqual([
                'B',
                'C',
                'C',
                'C',
                'B',
            ]);
            expect(runner.solution).toStrictEqual(true);
            expect(runner.canMove).toStrictEqual(false);
        });

        it('BCCCB all left direction maze', () =>{
            const matrix = math.matrix([
                ['A', 'A', 'A', 'A', 'A'],
                ['A', 'A', 'A', 'A', 'A'],
                ['B', 'C', 'C', 'C', 'B'],
                ['A', 'A', 'A', 'A', 'A'],
                ['A', 'A', 'A', 'A', 'A']
            ]);
            const runner = new MazeRunner(matrix, [2, 4]);
            const solution = runner.resolveMaze();
            const solutionValues = solution.map(e => e.value);
            expect(solutionValues).toStrictEqual([
                'B',
                'C',
                'C',
                'C',
                'B',
            ]);
            expect(runner.solution).toStrictEqual(true);
            expect(runner.canMove).toStrictEqual(false);
        });

        it('BCCCB all up direction maze', () =>{
            const matrix = math.matrix([
                ['A', 'B', 'A', 'A', 'A'],
                ['A', 'C', 'A', 'A', 'A'],
                ['A', 'C', 'A', 'A', 'A'],
                ['A', 'C', 'A', 'A', 'A'],
                ['A', 'B', 'A', 'A', 'A']
            ]);
            const runner = new MazeRunner(matrix, [4, 1]);
            const solution = runner.resolveMaze();
            const solutionValues = solution.map(e => e.value);
            expect(solutionValues).toStrictEqual([
                'B',
                'C',
                'C',
                'C',
                'B',
            ]);
            expect(runner.solution).toStrictEqual(true);
            expect(runner.canMove).toStrictEqual(false);
        });

        it('BCCCB maze is all right direction but it has to backtrack from second C', () =>{
            const matrix = math.matrix([
                ['A', 'A', 'A', 'A', 'A'],
                ['B', 'C', 'C', 'C', 'B'],
                ['A', 'A', 'C', 'A', 'A'],
                ['A', 'A', 'A', 'A', 'A'],
                ['A', 'A', 'A', 'A', 'A'],
                ['A', 'A', 'A', 'A', 'A']
            ]);
            const runner = new MazeRunner(matrix, [1, 0]);
            const solution = runner.resolveMaze();
            const solutionValues = solution.map(e => e.value);
            expect(solutionValues).toStrictEqual([
                'B',
                'C',
                'C',
                'C',
                'B'
            ]);
            expect(runner.solution).toStrictEqual(true);
            expect(runner.canMove).toStrictEqual(false);
        });
    });

    describe('sequencing', () => {
        it('BCCCDDDB sequence CCC-DDD', () =>{
            const matrix = math.matrix([
                ['A', 'A', 'A', 'A', 'A', 'A', 'A', 'A'],
                ['B', 'C', 'C', 'C', 'D', 'D', 'D', 'B'],
                ['A', 'A', 'C', 'A', 'A', 'A', 'A', 'A'],
                ['A', 'A', 'C', 'A', 'A', 'A', 'A', 'A'],
                ['A', 'A', 'A', 'A', 'A', 'A', 'A', 'A'],
                ['A', 'A', 'A', 'A', 'A', 'A', 'A', 'A']
            ]);
            const runner = new MazeRunner(matrix, [1, 0]);
            const solution = runner.resolveMaze();
            const solutionValues = solution.map(e => e.value);
            expect(solutionValues).toStrictEqual([
                'B',
                'C',
                'C',
                'C',
                'D',
                'D',
                'D',
                'B'
            ]);
        });

        it('BCCCDDDEEEDDDCCCDDDEB sequence CCC-DDD-EEE-DDD', () =>{
            const matrix = math.matrix([
                ['A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A'],
                ['B', 'C', 'C', 'C', 'D', 'D', 'D', 'E', 'E', 'E', 'D', 'D', 'D', 'C', 'C', 'C', 'D', 'D', 'D', 'E', 'B'],
                ['A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A'],
            ]);
            const runner = new MazeRunner(matrix, [1, 0]);
            const solution = runner.resolveMaze();
            const solutionValues = solution.map(e => e.value);
            expect(solutionValues).toStrictEqual([
                'B',
                'C',
                'C',
                'C',
                'D',
                'D',
                'D',
                'E',
                'E',
                'E',
                'D',
                'D',
                'D',
                'C',
                'C',
                'C',
                'D',
                'D',
                'D',
                'E',
                'B'
            ]);
            expect(runner.solution).toStrictEqual(true);
            expect(runner.canMove).toStrictEqual(false);
        });

        it('BB sequence CCC-DDD-EEE-DDD', () =>{
            const matrix = math.matrix([
                ['A', 'A',],
                ['B', 'B',],
                ['A', 'A',]
            ]);
            const runner = new MazeRunner(matrix, [1, 0]);
            const solution = runner.resolveMaze();
            const solutionValues = solution.map(e => e.value);
            expect(solutionValues).toStrictEqual([
                'B',
                'B'
            ]);
            expect(runner.solution).toStrictEqual(true);
            expect(runner.canMove).toStrictEqual(false);
            expect(runner.endBlock.i).toStrictEqual(1);
            expect(runner.endBlock.j).toStrictEqual(1);
        });

        it('BCCCDB sequence CCC-DDD-EEE-DDD', () =>{
            const matrix = math.matrix([
                ['A', 'B', 'D', 'D', 'E', 'D'],
                ['C', 'D', 'A', 'E', 'E', 'D'],
                ['C', 'C', 'A', 'A', 'A', 'D'],
                ['C', 'D', 'A', 'A', 'A', 'C'],
                ['A', 'D', 'D', 'D', 'D', 'C'],
                ['A', 'D', 'E', 'A', 'C', 'C'],
                ['A', 'E', 'E', 'A', 'C', 'A'],
                ['A', 'A', 'A', 'A', 'C', 'A'],
                ['A', 'A', 'A', 'A', 'B', 'A']

            ]);
            const runner = new MazeRunner(matrix, [8, 4]);
            const solution = runner.resolveMaze();
            const solutionValues = solution.map(e => e.value);
            expect(solutionValues).toStrictEqual([
                'B',
                'C',
                'C',
                'C',
                'D',
                'D',
                'D',
                'E',
                'E',
                'E',
                'D',
                'D',
                'D',
                'C',
                'C',
                'C',
                'D',
                'B'
            ]);
            expect(runner.solution).toStrictEqual(true);
            expect(runner.canMove).toStrictEqual(false);
            expect(runner.endBlock.i).toStrictEqual(0);
            expect(runner.endBlock.j).toStrictEqual(1);
        });

        it('no solution not follow sequence CCC-DDD-EEE-DDD', () =>{
            const matrix = math.matrix([
                ['A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A'],
                ['B', 'C', 'C', 'C', 'D', 'D', 'D', 'E', 'E', 'E', 'D', 'D', 'D', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'B'],
                ['A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A'],
            ]);
            const runner = new MazeRunner(matrix, [1, 0]);
            const solution = runner.resolveMaze();
            const solutionValues = solution.map(e => e.value);
            expect(solutionValues).toStrictEqual([
                'B'
            ]);
            expect(runner.solution).toStrictEqual(false);
            expect(runner.canMove).toStrictEqual(false);
        });

        it('two full sequence CCC-DDD-EEE-DDD', () =>{
            const matrix = math.matrix([
                ['A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A'],
                ['B', 'C', 'C', 'C', 'D', 'D', 'D', 'E', 'E', 'E', 'D', 'D', 'D', 'C', 'C', 'C', 'D', 'D', 'D', 'E', 'B'],
                ['A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A'],
            ]);
            const runner = new MazeRunner(matrix, [1, 0]);
            const solution = runner.resolveMaze();
            const solutionValues = solution.map(e => e.value);
            expect(solutionValues).toStrictEqual([
                'B', 'C', 'C', 'C', 'D', 'D', 'D', 'E', 'E', 'E', 'D', 'D', 'D', 'C', 'C', 'C', 'D', 'D', 'D', 'E', 'B'
            ]);
            expect(runner.solution).toStrictEqual(true);
            expect(runner.canMove).toStrictEqual(false);
        });
    });

    describe('solving different mazes', () => {
        it('4x4-1.maze', () => {
            const matrix = math.matrix([
                ['A', 'B', 'A', 'A'],
                ['A', 'C', 'A', 'A'],
                ['A', 'C', 'C', 'A'],
                ['A', 'A', 'B', 'A'],

            ]);
            const runner = new MazeRunner(matrix, [3, 2]);
            const solution = runner.resolveMaze();
            const solutionValues = solution.map(e => e.value);
            expect(solutionValues).toStrictEqual([
                'B',
                'C',
                'C',
                'C',
                'B'
            ]);
            expect(runner.endBlock.i).toStrictEqual(0);
            expect(runner.endBlock.j).toStrictEqual(1);
        });

        it('4x4 bcccb maze', () => {
            const matrix = math.matrix([
                ['A', 'B', 'A', 'A'],
                ['A', 'C', 'A', 'A'],
                ['A', 'C', 'C', 'A'],
                ['A', 'A', 'B', 'A']
            ]);
            const runner = new MazeRunner(matrix, [0, 1]);
            const solution = runner.resolveMaze();
            const solutionValues = solution.map(e => e.value);
            expect(solutionValues).toStrictEqual([
                'B',
                'C',
                'C',
                'C',
                'B'
            ]);
            expect(runner.endBlock.i).toStrictEqual(3);
            expect(runner.endBlock.j).toStrictEqual(2);
        });

        it('12x12 maze', () => {
            const matrix = math.matrix([
                ['A', 'B', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A'],
                ['A', 'C', 'A', 'D', 'D', 'E', 'A', 'C', 'C', 'C', 'D', 'A'],
                ['A', 'C', 'C', 'D', 'A', 'E', 'A', 'D', 'A', 'D', 'A', 'A'],
                ['A', 'A', 'A', 'A', 'A', 'E', 'D', 'D', 'A', 'D', 'E', 'A'],
                ['A', 'C', 'C', 'D', 'D', 'D', 'A', 'A', 'A', 'A', 'E', 'A'],
                ['A', 'C', 'A', 'A', 'A', 'A', 'A', 'D', 'D', 'D', 'E', 'A'],
                ['A', 'D', 'D', 'D', 'E', 'E', 'A', 'C', 'A', 'A', 'A', 'A'],
                ['A', 'A', 'A', 'E', 'A', 'E', 'A', 'C', 'C', 'D', 'D', 'A'],
                ['A', 'D', 'E', 'E', 'A', 'D', 'A', 'A', 'A', 'A', 'A', 'A'],
                ['A', 'A', 'D', 'A', 'A', 'D', 'A', 'C', 'D', 'D', 'A', 'A'],
                ['A', 'D', 'D', 'D', 'A', 'D', 'C', 'C', 'A', 'D', 'E', 'B'],
                ['A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A']
            ]);
            const runner = new MazeRunner(matrix, [0, 1]);
            const solution = runner.resolveMaze();
            const solutionValues = solution.map(e => e.value);
            expect(solutionValues).toStrictEqual([
                'B',
                'C',
                'C',
                'C',
                'D',
                'D',
                'D',
                'E',
                'E',
                'E',
                'D',
                'D',
                'D',
                'C',
                'C',
                'C',
                'D',
                'D',
                'D',
                'E',
                'E',
                'E',
                'D',
                'D',
                'D',
                'C',
                'C',
                'C',
                'D',
                'D',
                'D',
                'E',
                'B'
            ]);
            expect(runner.endBlock.i).toStrictEqual(10);
            expect(runner.endBlock.j).toStrictEqual(11);
        });

        it('12x12 maze invert path', () => {
            const matrix = math.matrix([
                ['A', 'B', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A'],
                ['A', 'C', 'A', 'D', 'D', 'E', 'A', 'C', 'C', 'C', 'D', 'A'],
                ['A', 'C', 'C', 'D', 'A', 'E', 'A', 'D', 'A', 'D', 'A', 'A'],
                ['A', 'A', 'A', 'A', 'A', 'E', 'D', 'D', 'A', 'D', 'E', 'A'],
                ['A', 'C', 'C', 'D', 'D', 'D', 'A', 'A', 'A', 'A', 'E', 'A'],
                ['A', 'C', 'A', 'A', 'A', 'A', 'A', 'D', 'D', 'D', 'E', 'A'],
                ['A', 'D', 'D', 'D', 'E', 'E', 'A', 'C', 'A', 'A', 'A', 'A'],
                ['A', 'A', 'A', 'E', 'A', 'E', 'A', 'C', 'C', 'D', 'D', 'A'],
                ['A', 'D', 'E', 'E', 'A', 'D', 'A', 'A', 'A', 'A', 'A', 'A'],
                ['A', 'A', 'D', 'A', 'A', 'D', 'A', 'C', 'D', 'D', 'A', 'A'],
                ['A', 'D', 'D', 'D', 'A', 'D', 'C', 'C', 'A', 'D', 'E', 'B'],
                ['A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A']
            ]);
            const runner = new MazeRunner(matrix, [10, 11]);
            const solution = runner.resolveMaze();
            const solutionValues = solution.map(e => e.value);
            expect(solutionValues).toStrictEqual([
                'B', 'E','D','D','D','C','C','C','D','D','D','E','E','E','D','D','D','C','C',
                'C','D','D','D','E','E','E','D','D', 'D', 'C','C', 'C', 'B'
            ]);
            expect(runner.endBlock.i).toStrictEqual(0);
            expect(runner.endBlock.j).toStrictEqual(1);
        });

        it('5x6 bcccdddeeedddb maze', () => {
            const matrix = math.matrix([
                ['A', 'A', 'A', 'B', 'A'],
                ['A', 'D', 'D', 'D', 'A'],
                ['A', 'E', 'D', 'D', 'A'],
                ['A', 'E', 'E', 'D', 'A'],
                ['B', 'C', 'C', 'C', 'A'],
                ['A', 'A', 'A', 'A', 'A']
            ]);
            const runner = new MazeRunner(matrix, [4, 0]);
            const solution = runner.resolveMaze();
            const solutionValues = solution.map(e => e.value);
            expect(solutionValues).toStrictEqual([
                'B',
                'C',
                'C',
                'C',
                'D',
                'D',
                'D',
                'E',
                'E',
                'E',
                'D',
                'D',
                'D',
                'B'
            ]);
            expect(runner.endBlock.i).toStrictEqual(0);
            expect(runner.endBlock.j).toStrictEqual(3);
        });
    });
});

