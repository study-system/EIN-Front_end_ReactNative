import React from 'react';
import { StyleSheet, StatusBar } from 'react-native';

const styles = StyleSheet.create({
    containerAuth: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#eee',

    },
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },
    item: {
        backgroundColor: '#fff',
        paddingVertical: 10,
        paddingHorizontal: 100,
        marginVertical: 2,
        marginHorizontal: 16,
        flex: 1,
        flexDirection: 'row',
    },
    postTitle: {
        fontSize: 12,
    },

    title: {
        fontSize: 32,
        fontWeight: 'bold',
    },
    tableHeader: {
        backgroundColor: '#fff',
        paddingHorizontal: 10,
        paddingVertical: 10,

        marginVertical: 2,
        marginHorizontal: 100,

        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

module.exports = styles;
