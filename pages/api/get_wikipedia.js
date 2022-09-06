export default async function handler(req, res) {
    try {
        const response = await fetch("https://zh.wikipedia.org/w/api.php?action=query&prop=extracts&titles=next.js&explaintext&format=json")
        const data = await response.json()
        res.status(200).json(data)
    } catch (error) {
        res.status(500).send({ error: "failed" })
    }
}