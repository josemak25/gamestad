import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';

export default function HomeIcon(props: IconProps) {
  return (
    <Svg width="100%" height="100%" viewBox="0 0 24 24" {...props}>
      <Path
        d="M22.58 7.35L12.475 1.897a1 1 0 00-.95 0L1.425 7.35A1.002 1.002 0 001.9 9.231c.16 0 .324-.038.475-.12l.734-.396 1.59 11.25c.216 1.214 1.31 2.062 2.66 2.062h9.282c1.35 0 2.444-.848 2.662-2.088l1.588-11.225.737.398a1 1 0 00.95-1.759zM12 15.435a3.25 3.25 0 110-6.5 3.25 3.25 0 010 6.5z"
        fill={props.fillColor}
      />
    </Svg>
  );
}
