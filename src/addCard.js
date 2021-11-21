import React, { useState } from 'react'
import styled from 'styled-components/native';
import Input from './components/Input';
import Button from './components/Button';
import Storage from './util/storage';
import { updateDecks } from './redux/actions/decks';
import { connect } from 'react-redux'

const MainContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const AddCard = ({ navigation, route, updateDecks }) => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const addCard = async (data) => {
    if (route.params.id) {
      try {
        let res = await Storage.loadDataObj('DECKS');
        await Storage.remove('DECKS');
        
        res[route.params.id].cards = [...res[route.params.id].cards, data];
        await Storage.storeInfoObj('DECKS', res);

        setQuestion('');
        setAnswer('');
        updateDecks(res)
        navigation.goBack();
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <MainContainer>
      <Input
        placeholder={'Question'}
        value={question}
        onChange={(text) => setQuestion(text)}
      />
      <Input
        placeholder={'Answer'}
        value={answer}
        onChange={(text) => setAnswer(text)}
      />
      <Button label="Add a question" onPress={() => addCard({ question, answer })} />
    </MainContainer>
  )
}

const mapStateToProps = () => {
  return {}
}

export default connect(mapStateToProps, { updateDecks })(AddCard)
