
exports.index = function (req, res) {
    res.sendOk(res, null, {status: 200});
};

exports.test = function(req, res) {
    return res.sendOk(res, null, {
        message: "hello guys"
    });
}