import { StyleSheet } from 'react-native';
import React from 'react';
import Markdown from 'react-native-markdown-display';

const markdownStyles = StyleSheet.create({
    body: {
        color: '#E0E0E0',
        fontSize: 16,
        lineHeight: 24,
    },
    heading1: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 10,
    },
    heading2: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#DDDDDD',
        marginBottom: 8,
    },
    heading3: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#CCCCCC',
        marginBottom: 6,
    },
    paragraph: {
        marginBottom: 10,
        color: '#E0E0E0',
    },
    link: {
        color: '#80C7FF',
        textDecorationLine: 'underline',
    },
    code_inline: {
        backgroundColor: '#333333',
        color: '#FFFFFF',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
        fontFamily: 'monospace',
    },
    fence: {
        backgroundColor: '#1E1E1E',
        color: '#FFFFFF',
        padding: 12,
        borderRadius: 6,
        fontFamily: 'monospace',
        overflow: 'scroll',
    },
    blockquote: {
        borderLeftWidth: 4,
        borderLeftColor: '#AAAAAA',
        paddingLeft: 12,
        fontStyle: 'italic',
        color: '#CCCCCC',
        marginVertical: 8,
    },
    list_item: {
        color: '#E0E0E0',
        fontSize: 16,
        marginBottom: 6,
    },
    table: {
        borderWidth: 1,
        borderColor: '#444444',
        borderRadius: 4,
    },
    tr: {
        borderBottomWidth: 1,
        borderBottomColor: '#555555',
    },
    th: {
        fontWeight: 'bold',
        padding: 8,
        color: '#FFFFFF',
        backgroundColor: '#2A2A2A',
    },
    td: {
        padding: 8,
        color: '#E0E0E0',
    },
});

const ConvertMarkdown = ({ content }: { content: string }) => {
    return <Markdown style={markdownStyles}>{content}</Markdown>;
};

export default ConvertMarkdown;
