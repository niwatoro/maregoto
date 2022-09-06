import React, { useState, useEffect } from "react"
import {
    Box,
    Spinner,
    Center
} from "@chakra-ui/react"
import {cncut} from "cncut"

export default function Reading() {
    const [data, setData] = useState(null)
    const [isLoading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        fetch("/api/get_wikipedia")
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

    const pages = data.query.pages
    const getKey = () => { for (let key in pages) return key }
    const text = pages[getKey()].extract

    const cn = cncut()
    console.log(cn.cut(text).join("/"))

    return <Box>{text}</Box>
}