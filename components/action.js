import {
    Box,
    IconButton,
    HStack,
    Text,
} from "@chakra-ui/react"
import {
    GiBrain,
    GiSpellBook,
} from "react-icons/gi"
import NextLink from "next/link"

function BaseButton({ href, icon, colorScheme }) {
    return (
        <Box margin="20px">
            <NextLink href={href} passHref>
                <IconButton
                    colorScheme={colorScheme}
                    height="100px"
                    width="100px"
                    icon={icon}
                    fontSize="6xl"
                    rounded="50px" />
            </NextLink>
        </Box>)
}

export function VocabularyButton() {
    return (
        <BaseButton
        href="vocabulary"
        icon={<GiBrain />}
        colorScheme="teal" />
    )
}

export function ReadingButton() {
    return (
        <BaseButton
        href="reading"
        icon={<GiSpellBook />}
        colorScheme="pink" />
    )
}