import React, { useEffect, useState, useRef } from 'react'
import { Text, View } from 'react-native'
import styled from 'styled-components/native';
import { connect } from 'react-redux'
import { getData } from './redux/actions/shared';
import { updateDecks } from './redux/actions/decks';
import Storage from './util/storage';
import { registerForPushNotificationsAsync, schedulePushNotification } from './util/helpers';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const MainContainer = styled.View`
  flex: 1;
`;

const Wrapper = styled.TouchableOpacity`
  margin-bottom: 50px;
  align-items: center;
  background: #948bfeaa;
  margin: 10px;
  padding: 10px;
  border-radius: 5px;
`;

const Title = styled.Text`
  font-size: 20px
  font-weight: 500;
`;

const Home = ({ navigation, route, decks, ids, getData, updateDecks }) => {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  useEffect(() => {
    const schedule = async () => {
      await schedulePushNotification()
    };

    schedule()
  }, []);

  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    if (route.params?.id) {
      deleteDeck(route.params.id)
    }
  }, [])

  const deleteDeck = async (id) => {
    try {
      let decks = await Storage.loadDataObj('DECKS');
      await Storage.remove('DECKS');
      delete decks[id]

      await Storage.storeInfoObj('DECKS', decks);
      updateDecks(decks);
      navigation.setParams({ id: undefined });
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <MainContainer>
      {ids.length === 0 && (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Title>No decks available</Title>
        </View>
      )}
      {ids.map(id => (
        <Wrapper key={id} onPress={() => navigation.push('Deck', { id })} activeOpacity={0.5}>
          <Title>{decks[id].title}</Title>
          <Text style={{ paddingTop: 10 }}>{decks[id].cards.length} cards</Text>
        </Wrapper>
      ))}
    </MainContainer>
  )
}

const mapStateToProps = ({ decks }) => {
  return {
    ids: Object.keys(decks).sort((a, b) => decks[b].id - decks[a].id),
    decks,
  }
}

export default connect(mapStateToProps, { getData, updateDecks })(Home)