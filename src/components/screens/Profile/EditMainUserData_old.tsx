import React from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { EvilIcons } from "@expo/vector-icons";

import { contextHook } from "~modules/account";
import {
  ColorButton,
  SelectImageButton,
  NicknameInput,
} from "~components/dump";
import Tools from "~core";

const EditMainUserDataScreen = ({}) => {
  const { state, func } = contextHook.account();
  return (
    <View style={styles.background}>
      <View style={{ width: "100%", alignItems: "center" }}>
        <SelectImageButton
          style={styles.selectImage}
          onChangeImage={(base64) => {
            if (base64) {
              func.editUserData({
                image: base64,
              });
            }
          }}
        />
        <TextInput
          style={styles.TextInputTransparent}
          key={"name"}
          placeholder={Tools.i18n.t("b89f2757-8b5e-4a08-b8f8-1bbe87834f3e")}
          placeholderTextColor={"rgba(231, 221, 236, 1)"}
          onChangeText={(text) => {
            func.editUserData({
              display_name: text,
            });
          }}
          defaultValue={
            state.editUserData?.display_name ?? state.userData?.displayName
          }
        />
        <NicknameInput
          defaultValue={
            state.editUserData?.nickName ?? state.userData?.nickName
          }
          onEndChange={(nickName, status) => {
            func.editUserData({ nickName });
          }}
          styleNicknameInputView={styles.editNickname}
        />
        <TouchableOpacity style={styles.inputBirthday}>
          <Text style={styles.inputBirthdayText}>
            {Tools.i18n.l(
              "date.formats.short",
              state.editUserData?.birthday ?? state.userData?.birthday
            )}
          </Text>
          <EvilIcons name="pencil" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
      <ColorButton
        styleButton={styles.saveButton}
        styleText={styles.saveButtonText}
      >
        {Tools.i18n.t("save")}
      </ColorButton>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    paddingHorizontal: 30,
    justifyContent: "space-between",
    paddingBottom: 80,
    backgroundColor: "#9765A8",
    flex: 1,
  },

  TextInputTransparent: {
    color: "#FFFFFF",
    fontSize: 14,
    ...Tools.gStyle.font("400"),
    paddingRight: 44,
    width: "100%",
    height: 45,
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 15,
    backgroundColor: "rgba(240, 242, 238, 0.19)",
    paddingHorizontal: 15,
    borderColor: "rgba(194, 169, 206, 1)",
    marginVertical: 7.5,
  },
  editNickname: {
    marginVertical: 7.5,
  },
  inputDateBirthDay: {
    marginVertical: 7.5,
  },
  inputBirthday: {
    backgroundColor: "rgba(240, 242, 238, 0.19)",
    borderColor: "#C2A9CE",
    borderWidth: 1,
    borderRadius: 15,
    marginTop: 7.5,
    width: "100%",
    flexDirection: "row",
    height: 45,
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 14,
    paddingRight: 7,
  },
  buttonTextEditBirthday: {
    color: "#FFFFFF",
    textAlign: "left",
    flex: 1,
    marginLeft: 20,
  },
  saveButton: {
    backgroundColor: "#C2A9CE",
    borderRadius: 10,
  },
  saveButtonText: {
    color: "#FFFFFF",
  },
  selectImage: {
    height: 124,
    width: 124,
    borderRadius: 30,
    borderColor: "#C2A9CE",
    borderWidth: 3,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  inputBirthdayText: {
    color: "#FFFFFF",
    fontSize: 13,
    ...Tools.gStyle.font("400"),
  },
});

export default EditMainUserDataScreen;