import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

const RightArrow = (props: SvgProps) => (
  <Svg
    width={24}
    height={24}
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    {...props}>
    <Path d="M5 12h14M12 5l7 7-7 7" />
  </Svg>
);
export default RightArrow;
