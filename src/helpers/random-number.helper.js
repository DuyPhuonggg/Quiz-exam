const randomNumber = (length) => {
    return (Math.random() * Math.pow(10, length)).toString().split('.')[0];
}

module.exports = {
    randomNumber
}