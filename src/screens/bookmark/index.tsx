import React, { useEffect, useState, useCallback } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Dimensions } from 'react-native';
import { RecyclerListView, DataProvider } from 'recyclerlistview';
import { RefreshControl } from 'react-native';
import FastImage from 'react-native-fast-image';
import { NavigationInterface } from '../types';
import { useStoreContext } from '../../store';
import { bookmarkLayoutProvider } from '../../components/recycler_list_view';
import { GameBookmarkInterface, gradientAppIconLink } from '../../constants';
import { useThemeContext } from '../../theme';
import { GameInterface } from '../../store/game/types';
import { BOOKMARK_ACTION_TYPES } from '../../store/bookmark/types';
import bookmarkActions from '../../store/bookmark/actions';
import LoadingGames from '../../components/LoadingGames';
import Game from '../../components/game_card';
import Card from '../../components/card';
import boxShadow from '../../utils/boxShadows';
import applyScale from '../../utils/applyScale';

import { ContainerHeader } from '../search/styles';
import { Container } from './styles';

interface BookmarkScreenProp extends NavigationInterface {
  testID?: string;
}

export default function BookmarkScreen(props: BookmarkScreenProp) {
  const { colors } = useThemeContext();

  const {
    store: { bookMarkState, userState },
    dispatch
  } = useStoreContext();

  const [state, setState] = useState({
    dataProvider: new DataProvider((r1, r2) => r1.id !== r2.id),
    layoutProvider: bookmarkLayoutProvider(),
    refreshing: false
  });

  useEffect(() => {
    if (!bookMarkState.bookmarks.length) {
      bookmarkActions(dispatch, BOOKMARK_ACTION_TYPES.LOAD_BOOKMARK_GAMES);
    }

    setState({
      ...state,
      dataProvider: state.dataProvider.cloneWithRows(bookMarkState.bookmarks)
    });
  }, [bookMarkState.bookmarks.length]);

  const onRefresh = useCallback(() => {
    bookmarkActions(dispatch, BOOKMARK_ACTION_TYPES.LOAD_BOOKMARK_GAMES);

    setState({
      ...state,
      dataProvider: state.dataProvider.cloneWithRows(bookMarkState.bookmarks)
    });
  }, [bookMarkState.isLoading]);

  const _renderBookmark = (
    _type: string,
    data: GameInterface,
    index: number
  ) => (
    <Game
      gameIndex={index}
      gamesListLastIndex={bookMarkState.bookmarks.length - 1}
      {...data}
      {...props}
      bookmarked={bookMarkState.checkedBookmarks[data.id] ? true : false}
    />
  );

  const _renderFooter = () => bookMarkState.isLoading && <LoadingGames />;

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

        {!bookMarkState.bookmarks.length ? (
          <LoadingGames />
        ) : (
          <RecyclerListView
            style={{ minHeight: 1, minWidth: 1, flex: 1, width: '100%' }}
            dataProvider={state.dataProvider}
            layoutProvider={state.layoutProvider}
            rowRenderer={_renderBookmark}
            renderFooter={_renderFooter}
            showsVerticalScrollIndicator={false}
            canChangeSize={true}
            renderAheadOffset={4}
            keyExtractor={(game: GameBookmarkInterface) => `${game.id}`}
            scrollViewProps={{
              refreshControl: (
                <RefreshControl
                  refreshing={bookMarkState.isLoading}
                  onRefresh={onRefresh}
                  tintColor={colors.ACTION_BG_COLOR}
                  colors={[colors.ACTION_BG_COLOR]}
                />
              )
            }}
          />
        )}
      </Container>
    </SafeAreaView>
  );
}
