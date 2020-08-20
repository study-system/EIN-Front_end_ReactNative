import React from 'react';
import { StyleSheet, StatusBar } from 'react-native';

const styles = StyleSheet.create({

    containerLogin: {
        flex: 2,
        justifyContent: "center",
        // alignItems: "center",
        backgroundColor: "#F5FCFF"
    },
    input: {
        margin: 15,
        height: 40,
        borderColor: "black",
        borderWidth: 1
    },
    submitButton: {
        backgroundColor: "black",
        padding: 10,
        margin: 15,
        alignItems: "center",
        height: 40
    },
    submitButtonText: {
        color: "white"
    },

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
