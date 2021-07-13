import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput} from 'react-native';
import dictionary from '../localbase';
export default class HomeScreen extends React.Component{
    constructor(){
        super();
        this.state = {
            text: '',
            isSearchPressed: '',
            word: '',
            lexicalCategory: '',
            examples: '',
            definition: ''
        }
    }
    getWord = (word) => {
        var searchKeyWord = word.toLowerCase();
        var url = "https://rupinwhitehatjr.github.io/dictionary/"+searchKeyWord+".json"
        return fetch(url)
        .then((data) => {
            if(data.status === 200){
                return data.json()
            }else{
                return null
            }
        })
        .then((response) => {
            var responseObject = response;
            if(responseObject){
                var wordData = dictionary[this.state.text]["word"];
                var wordDefinition = dictionary[this.state.text]["definition"]
                var wordLexicalCategory = dictionary[this.state.text]["lexicalCategory"]
                this.setState({
                    word: wordData,
                    definition: wordDefinition,
                    lexicalCategory: wordLexicalCategory
                })
            } else {
                this.setState({
                    word: "this.state.text",
                    definition: "Not Found"
                 })
            }
        })
    
    }
    render(){
        return(
            <View>
                <TextInput style = {styles.input}
                onChangeText = {text => {
                this.setState({
                    text: text,
                    isSearchPressed: false,
                    word: "Loading...",
                    lexicalCategory: '',
                    examples: [],
                    definition: ""
                })}}
                value = {this.state.text}/>
                <TouchableOpacity style = {styles.button}
                onPress = {() => {
                    this.setState({isSearchPressed: true})
                    this.getWord(this.state.text);
                }}>
                    <Text>Search Button</Text>
                </TouchableOpacity>
                <View style = {{flexDirection: "row"}}>
                    <Text style = {styles.text}>Word :{""}</Text>
                    <Text style = {styles.text}>{this.state.word}</Text>
                </View>
                <View style = {{flexDirection: "row"}}>
                    <Text style = {styles.text}>Type :{""}</Text>
                    <Text style = {styles.text}>{this.state.lexicalCategory}</Text>
                </View>
                <View style = {{flexDirection: "row"}}>
                    <Text style = {styles.text}>Definition :{""}</Text>
                    <Text style = {styles.text}>{this.state.definition}</Text>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    input: {
        fontFamily: "verdana",
        width: 300,
        height: 20,
        alignSelf: 'center',
        borderWidth: 2,
        borderRadius: 10
    },
    button: {
        flex: 1,
        width: 100,
        height: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "darkyellow",
        borderWidth: 2,
        borderRadius: 10,
    },
    text: {
        alignSelf: 'center',
        fontFamily: "verdana",
        fontSize: 15,
    }
})