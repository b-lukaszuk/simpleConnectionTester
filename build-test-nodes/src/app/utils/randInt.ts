/**
 * python like randInt
 * returns random int from given range (incl-excl)
 * @param {number}  min - minimum (incl)
 * @param {number}  max - maximum (excl)
 * @returns {number} random value from a given range
 */
function randInt(min: number, max?: number): number {

    let result: number = 0;

    for (let i = 0; i < 2; i++) {
        if (arguments[i] < 0) {
            throw new Error("range must not include negative numbers");
        }
    }
    if (arguments.length === 1) {
        max = min;
        min = 0;
    }
    // floats protection
    min = Math.ceil(min);
    // should always be true,
    // but the stricter angular checker requires me to do that way
    if (max) {
        max = Math.floor(max);
        result = Math.floor(Math.random() * (max - min)) + min;
    }

    return result;
}

export default randInt;
