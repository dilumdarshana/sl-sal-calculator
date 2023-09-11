import { StyleSheet } from "react-native";

import { COLORS, FONT, SIZES } from "../../constants";

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  welcomeMessage: {
    fontFamily: FONT.bold,
    fontSize: SIZES.xLarge,
    color: COLORS.primary,
    marginTop: 2,
  },
  salContainer: {
    // justifyContent: "center",
    // alignItems: "center",
    marginTop: 10,
  },
  salInputWrapper: {
    flex: 1,
    backgroundColor: COLORS.white,
    marginRight: SIZES.small,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: SIZES.medium,
    width: "100%",
    marginTop: 20
  },
  salInput: {
    fontFamily: FONT.regular,
    width: "100%",
    height: "100%",
    paddingHorizontal: SIZES.medium,
    height: 40,
  },
  salDetails: {
    marginTop: 20,
    justifyContent: "left",
    alignItems: "left",
  },
  salDetailsText: {
    fontFamily: FONT.regular,
    fontSize: SIZES.medium,
    lineHeight: 40
  },
});

export default styles;
