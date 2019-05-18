import Piece from './piece';

const generatePieces = () => {
    let id = 0;
    const pieces = [];

    // bottom (first player in array)
    for (let row=0;row<3;row++) {
        for (let col=row%2===0?1:0;col<8;col+=2) {
            pieces.push(new Piece({x:col, y:7-row}, 0, id++));
        }
    }

    // top (second player in array)
    for (let row=0;row<3;row++) {
        for (let col=row%2===0?0:1;col<8;col+=2) {
            pieces.push(new Piece({x:col, y:row}, 1, id++));
        }
    }

    return pieces;
}

export default generatePieces;