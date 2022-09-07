import React, { useState } from "react"
import {
    Box,
    Flex,
    Center,
    HStack,
    VStack,
    Progress,
    Button,
    Text,
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
    const [isClickedPinyin, setClickedPinyin] = useState(false)

    const length = props.objectData.length
    const word = props.objectData[index].word
    const pinyin = props.objectData[index].pinyin
    const button_text = isClickedPinyin ? pinyin : "拼音を見る"
    return (
        <Box>
            <CloseButton />
            <Progress value={index / length * 100} />
            <Box>
                <Center margin="50px">
                    <BackButton onClick={() => {
                        setClickedPinyin(false)
                        setIndex(Math.max(0, index - 1))
                    }} />
                    <VStack width="250px">
                        <Text>No. {index + 1}</Text>
                        <Box fontSize="6xl">{word}</Box>
                        <Button
                            colorScheme="teal"
                            variant="outline"
                            onClick={() => setClickedPinyin(true)}>
                            {button_text}
                        </Button>
                    </VStack>
                    <NextButton onClick={() => {
                        setClickedPinyin(false)
                        setIndex(Math.min(length - 1, index + 1))
                    }} />
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