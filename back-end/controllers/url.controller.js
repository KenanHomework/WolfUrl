import axios from 'axios'
import cheerio from 'cheerio'
import { Url } from '../models/url.model.js';

export async function shortLink(req, res) {
    try {

        const userId = req.userId;

        const { destination, backHalf, label } = req.body;

        const destinationExist = await Url.exists({ destination, owner: userId });
        if (destinationExist) {
            res.status(400).json("Looks like this destination is already used for another short link");
            return;
        }

        let title = destination;
        try {
            title = await checkURL(destination);
        } catch (error) {
            return res.status(400).json("URL is not accessible");

        }

        let generatedBackHalf = backHalf;
        if (!generatedBackHalf) {
            do {
                generatedBackHalf = generateRandomString(8);
            } while (await Url.exists({ backHalf: generatedBackHalf }));
        } else {
            const backHalfExist = await Url.exists({ backHalf });
            if (backHalfExist) {
                return res.status(400).json("Looks like this back-half is already used for another short link");
            }
        }

        const url = new Url({
            label: label || title,
            backHalf: generatedBackHalf,
            destination,
            owner: userId
        });

        const shortedUrl = await url.save();

        res.status(200).send(shortedUrl);
    } catch (error) {
        return res.status(500).json(error);
    }
}

export async function getUserLinks(req, res) {
    try {
        const userId = req.userId;
        const userLinks = await Url.find({ owner: userId });
        res.status(200).send(userLinks);
    } catch (error) {
        return res.status(500).json(error);
    }
}

export async function getLink(req, res) {
    try {
        const backHalf = req.params.backHalf;
        const link = await Url.findOne({ backHalf });
        res.status(200).send(link);
    } catch (error) {
        return res.status(500).json(error);
    }
}

function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

async function checkURL(url) {
    try {
        const response = await axios.get(url);
        if (response.status === 200) {
            const html = response.data;
            const $ = cheerio.load(html);
            const title = $('title').text();
            return title;
        } else {
            throw new Error('URL çalışmıyor. HTTP durum kodu: ' + response.status);
        }
    } catch (error) {
        throw new Error('URL çalışmıyor: ' + error.message);
    }
}