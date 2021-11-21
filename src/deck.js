import React, { useEffect, useState } from 'react'
import { Text } from 'react-native'
import styled from 'styled-components/native';
import Button from './components/Button';
import { connect } from 'react-redux'
import {clearLocalNotification} from './util/helpers';

const MainContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.View`
  margin-bottom: 50px;
  align-items: center;
`;

const Title = styled.Text`
  font-size: 20px
  font-weight: 500;
`;

const Deck = ({ navigation, route, decks }) => {
  const [id, setId] = useState(route.params.id);

  useEffect(() => {
    setId(route.params.id)
  }, [route])

  const deleteDeck = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Home', params: { id } }],
    });
  }

  return (
    <MainContainer>
      {decks.hasOwnProperty(id) && (
        <>
          <Wrapper>
            <Title>{decks[id].title}</Title>
            <Text style={{ paddingTop: 10 }}>{decks[id].cards.length} cards</Text>
          </Wrapper>
          <Button label="Add a card" onPress={() => navigation.push('addCard', {id})} />
          <Button label="Start Quiz" onPress={() => {
            navigation.push('quiz', {id});
            clearLocalNotification();
          }} />
          <Button label="Delete Deck" onPress={() => deleteDeck()} outlined danger />
        </>
      )}
    </MainContainer>
  )
}

const mapStateToProps = ({ decks }) => {
  return {
    decks,
  }
}

export default connect(mapStateToProps, {})(Deck)