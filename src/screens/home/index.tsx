import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RecyclerListView, DataProvider } from 'recyclerlistview';
import FastImage from 'react-native-fast-image';
import { NavigationInterface } from '../types';
import { useThemeContext } from '../../theme';
import { GameInterface } from '../../store/game/types';
import { useStoreContext } from '../../store';
import Game from '../../components/game_card';
import Card from '../../components/card';
import GameListHeader from './game_platform';
import LoadingGames from '../../components/LoadingGames';
import layoutProvider, { ViewTypes } from '../../components/recycler_list_view';
import { GameScreenshotInterface, gradientAppIconLink } from '../../constants';
import { Dimensions } from 'react-native';
import applyScale from '../../utils/applyScale';
import boxShadow from '../../utils/boxShadows';

import { ContainerHeader } from '../search/styles';
import { Container } from './styles';

interface HomeScreenProps extends NavigationInterface {
  testID?: string;
}

export default function HomeScreen(props: HomeScreenProps) {
  const { colors } = useThemeContext();

  const {
    store: { gameState, userState, bookMarkState }
  } = useStoreContext();

  const [state] = useState({
    dataProvider: new DataProvider((r1, r2) => r1.id !== r2.id).cloneWithRows([
      {},
      ...gameState.games
    ]),

    layoutProvider: layoutProvider()
  });

  const _renderGame = (type: string, data: GameInterface, index: number) => {
    switch (type) {
      case ViewTypes.GAME_LIST:
        return (
          <Game
            gameIndex={index - 1}
            gamesListLastIndex={gameState.games.length}
            {...data}
            {...props}
            bookmarked={bookMarkState.checkedBookmarks[data.id] ? true : false}
          />
        );

      case ViewTypes.GAME_LIST_HEADER:
        return <GameListHeader {...props} />;

      default:
        return null;
    }
  };

  const _renderFooter = () => gameState.isLoading && <LoadingGames />;

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.WHITE_BG_COLOR,
        paddingBottom: 0
      }}
    >
      <Container>
        <ContainerHeader
          style={[
            boxShadow({
              elevation: 3,
              shadowColor: colors.BLACK_FONT_COLOR,
              shadowOpacity: 0.06
            })
          ]}
        >
          <Card style={{ width: 40, height: 40 }}>
            <FastImage
              style={{
                width: 40,
                height: 40,
                borderRadius: 45,
                borderWidth: 2,
                borderColor: colors.ACTION_BG_COLOR
              }}
              source={{
                uri: `${userState.user.avatar}`,
                priority: FastImage.priority.normal
              }}
              resizeMode={FastImage.resizeMode.contain}
            />
          </Card>

          <FastImage
            style={{
              width: 40,
              height: 40,
              left: applyScale(Math.floor(Dimensions.get('screen').width / 3))
            }}
            source={{
              uri: gradientAppIconLink,
              priority: FastImage.priority.high
            }}
            resizeMode={FastImage.resizeMode.contain}
          />
        </ContainerHeader>
        {gameState.isLoading ? (
          <LoadingGames />
        ) : (
          <RecyclerListView
            style={{ minHeight: 1, minWidth: 1, flex: 1, width: '100%' }}
            contentContainerStyle={{ paddingTop: 10 }}
            dataProvider={state.dataProvider}
            layoutProvider={state.layoutProvider}
            rowRenderer={_renderGame}
            renderFooter={_renderFooter}
            showsVerticalScrollIndicator={false}
            canChangeSize={true}
            renderAheadOffset={4}
            keyExtractor={(game: GameScreenshotInterface) => `${game.id}`}
          />
        )}
      </Container>
    </SafeAreaView>
  );
}
