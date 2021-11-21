import React, { useState, useEffect } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import styled from 'styled-components/native';
import { connect } from 'react-redux'
import Button from './components/Button';

const MainContainer = styled.View`
  flex: 1;
  margin: 0 10px;
`;

const Wrapper = styled.View`
  align-items: center;
  justify-content: center;
  flex-direction: row;
  width: 100%;
  margin: 10px 0px;
`;

const Title = styled.Text`
  font-size: 20px
  font-weight: 500;
`;

function Quiz({ navigation, route, decks }) {
  const [id, setId] = useState(route.params.id);
  const [correct, setCorrect] = useState(0);
  const [incorrect, setIncorrect] = useState(0);
  const [restart, setRestart] = useState(false);

  useEffect(() => {
    setId(route.params.id)
  }, [route])

  const restartQuiz = () => {
    setCorrect(0);
    setIncorrect(0);
    setRestart(true);
  }

  return (
    <MainContainer>
      {decks.hasOwnProperty(id) && (
        <>
          <View style={{ flex: 1 }}>
            {decks[id].cards.map((q, key) => (
              <Question
                q={q}
                key={key}
                setCorrect={() => setCorrect((state) => state + 1)}
                setIncorrect={() => setIncorrect((state) => state + 1)}
                restart={restart}
              />
            ))}
          </View>
          <View >
            {decks[id].cards.length - (correct + incorrect) === 0 ? (
              <>
                <Text style={{
                  marginBottom: 10,
                  textAlign: 'left',
                  fontSize: 18
                }}>Score: {correct} / {decks[id].cards.length }</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Button label="Restart quiz" onPress={() => restartQuiz()} />
                  <Button label="Go back" onPress={() => navigation.pop()} />
                </View>
              </>
            ) : (
              <Text style={{
                marginBottom: 10,
                textAlign: 'left',
                fontSize: 18
              }}>Remaining questions: {decks[id].cards.length - (correct + incorrect)}</Text>
            )}
          </View>
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

export default connect(mapStateToProps, {})(Quiz)

const Question = ({ q, setCorrect, setIncorrect, restart }) => {
  const [visibe, setVisibe] = useState(false);
  const [answered, setAnswered] = useState(false);

  useEffect(() => {
    if (restart) {
      setAnswered(false);
      setVisibe(false);
    }
  }, [restart])
  return (
    <View style={{
      paddingVertical: 5,
      marginVertical: 5,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc'
    }}>
      <Wrapper>
        <View style={{ flex: 1 }}>
          <Title>{q.question}?</Title>
        </View>
        <TouchableOpacity
          onPress={() => setVisibe((state) => !state)}
        >
          <Text
            style={{ color: '#948bfe', fontWeight: '500' }}
          >
            See answer
          </Text>
        </TouchableOpacity>
      </Wrapper>
      <View style={{ flexDirection: 'row' }}>
        <View style={{ flex: 1 }}>
          <Text style={{ fontStyle: 'italic', fontWeight: '500' }}>
            Answer: {visibe && q.answer}
          </Text>
        </View>
        {!answered && (
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
              onPress={() => {
                setCorrect();
                setAnswered(true);
              }}
            >
              <Text
                style={{ color: '#3fbc36', fontWeight: '700', marginRight: 10 }}
              >
                Correct
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setIncorrect();
                setAnswered(true);
              }}
            >
              <Text
                style={{ color: '#f73100', fontWeight: '700' }}
              >
                Incorrect
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  )
}