const List = require('../models/listing')
module.exports = async (req,res)=>{
    let query = {};
    if(req.query.q && req.query.q.trim() !== '') {
        const regex = new RegExp(req.query.q.trim(), 'i');
        query = {
            $or: [
                { title: regex },
                { location: regex },
                { country: regex }
            ]
        };
    }
    const data = await List.find(query);
    res.render('listings/lists.ejs', { allListings: data, user: req.isAuthenticated(), searchQuery: req.query.q || '' });
}