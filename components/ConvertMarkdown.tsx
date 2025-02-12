import { StyleSheet } from 'react-native'
import React from 'react'
import Markdown from 'react-native-markdown-display';

const markdownStyles = StyleSheet.create({
    body: {
        color: '#ffffff',
        fontSize: 16,
    },
    code_inline: {
        backgroundColor: '#333333',
        color: '#ffffff',
        paddingHorizontal: 4,
        paddingVertical: 2,
        borderRadius: 4,
        fontFamily: 'monospace',
    },
    fence: {
        backgroundColor: '#1e1e1e',
        padding: 10,
        borderRadius: 6,
        borderColor: 'none',
        fontFamily: 'monospace',
    },
    blockquote: {
        borderLeftWidth: 4,
        borderLeftColor: '#ffffff',
        paddingLeft: 10,
        fontStyle: 'italic',
        color: '#cccccc',
    },
    link: {
        color: '#00afff',
        textDecorationLine: 'underline',
    },
    list_item: {
        color: '#ffffff',
        fontSize: 16,
    },
});

const ConvertMarkdown = ({ content }: { content: string }) => {
    return (
        <Markdown style={markdownStyles}>{content}</Markdown>
    )
}

export default ConvertMarkdown