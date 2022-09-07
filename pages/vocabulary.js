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
    ListItem,
    UnorderedList,
    Select,
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
    const [isClickedDesc, setClickedDesc] = useState(false)

    const length = props.objectData.length
    const data = props.objectData[index]
    const word = data.word
    const pinyin = data.pinyin
    const description = data.description

    return (
        <Box>
            <CloseButton />
            <Progress value={index / length * 100} />
            <Box>
                <Center margin="50px 50px 10px">
                    <BackButton onClick={() => {
                        setClickedPinyin(false)
                        setClickedDesc(false)
                        setIndex(Math.max(0, index - 1))
                    }} />
                    <VStack width="300px">
                        <Text>No. {index + 1}</Text>
                        <Box fontSize="6xl">{word}</Box>
                        <Button
                            width="300px"
                            colorScheme="teal"
                            variant="outline"
                            onClick={() => setClickedPinyin(true)}>
                            {isClickedPinyin ? pinyin : "拼音を見る"}
                        </Button>
                    </VStack>
                    <NextButton onClick={() => {
                        setClickedPinyin(false)
                        setClickedDesc(false)
                        setIndex(Math.min(length - 1, index + 1))
                    }} />
                </Center>
                <Center>
                    <Button
                        whiteSpace="unset"
                        colorScheme="teal"
                        variant="outline"
                        width="300px"
                        height="200px"
                        onClick={() => setClickedDesc(true)}>
                        {isClickedDesc
                            ? <UnorderedList>
                                {description.split("\n").map((elem, idx) =>
                                    <ListItem key={idx}>{elem}</ListItem>
                                )}
                            </UnorderedList>
                            : "意味を見る"}
                    </Button>
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