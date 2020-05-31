import React from 'react';
import GameOption from '../../components/game_option';
import Button from '../../components/button';
import { useThemeContext } from '../../theme';
import hexToRGB from '../../utils/hexToRGB';

import { SearchPlatformsContainer, SearchPlatformsButton } from './styles';

interface SearchPlatformsProp {
  platforms: { option: string; optionColor: string }[];
  onPress(option: string): void;
}

export default function SearchPlatforms({
  platforms,
  onPress
}: SearchPlatformsProp) {
  const { colors } = useThemeContext();

  return (
    <SearchPlatformsContainer>
      {platforms.map(({ option, optionColor }) => (
        <GameOption
          key={option}
          option={option}
          optionColor={optionColor}
          onPress={onPress}
        />
      ))}

      <SearchPlatformsButton>
        <Button
          title="search platform"
          buttonStyle={{
            width: '80%',
            borderRadius: 5,
            paddingTop: 20,
            paddingBottom: 20,
            backgroundColor: colors.WHITE_BG_COLOR,
            borderWidth: 1,
            borderColor: hexToRGB(colors.ACTION_BG_COLOR, 0.2)
          }}
          textStyle={{ color: colors.ACTION_BG_COLOR }}
        />
      </SearchPlatformsButton>
    </SearchPlatformsContainer>
  );
}

SearchPlatforms.defaultProps = {
  platforms: [
    { option: 'Playstation', optionColor: '#016dc7' },
    { option: 'Game Boy Advance', optionColor: '#675f9b' },
    { option: 'Xbox', optionColor: '#107C10' },
    { option: 'Nintendo Switch', optionColor: '#ec5c52' },
    { option: 'Mobile', optionColor: '#d5c3b2' },
    { option: 'PC', optionColor: '#47464c' }
  ]
};