import React, { useState } from "react"
import {
    Box,
    Flex,
    Center,
    HStack,
    VStack,
    useControllableState
} from "@chakra-ui/react"
import {
    CloseButton,
    BackButton,
    NextButton,
} from "../components/ui"
import fsPromises from "fs/promises"
import path from "path"

export default function Vocabulary(props) {
    const [index, setIndex] = useControllableState({ defaultValue: 0 })
    const word = props.objectData[index].word
    const pinyin = props.objectData[index].pinyin
    console.log(index)
    return (
        <Box>
            <CloseButton />
            <Box>
                <Center>
                    <BackButton onClick={() => setIndex(index - 1)} />
                    <VStack
                        width="100px">
                        <Box>{word}</Box>
                        <Box>{pinyin}</Box>
                    </VStack>
                    <NextButton onClick={() => setIndex(index + 1)} />
                </Center>
            </Box>
        </Box>
    )
}

export const getStaticProps = async () => {
    const filePath = path.join(process.cwd(), "data", "csv", "vocabulary_hsk6.json")
    const data = await fsPromises.readFile(filePath)
    const objectData = JSON.parse(data)

    return {
        props: { objectData }
    }
}