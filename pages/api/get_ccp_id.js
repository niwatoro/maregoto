export default async function handler(req, res) {
    try {
        const response = await fetch("http://jhsjk.people.cn/testnew/result?keywords=&isFuzzy=0&searchArea=0&year=0&form=702&type=101&page=1&origin=全部&source=2")
        const data = await response.json()
        res.status(200).json(data)
    } catch (error) {
        res.status(500).send({ error: "failed" })
    }
}