import React, { useState } from 'react'
import styled from 'styled-components/native';
import Button from './components/Button';
import Input from './components/Input';
import Storage from './util/storage';
import { connect } from 'react-redux'
import { updateDecks } from './redux/actions/decks';

const HeaderTitle = styled.Text`
  margin: 10px 20px;
  font-size: 20px
  text-align: center
`;
const Wrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

function AddDeck({navigation, updateDecks}) {
  const [deck, setDeck] = useState('');

  const addDeck = async () => {
    setDeck('');
    
    try {
      let decks = {}
      let res = await Storage.loadDataObj('DECKS');
      await Storage.remove('DECKS');

      const lastDeck = Object.keys(res).length - 1;
      const obj = {id: lastDeck + 1, title: deck, cards: []}

      decks = {...res, [obj.id]: obj}
      
      await Storage.storeInfoObj('DECKS', decks);
      
      updateDecks(decks);
      navigation.push('Deck', {id: obj.id});
    } catch (error) {
      console.log('error')
      const decks = {}
      decks[0] = {id: 0, title: deck, cards: []}
      await Storage.storeInfoObj('DECKS', decks)
      updateDecks(decks);
      navigation.push('Deck', {id: 0});
    }
  }
  return (
    <Wrapper>
      <HeaderTitle>What is the title of you Deck</HeaderTitle> 
      <Input
        placeholder={'Question'}
        value={deck}
        onChange={(text) => setDeck(text)}
      />
      <Button label="Create Deck" onPress={() => addDeck()} />
    </Wrapper>
  )
}

const mapStateToProps = () => {
  return {}
}

export default connect(mapStateToProps, {updateDecks})(AddDeck)