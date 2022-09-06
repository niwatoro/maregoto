import cheerioHttpcli from "cheerio-httpcli"

export default async function handler(req, res) {
    try {
        const p = await cheerioHttpcli.fetch("http://jhsjk.people.cn/article/"+req.body.id)
        res.status(200).send({
            title: p.$("h1").text(),
            body: p.$(".d2txt_con").text()
        })
    } catch (error) {
        res.status(500).send({ error: "failed" })
    }
}