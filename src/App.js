import {Container, Content, Row, Column} from './styles';
import Input from './components/Input';
import Button from './components/Button';
import { useState } from 'react';

const App = () => {
  const [currentNumber, setCurrentNumber] = useState('0');
  const [firstNumber, setFirstNumber] = useState('');
  const [operation, setOperation] = useState('');
  const [showingResult, setShowingResult] = useState(false);

  const calculate = () => {
    const first = Number(firstNumber.replace(',', '.'));
    const current = Number(currentNumber.replace(',', '.'));
    let result = 0;

    switch (operation) {
      case '+':
        result = first + current;
        break;
      case '-':
        result = first - current;
        break;
      case '*':
        result = first * current;
        break;
      case '/':
        result = first / current;
        break;
      default:
        break;
    }

    return String(result).replace('.', ',');
  };

  const handleClear = () => {
    setCurrentNumber('0')
    setFirstNumber('')
    setOperation('')
    setShowingResult(false)
  };
  const handleAddNumber = (number) => {
    if (showingResult) {
      setCurrentNumber(number === ',' ? '0,' : number)
      setShowingResult(false)
      return
    }
    if (number === ',' && currentNumber.includes(',')) return

    setCurrentNumber(prev => {
      if (prev === '0' && number !== ',') return number
      if (prev === '' && number === ',') return '0,'
      return `${prev}${number}`
    })
  };
  const handleOperation = (newOperation) => {
    if (currentNumber === '') {
      setOperation(newOperation)
      return
    }
    if (operation !== '') {
      setFirstNumber(calculate())
    } else {
      setFirstNumber(currentNumber)
    }
    setOperation(newOperation)
    setCurrentNumber('')
    setShowingResult(false)
  };
  const handleEquals = () => {
    if (operation === '' || currentNumber === '') return

    setCurrentNumber(calculate())
    setFirstNumber('')
    setOperation('')
    setShowingResult(true)
  };
  const handleBackspace = () => {
    setCurrentNumber(prev => prev.length > 1 ? prev.slice(0, -1) : (operation ? '' : '0'))
  };
  const handleToggleSign = () => {
    if (currentNumber === '' || currentNumber === '0') return
    setCurrentNumber(prev => prev.startsWith('-') ? prev.slice(1) : `-${prev}`)
  };
  const handlePercent = () => {
    if (currentNumber === '') return
    setCurrentNumber(prev => String(Number(prev.replace(',', '.')) / 100).replace('.', ','))
  };

  return (
    <Container>
      <Content>
        <Input value={`${firstNumber}${operation}${currentNumber}`}/>
        <Row>
          < Button label="<|" color="#d86f14" onClick={handleBackspace} />
          < Button label="CE" color="#d86f14" onClick={handleClear} />
          < Button label="%" color="#d86f14" onClick={handlePercent} />
          < Button label="/" color="#d86f14" onClick={() => handleOperation('/')} />
        </Row>
        <Row>
          < Button label="7" color="#dc8335" onClick={() => handleAddNumber('7')} />
          < Button label="8" color="#dc8335" onClick={() => handleAddNumber('8')} />
          < Button label="9" color="#dc8335" onClick={() => handleAddNumber('9')} />
          < Button label="*" color="#d86f14" onClick={() => handleOperation('*')} />
        </Row>
        <Row>
          < Button label="4" color="#dc8335" onClick={() => handleAddNumber('4')} />
          < Button label="5" color="#dc8335" onClick={() => handleAddNumber('5')} />
          < Button label="6" color="#dc8335" onClick={() => handleAddNumber('6')} />
          < Button label="-" color="#d86f14" onClick={() => handleOperation('-')} />
        </Row>
        <Row>
          < Button label="1" color="#dc8335" onClick={() => handleAddNumber('1')} />
          < Button label="2" color="#dc8335" onClick={() => handleAddNumber('2')} />
          < Button label="3" color="#dc8335" onClick={() => handleAddNumber('3')} />
          < Button label="+" color="#d86f14" onClick={() => handleOperation('+')} />
        </Row>
        <Row>
          < Button label="+/-" color="#d86f14" onClick={handleToggleSign} />
          < Button label="0" color="#dc8335" onClick={() => handleAddNumber('0')} />
          < Button label="," color="#dc8335" onClick={() => handleAddNumber(',')} />
          < Button label="=" color="#d86f14" onClick={handleEquals} />
        </Row>
      </Content>
    </Container>
  );
}

export default App;
