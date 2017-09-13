module.exports = function zeros(str) {
    var numberArr = str.split("*").map(i => {
        let product = "1";
        if (i.indexOf("!") === i.lastIndexOf("!")) {
            for (let n = +i.replace(/!/g, ""); n > 1; n--) {
                product = multiply(product, String(n));
            }
        }
        else {
            for (let n = +i.replace(/!/g, ""); n > 1; n -=2) {
                product = multiply(product, String(n));
            }
        }
        return product;
    });

    var productElem = '1';
    for (let i = 0; i < numberArr.length; i++) {
        productElem = multiply(productElem, numberArr[i]);
    }

    var res = 0;
    for (let i = productElem.length - 1; productElem[i] === "0"; --i, ++res);

    return res;
}

function multiply(first, second) {
    first = first.split("");
    second = second.split("");

    var arrSum = [];

    for (let i = 1; i <= second.length; i++) {
        arrSum.unshift([]);
        for (let k = 0; k < i - 1; k++) {
            arrSum[0].unshift(0);
        }

        for (let j = 1, plus = 0, n; j <= first.length; j++) {
            n = second[second.length - i] * first[first.length - j] + plus;

            if (first.length == j) {
                if (String(n).length === 2) {
                    arrSum[0].unshift(n % 10);
                    arrSum[0].unshift(Number(String(n)[0]));
                }
                else {
                    arrSum[0].unshift(n);
                }
            }
            else if (String(n).length === 2) {
                arrSum[0].unshift(n % 10);
                plus = Number(String(n)[0]);
            }
            else {
                arrSum[0].unshift(n);
                plus = 0;
            }
        }
    }

    arrSum.reverse();

    var maxLength = arrSum[0].length;
    arrSum.forEach(i => maxLength = i.length > maxLength ? i.length : maxLength);

    for (let i = 0; i < arrSum.length; i++) {
        for (let j = arrSum[i].length; j < maxLength; j++) {
            arrSum[i].unshift(0);
        }
    }

    var result = [];
    for (let j = arrSum[0].length - 1, n, plus = 0; j >= 0; j--) {
        n = 0;
        for (let i = 0; i < arrSum.length; i++) {
            n += arrSum[i][j];
        }
        n += plus;

        if (j == 0) {
            result.unshift(n);
        }
        else if (String(n).length > 1) {
            result.unshift(n % 10);
            plus = Number([].slice.call(String(n), 0, String(n).length - 1).join(""));
        }
        else {
            result.unshift(n);
            plus = 0;
        }
    }

    return result.join("");
}
