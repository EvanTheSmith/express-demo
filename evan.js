function evan(req, res, next) {
    console.log("Custome middleware says whaaaaat");
    next();
}

module.exports = evan;