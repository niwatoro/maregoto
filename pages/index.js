import {
    Box,
    VStack,
    Heading,
    Center,
} from "@chakra-ui/react"
import {
    VocabularyButton,
    ReadingButton,
} from "./components/action"

export default function Home() {
    return (
        <Box>
            <Center>
                <Heading>マレゴト</Heading>
            </Center>
            <VocabularyButton />
            <ReadingButton />
        </Box>
    )
}