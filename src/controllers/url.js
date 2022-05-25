const Url = require('../models/Url');
const BadRequestError = require('../errors/badRequestError');
const shortid = require('shortid')

const createUrl = async (req, res, next) => {
    // Post a new Url
    const { slug = '', origin_url } = req.body;

    try{
        let url = await Url.findOne({ origin_url })
        if (url != null) {
            return res.status(200).send({url})
        }
        if (slug) {
            url = await Url.findOne({ slug })
        }
        if (url != null) {
            return res.status(200).send({url})
        }
 
    } catch {
       next(new BadRequestError());
    }

    const base = process.env.BASE
    let short_url;
    // url does not exist in db, create new one
    if(!slug){
        slug = shortid.generate()
    }

    short_url = `${base}${slug}`
    try {
        const url = new Url({
            origin_url,
            short_url,
            slug
        })
        await url.save()
        res.status(201).send(url);
    } catch {
        next()
    }

}

const all = async (req, res, next) => {
    try {
        const urls = await Url.find({})
        return res.status(200).send(urls)
    } catch {
        next(new BadRequestError())
    }
}

module.exports = {
    createUrl,
    all
}