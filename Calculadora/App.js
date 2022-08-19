import { React, useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
//import { handleInput, calculator } from './components/Functions.js';

export default function App() {
  const [currentNumber, setCurrentNumber] = useState('');
  const [lastNumber, setLastNumber] = useState('');

  function handleInput(buttonPressed) {
    //console.log(buttonPressed);
    if (operacao[buttonPressed] === buttonPressed) {
      setCurrentNumber(currentNumber + ' ' + buttonPressed + ' ');
      return;
    }

    if (typeof operacoesFunc[buttonPressed] == 'function') {
      operacoesFunc[buttonPressed]();
      return;
    }

    setCurrentNumber(currentNumber + buttonPressed);
  }

  function calculator(op) {
    try {
      const splitNumbers = currentNumber.split(' ');
      const firstNumber = parseFloat(splitNumbers[0]);
      const lastNumber = parseFloat(splitNumbers[2]);
      const operator = splitNumbers[1];

      if(operator === "/" && lastNumber == "0") {
        setCurrentNumber("Não é possível dividir por 0.");
        return;
      }

      setCurrentNumber(eval((firstNumber + operator + lastNumber).toString()));
    } catch(x) {
      console.log('Deu erro na função calculator....');
      let temp = [];
      temp.push(x);
      console.log(temp);
    }
    return;
  }

  const buttons = [
    'AC',
    'DEL',
    '%',
    '/',
    '7',
    '8',
    '9',
    '*',
    '4',
    '5',
    '6',
    '-',
    '1',
    '2',
    '3',
    '+',
    '.',
    '0',
    '+/-',
    '=',
  ];

  let operacao = {
    '+': '+',
    '-': '-',
    '*': '*',
    '/': '/',
    '%': '%',
  };
  let operacoesFunc = {
    'DEL': (...x) => {
      //setCurrentNumber(currentNumber.substring(0, currentNumber.lenght - 1));
      try {
        setCurrentNumber(currentNumber.substring(0, currentNumber.lenght - 1));
      } catch {
        return false;
      }
      return true;
    },
    'AC': (...x) => {
      setLastNumber('');
      setCurrentNumber('');
      return true;
    },
    '=': (...x) => {
      setLastNumber(currentNumber + ' = ');
      calculator('=');
      return true;
    },
    '+/-': (...x) => {
      setCurrentNumber(currentNumber * -1);
      return true;
    },
  };

  return (
    <View>
      <View style={styles.result}>
        <Text style={styles.historyText}> {lastNumber} </Text>
        <Text style={styles.resultText}> {currentNumber} </Text>
      </View>
      <View style={styles.buttons}>
        {buttons.map((button) => (
          <TouchableOpacity
            onPress={() => handleInput(button)}
            key={button}
            style={[styles.button, { backgroundColor: '#36D3D6' }]}>
            <Text style={[styles.textButton, { color: 'white', fontSize: 30 }]}>
              {button}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  result: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    width: '100%',
    height: 300,
    backgroundColor: '#f5f5f5',
  },
  buttons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  button: {
    flex: '25%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    minHeight: 80,
    minWidth: 80,
  },
  textButton: {
    color: '#5b5b5b',
    fontSize: 25,
  },
  resultText: {
    color: '#282F38',
    margin: 10,
    fontSize: 40,
  },
  historyText: {
    color: '#7c7c7c',
    fontSize: 20,
    marginRight: 10,
    alignSelf: 'flex-end',
  },
});
