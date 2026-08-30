module.exports = (err, req, res, next) => {
    console.log(err);
    let { message = "Something went wrong", statusCode = 500 } = err;
    res.status(statusCode).render('listings/pagenf.ejs', { error: message });
}