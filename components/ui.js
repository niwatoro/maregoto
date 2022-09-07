import {
    Box,
    IconButton,
    Link,
    Button,
} from "@chakra-ui/react"
import {
    CloseIcon,
    ArrowLeftIcon,
    ArrowRightIcon,
} from "@chakra-ui/icons"
import NextLink from "next/link"

export function CloseButton() {
    return (
        <NextLink href="/" passHref>
            <IconButton
                height="80px"
                width="80px"
                fontSize="xl"
                rounded="40px"
                icon={<CloseIcon />}
                variantcolor="gray"
                variant="ghost" />
        </NextLink>
    )
}

function BaseButton({ icon, onClick }) {
    return (
        <IconButton
            onClick={onClick}
            height="80px"
            width="80px"
            fontSize="xl"
            rounded="40px"
            icon={icon}
            variantcolor="gray"
            variant="ghost" />)

}

export function BackButton({ onClick }) {
    return (
        <BaseButton onClick={onClick} icon={<ArrowLeftIcon />} />
    )
}

export function NextButton({ onClick }) {
    return (
        <BaseButton onClick={onClick} icon={<ArrowRightIcon />} />
    )
}