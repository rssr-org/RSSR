/**
 *
 * @param data: literal value or variable
 * @returns {string} : type of data
 *  can be:
 *      number, string, boolean, undefined,
 *      function, symbol, null, array,
 *      symbolin, promise, error , regexp
 */
export const dataType = function (data) {
    switch (typeof data) {
        case "number":
            return "number"
        case "string":
            return "string"
        case "boolean":
            return "boolean"
        case "undefined":
            return "undefined"
        case "function":
            return "function"
        case "symbol":
            return "symbol"
        case "object":
        default:
            switch (Object.prototype.toString.call(data)) {
                case "[object Number]":
                    return "number"
                case "[object String]":
                    return "string"
                case "[object Boolean]":
                    return "boolean"
                case "[object Undefined]":
                    return "undefined"
                case "[object Null]":
                    return "null"
                case "[object Function]":
                    return "function"
                case "[object Array]":
                    return "array"
                case "[object Promise]":
                    return "promise"
                case "[object Error]":
                    return "error"
                case "[object RegExp]":
                    return "regexp"
                default:
                    if (typeof Array !== "undefined" && data instanceof Array) return "array"
                    if (typeof Function !== "undefined" && data instanceof Function) return "function"
                    if (typeof Promise !== "undefined" && data instanceof Promise) return "promise"
                    if (typeof Error !== "undefined" && data instanceof Error) return "error"
                    if (typeof RegExp !== "undefined" && data instanceof RegExp) return "regexp"
            }
    }
    return "object"
}