const axios = require("axios");
const {getMetadata, metadataRuleSets} = require('page-metadata-parser');
const domino = require('domino');
var validUrl = require('valid-url');
const phantom = require('phantom');
const imageRules = {
    rules: [
        ['meta[property="og:image:secure_url"]', element => element.getAttribute('content')],
        ['meta[property="og:image:url"]', element => element.getAttribute('content')],
        ['meta[property="og:image"]', element => element.getAttribute('content')],
        ['meta[name="twitter:image"]', element => element.getAttribute('content')],
        ['meta[name="twitter:image:src"]', element => element.getAttribute('content')],
        ['meta[property="twitter:image"]', element => element.getAttribute('content')],
        ['meta[data-hid="property::og:image"]', element => element.getAttribute('content')],
        ['meta[name="thumbnail"]', element => element.getAttribute('content')]
    ]
};
const titleRules = {
    rules: [
        ['meta[property="og:title"]', element => element.getAttribute('content')],
        ['meta[name="twitter:title"]', element => element.getAttribute('content')],
        ['meta[property="twitter:title"]', element => element.getAttribute('content')],
        ['meta[name="hdl"]', element => element.getAttribute('content')],
        ['meta[data-hid="property::og:title"]', element => element.getAttribute('content')],
        ['title', element => element.text],
    ],
}
const userAgents = [
    "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36 Google (+https://developers.google.com/+/web/snippet/)\n",
    "Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.96 Mobile Safari/537.36 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
    "Mozilla/5.0 (compatible; Linux x86_64; Mail.RU_Bot/Fast/2.0; +http://go.mail.ru/help/robots)",
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.75 Safari/537.36 Google Favicon",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_5) AppleWebKit/537.11 (KHTML, like Gecko) Chrome/23.0.1271.97 Safari/537.11",
];
const metaController = {
    async callback3(req, res) {
        res.status(200).json(req.body);
        if (validUrl.isUri(req.body.url)) {
            const url = req.body.url;
            const URI = new URL(req.body.url);
            const instance = await phantom.create(['--ignore-ssl-errors=yes', '--load-images=no']);
            const page = await instance.createPage();
            page.setting('javascriptEnabled', false)
            page.setting('loadImages', false)
            page.setting('resourceTimeout', 4000)
            console.log(Math.floor(Math.random() * (5)));
            page.setting('userAgent', userAgents[Math.floor(Math.random() * (5))] )
            const status = await page.open(url);
            console.log(status);
            if (status !== 'success') {
                res.status(200).json({
                    status: 504,
                    message: 'url not responding',
                    icon: '/new_front/assets/images/llogo.jpg'
                })
            }else {
                const content = await page.property('content');
                const doc = domino.createWindow(content).document;
                const metadata = getMetadata(doc, req.body.url, {
                    title: titleRules,
                    image: imageRules,
                    description: metadataRuleSets.description,
                    icon: metadataRuleSets.icon
                });
                if (!metadata.icon) {
                    metadata.icon = '/favicon.ico'
                }
                if (metadata.image && metadata.image.startsWith('/')){
                    metadata.image = URI.protocol+'//'+URI.hostname+metadata.image;
                }
                res.send(metadata)
            }
        } else {
            res.status(422).json({
                status: 422,
                message: "NO URI"
            })
        }
    },
};

module.exports = metaController;
