import { Route, useTheme } from '@react-navigation/native';
import * as React from 'react';
import {
  ScreenStackHeaderBackButtonImage,
  ScreenStackHeaderCenterView,
  ScreenStackHeaderConfig,
  ScreenStackHeaderLeftView,
  ScreenStackHeaderRightView,
} from 'react-native-screens';
import { NativeStackNavigationOptions } from '../types';
import { processFonts } from './FontProcessor';

type Props = NativeStackNavigationOptions & {
  route: Route<string>;
};

export default function HeaderConfig({
  route,
  title,
  headerRight,
  headerLeft,
  headerCenter,
  headerTitle,
  headerBackTitle,
  headerBackTitleVisible = true,
  backButtonImage,
  headerHideBackButton,
  headerHideShadow,
  headerLargeTitleHideShadow,
  headerTintColor,
  headerTopInsetEnabled = true,
  headerLargeTitle,
  headerTranslucent,
  headerStyle = {},
  headerLargeStyle = {},
  headerTitleStyle = {},
  headerLargeTitleStyle = {},
  headerBackTitleStyle = {},
  headerShown,
  backButtonInCustomView,
  direction,
}: Props): JSX.Element {
  const { colors } = useTheme();
  const tintColor = headerTintColor ?? colors.primary;

  const [
    backTitleFontFamily,
    largeTitleFontFamily,
    titleFontFamily,
  ] = processFonts([
    headerBackTitleStyle.fontFamily,
    headerLargeTitleStyle.fontFamily,
    headerTitleStyle.fontFamily,
  ]);

  return (
    <ScreenStackHeaderConfig
      backButtonInCustomView={backButtonInCustomView}
      backgroundColor={
        headerStyle.backgroundColor ? headerStyle.backgroundColor : colors.card
      }
      backTitle={headerBackTitleVisible ? headerBackTitle : ' '}
      backTitleFontFamily={backTitleFontFamily}
      backTitleFontSize={headerBackTitleStyle.fontSize}
      blurEffect={headerStyle.blurEffect}
      color={tintColor}
      direction={direction}
      hidden={headerShown === false}
      hideBackButton={headerHideBackButton}
      hideShadow={headerHideShadow}
      largeTitle={headerLargeTitle}
      largeTitleBackgroundColor={headerLargeStyle.backgroundColor}
      largeTitleColor={headerLargeTitleStyle.color}
      largeTitleFontFamily={largeTitleFontFamily}
      largeTitleFontSize={headerLargeTitleStyle.fontSize}
      largeTitleHideShadow={headerLargeTitleHideShadow}
      title={
        headerTitle !== undefined
          ? headerTitle
          : title !== undefined
          ? title
          : route.name
      }
      titleColor={
        headerTitleStyle.color !== undefined
          ? headerTitleStyle.color
          : headerTintColor !== undefined
          ? headerTintColor
          : colors.text
      }
      titleFontFamily={titleFontFamily}
      titleFontSize={headerTitleStyle.fontSize}
      topInsetEnabled={headerTopInsetEnabled}
      translucent={headerTranslucent === true}>
      {headerRight !== undefined ? (
        <ScreenStackHeaderRightView>
          {headerRight({ tintColor })}
        </ScreenStackHeaderRightView>
      ) : null}
      {backButtonImage !== undefined ? (
        <ScreenStackHeaderBackButtonImage
          key="backImage"
          source={backButtonImage}
        />
      ) : null}
      {headerLeft !== undefined ? (
        <ScreenStackHeaderLeftView>
          {headerLeft({ tintColor })}
        </ScreenStackHeaderLeftView>
      ) : null}
      {headerCenter !== undefined ? (
        <ScreenStackHeaderCenterView>
          {headerCenter({ tintColor })}
        </ScreenStackHeaderCenterView>
      ) : null}
    </ScreenStackHeaderConfig>
  );
}
