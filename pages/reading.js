import React, { useState, useEffect } from "react"
import {
    Box,
    Spinner,
    Center,
    Heading,
    VStack,
    Text,
    Wrap,
    WrapItem,
    useToast,
} from "@chakra-ui/react"
import {
    CloseButton,
} from "../components/ui"
import pinyin from "pinyin"

export default function Reading() {
    const [data, setData] = useState(null)
    const [isLoading, setLoading] = useState(false)
    const article_id = 32516945
    const toast = useToast()

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

    return (
        <Box>
            <CloseButton />
            <Center>
                <VStack width="600px">
                    <Heading>{data.title}</Heading>
                    <Box>
                        {data.body.split("\n").map((elem, idx) =>
                            <Box key={idx}>
                                <Wrap spacing="0">{
                                    [...elem].map((elem, idx) =>
                                        <WrapItem
                                            key={idx}
                                            onClick={() => {
                                                toast.closeAll()
                                                toast({
                                                    title: pinyin(elem)
                                                })
                                            }}>
                                            {elem}
                                        </WrapItem>)
                                }</Wrap>
                                <br />
                            </Box>
                        )}
                    </Box>
                </VStack>
            </Center>
        </Box>
    )
}