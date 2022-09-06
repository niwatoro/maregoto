import React, { useState, useEffect } from "react"
import {
    Box,
    Spinner,
    Center,
    Heading,
    VStack,
} from "@chakra-ui/react"
import {
    CloseButton
} from "../components/ui"

export default function Reading() {
    const [data, setData] = useState(null)
    const [isLoading, setLoading] = useState(false)
    const article_id = 32515651

    useEffect(() => {
        setLoading(true)
        fetch("/api/get_ccp", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: article_id }),
        })
            .then((res) => res.json())
            .then((data) => {
                setData(data)
                setLoading(false)
            })
    }, [])

    if (isLoading) {
        return (
            <Center>
                <Spinner size="xl" />
            </Center>)
    }
    if (!data) {
        return <Box>No data</Box>
    }

    // const pages = data.query.pages
    // const getKey = () => { for (let key in pages) return key }
    // const text = pages[getKey()].extract
    console.log(data)

    return (
        <Box>
            <CloseButton />
            <Center>
                <VStack width="500px">
                    <Heading>{data.title}</Heading>
                    <Box>
                        {data.body.split("\n").map((elem, idx) => {
                            return (
                                <Box key={idx}>
                                    <Box>{elem}</Box>
                                    <br />
                                </Box>
                            )
                        })}
                    </Box>
                </VStack>
            </Center>
        </Box>
    )
}