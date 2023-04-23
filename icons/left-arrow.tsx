import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

const LeftArrow = (props: SvgProps) => (
  <Svg
    width={24}
    height={24}
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    {...props}>
    <Path d="M19 12H5M12 19l-7-7 7-7" />
  </Svg>
);
export default LeftArrow;
