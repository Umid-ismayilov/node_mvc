const view = (req, res, next,path) => {
    res.sendFile( '/resources/view/index.html',{ root: __dirname });
}


module.exports = {
    view:view
}