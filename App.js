/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {

  constructor() {
      super()
      this.state = {
        CalculationText: "",
        resultText: ""
      }
      this.optr = ['←', '+', '-', '/', '*'];
  }

  calculateResult() {
    const text = this.state.CalculationText
    this.setState({
      resultText: eval(text)
      })
    //now parse this text
  }

  addOprToCalText(opert) {
    const lastchar = this.state.CalculationText.split('').pop()
    if(this.optr.indexOf(lastchar) > 0) opert = ""
    this.setState ({
          CalculationText: this.state.CalculationText + opert
      })
  }

  operateBtnPress(opr) {
    if(this.state.CalculationText != "") {
      switch(opr) {
        case '←' :
          const textdel = this.state.CalculationText.split('')
          textdel.pop()
          this.setState ({
              CalculationText: textdel.join('')
            })
            if(textdel.length == 0) {
              this.setState ({
                  resultText: ""
                })
            }

            break;
        case '+' : this.addOprToCalText('+')
        break;
        case '-' : this.addOprToCalText('-')
        break;
        case '*' : this.addOprToCalText('*')
        break;
        case '/' : this.addOprToCalText('/')
        break;
      }
    }
  }

  validate(){
    const eqtext = this.state.CalculationText
    switch(eqtext.slice(-1)) {
      case '+':
      case '-' :
      case '*' :
      case '/' :
        return false
    }
    return true
  }

  buttonPressed(text) {

    if(text == '=') {
      return this.validate() && this.calculateResult ()
    }
    if (text == '.') {
      if((!(this.validate())) || this.state.CalculationText == ""){
        text = "0" + text
        console.log(text)
      }
      console.log(text+"oustide validate")
    }
    this.setState({
        CalculationText: this.state.CalculationText+""+text
      })
  }

  render() {

    let elemt = [];
    let num = [[1, 2, 3], [4, 5, 6,], [7, 8, 9], ['.', 0, '=']]
    for(let i = 0; i < 4; i++){
      let row = [];
      for(let j = 0; j < 3; j++){
        row.push(<TouchableOpacity key = {num[i][j]} onPress={() => this.buttonPressed(num[i][j])} style={styles.btn}>
          <Text style={styles.btnText}>{num[i][j]}</Text>
        </TouchableOpacity>)
      }
      elemt.push(<View key = {num[i]}style={styles.row}>{row}</View>)
    }

    let ops = [];
    for(let i = 0; i < 5; i++) {
      ops.push(<TouchableOpacity key = {this.optr[i]} style={styles.btn} onPress={() => this.operateBtnPress(this.optr[i])}>
        <Text style={styles.btnText}>{this.optr[i]}</Text>
      </TouchableOpacity>)
    }

    return (
      <View style={styles.container}>
        <View style={styles.calculation}>
          <Text style={styles.calculationtext}>
            {this.state.CalculationText}
          </Text>
        </View>
        <View style={styles.result}>
        <Text style={styles.resulttext}>
          {this.state.resultText}
        </Text>
        </View>
        <View style={styles.buttons}>
          <View style={styles.numbers}>
            {elemt}
          </View>
          <View style={styles.operations}>
            {ops}
          </View>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  calculation: {
    flex: 3,
    backgroundColor: '#cecece',
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  calculationtext: {
    fontSize: 25,

  },
  result: {
    flex: 1,
    backgroundColor : '#e2e2e2',
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  resulttext: {
    fontSize: 15
  },
  buttons: {
    flex: 6,
    flexDirection: 'row',
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  numbers: {
    flex: 3,
    backgroundColor: '#969696'
  },
  btn: {
    flex: 1,
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  btnText: {
    fontSize: 30
  },
  operations: {
    flex: 1,
    backgroundColor: '#585957',
    color: 'white'
  }
});
