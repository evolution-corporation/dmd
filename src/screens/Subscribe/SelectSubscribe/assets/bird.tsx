import React, { FC } from "react";
import { ColorValue } from "react-native";
import Svg, { Path } from "react-native-svg";

const Bird: FC<{ color: ColorValue }> = (props) => (
  <Svg width={19} height={20} fill="none">
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M18.986 5.423a2.06 2.06 0 0 0-.113-.95 2.133 2.133 0 0 0-.533-.807 2.254 2.254 0 0 0-.847-.506 2.329 2.329 0 0 0-.991-.103c-.254.031-.502.1-.733.205-.405.19-.74.494-.963.87a2.076 2.076 0 0 0-.283 1.238c.044.468.242.91.563 1.263.301.32.695.546 1.132.65a2.346 2.346 0 0 0 1.662-.223c.394-.216.708-.543.9-.937.055-.11.101-.223.138-.338.032-.118.055-.238.068-.359v-.003Zm-8.081 6.454C8.75 10.801 7.034 9.064 6.03 6.943A10.011 10.011 0 0 1 5.37.18a.228.228 0 0 1 .115-.148.25.25 0 0 1 .19-.021c13.44 3.767 8.12 22.81-5.49 19.634a.253.253 0 0 1-.153-.11.231.231 0 0 1-.024-.183c.684-2.233 2.128-4.182 4.103-5.537a11.209 11.209 0 0 1 6.793-1.937Z"
      fill={props.color}
    />
  </Svg>
);

export default Bird;
