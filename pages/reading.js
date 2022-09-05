import React, {useState,useEffect} from "react"
import {
    Box,
    Spinner,
    Center
} from "@chakra-ui/react"

export default function Reading() {
    const [data, setData] = useState(null)
    const [isLoading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        fetch("https://zh.wikipedia.org/w/api.php?action=query&prop=extracts&titles=next.js&explaintext")
            .then((response) => response.json())
            .then((data) => {
                setData(data)
                setLoading(false)
            })
    }, [])

    if (isLoading) {
        return (
            <Box>
                <Center>
                    <Spinner
                        size="xl"
                        color="blue.500" />
                </Center>
            </Box>
        )
    }
    if (!data) {
        return (
            <Box>No Data</Box>
        )
    }

    const text = data.query.pages[0].extract

    return (
        <Box>
            {data.text}
        </Box>
    )
}