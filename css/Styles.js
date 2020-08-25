import React from 'react';
import {StyleSheet, StatusBar} from 'react-native';

const styles = StyleSheet.create({
  containerLogin: {
    flex: 2,
    justifyContent: 'center',
    // alignItems: "center",
    backgroundColor: '#F5FCFF',
  },
  informationText: {
    fontSize: 20,
    paddingTop: 10,
    marginLeft: 30,
    marginBottom: 10,
  },
  input: {
    margin: 15,
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
  },
  inputO: {
    margin: 15,
    height: 40,
    borderColor: '#04B45F',
    borderWidth: 2,
    borderRadius: 10,
  },
  inputNameTag: {
    marginLeft: 20,
    marginBottom: -5,
    fontSize: 16,
    fontWeight: '700',
  },
  submitButton: {
    backgroundColor: 'black',
    padding: 10,
    margin: 15,
    alignItems: 'center',
    height: 40,
    borderRadius: 10,
  },
  submitButtonText: {
    color: 'white',
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
    borderBottomColor: '#777',
    borderBottomWidth: 1,
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 100,
    marginVertical: 0,
    marginHorizontal: 0,
    flex: 1,
    flexDirection: 'row',
  },
  postTitle: {
    fontSize: 12,
  },
  postTitleWriter: {textAlign: 'center'},

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
  picker: {
    marginTop: 6,
    width: 120,
    height: 50,
    backgroundColor: '#fff',
  },
  containerPicker: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#000',
  },
  containerHeader: {
    flex: 0.5,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  headerTitle5: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    flex: 5,
    alignItems: 'center',
  },
  headerTitle2: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    flex: 2,
    alignItems: 'center',
  },
  headerTitle3: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    flex: 3,
    alignItems: 'center',
  },
  postItem: {
    height: 47,
    borderTopColor: '#888',
    borderTopWidth: 1,

    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  submitButtonPopup: {
    flex: 1,
    padding: 10,
    margin: 15,
    alignItems: 'center',
    height: 40,
    borderRadius: 10,
  },
});

module.exports = styles;
