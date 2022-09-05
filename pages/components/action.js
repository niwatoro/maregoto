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

function BaseButton({ href, icon }) {
    return (
        <Box margin="20px">
            <NextLink href={href} passHref>
                <IconButton
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
        <BaseButton href="vocabulary" icon={<GiBrain />} />
    )
}

export function ReadingButton() {
    return (
        <BaseButton href="reading" icon={<GiSpellBook />} />
    )
}