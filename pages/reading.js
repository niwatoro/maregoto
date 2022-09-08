import React, { useState, useEffect, Component } from "react"
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
    Select,
    Flex,
    Spacer,
} from "@chakra-ui/react"
import {
    CloseButton,
} from "../components/ui"
import pinyin from "pinyin"

export default class Reading extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: null,
            data_id: null,
            article_id: 32516945,
            isLoading: false,
        }
    }

    LoadText = async () => {
        this.setState({ isLoading: true })
        const res_id = await fetch("/api/get_ccp_id")
        const data_id = await res_id.json()
        this.setState({ data_id: data_id })

        const res = await fetch("/api/get_ccp?id=", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: this.state.article_id }),
        })
        const data = await res.json()
        this.setState({
            data: data,
            isLoading: false
        })
    }

    componentDidMount() {
        this.LoadText()
    }

    render() {
        const data = this.state.data
        const data_id = this.state.data_id
        const article_id = this.state.article_id
        const isLoading = this.state.isLoading

        if (isLoading) {
            return (
                <Center margin="200px">
                    <Spinner size="xl" />
                </Center>)
        } if (!data) {
            return <Box>No data</Box>
        } else {
            return (
                <Box>
                    <Flex>
                        <CloseButton />
                        <Spacer />
                        <Select
                            onChange={(e) => {
                                this.setState({ article_id: e.target.value })
                                this.LoadText()
                            }}
                            value={article_id}
                            marginTop="20px"
                            marginRight="10px"
                            height="50px"
                            width="400px">
                            {data_id.map((elem, idx) =>
                                <option key={idx} value={elem.article_id}>{elem.title}</option>
                            )}
                        </Select>
                    </Flex>
                    <Center>
                        <VStack width="600px" margin="20px">
                            <Heading>{data.title}</Heading>
                            <Box>
                                {data.body.split("\n").map((elem, idx) =>
                                    <Box key={idx}>
                                        <Wrap spacing="0">{
                                            [...elem].map((elem, idx) =>
                                                <ToastItem
                                                    key={idx}
                                                    elem={elem}>
                                                    {elem}
                                                </ToastItem>)
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
    }
}

function ToastItem(props) {
    const elem = props.elem
    const toast = useToast()
    return (
        <WrapItem
            fontSize="xl"
            onClick={() => {
                toast.closeAll()
                toast({
                    title: elem + ": " + pinyin(elem)
                })
            }}>
            {elem}
        </WrapItem>
    )
}