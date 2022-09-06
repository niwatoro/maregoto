export default async function handler(req, res) {
    try {
        const response = await fetch("https://baike.baidu.com/api/openapi/BaikeLemmaCardApi?scope=103&format=json&appid=379020&bk_key=中国&bk_length=1200")
        const data = await response.json()
        res.status(200).json(data)
    } catch (error) {
        res.status(500).send({ error: "failed" })
    }
}