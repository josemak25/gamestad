import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';

export default function SearchIcon(props: IconProps) {
  return (
    <Svg viewBox="0 0 24 24" width="100%" height="100%" {...props}>
      <Path
        d="M21.53 20.47l-3.66-3.66A8.98 8.98 0 0020 11a9 9 0 10-9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66a.746.746 0 001.06 0 .747.747 0 00.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"
        fill={props.fillColor}
        stroke={props.isFocused ? props.fillColor : null}
        strokeWidth={1}
      />
    </Svg>
  );
}
