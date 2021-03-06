import Touchable from '@celo/react-components/components/Touchable'
import colors from '@celo/react-components/styles/colors'
import fontStyles from '@celo/react-components/styles/fonts'
import { debounce } from 'lodash'
import * as React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const BUTTON_TAP_DEBOUNCE_TIME = 300 // milliseconds
const DEBOUNCE_OPTIONS = {
  leading: true,
  trailing: false,
}

export enum BtnTypes {
  PRIMARY = 'Primary', // CeloGreen background and White text
  SECONDARY = 'Secondary', // Transparent background and CeloGreen text
  TERTIARY = 'Tertiary', // Transparent background and Dark text
}

export interface ButtonProps {
  onPress: () => void
  style?: any
  text: string | React.ReactNode
  accessibilityLabel?: string
  lineHeight?: number
  type: BtnTypes
  disabled?: boolean
  standard: boolean
  testID?: string
  children?: React.ReactNode
}

export default class Button extends React.Component<ButtonProps> {
  // Debounce onPress event so that it is called once on trigger and
  // consecutive calls in given period are ignored.
  debouncedOnPress = debounce(this.props.onPress, BUTTON_TAP_DEBOUNCE_TIME, DEBOUNCE_OPTIONS)

  componentDidUpdate(prevProps: ButtonProps, prevState: ButtonProps) {
    if (this.props.onPress !== prevProps.onPress) {
      this.debouncedOnPress.cancel()
      this.debouncedOnPress = debounce(
        this.props.onPress,
        BUTTON_TAP_DEBOUNCE_TIME,
        DEBOUNCE_OPTIONS
      )
    }
  }

  render() {
    const { text, accessibilityLabel, lineHeight, type, disabled, standard, children } = this.props
    let textColor
    let backgroundColor
    let borderColor

    const isPrimary = type === BtnTypes.PRIMARY
    const isSecondary = type === BtnTypes.SECONDARY
    const isTertiary = type === BtnTypes.TERTIARY

    switch (type) {
      case BtnTypes.PRIMARY:
        textColor = colors.white
        backgroundColor = disabled ? colors.celoGreenInactive : colors.celoGreen
        borderColor = disabled ? colors.celoGreenInactive : colors.celoGreen
        break
      case BtnTypes.SECONDARY:
        textColor = disabled ? colors.celoGreenInactive : colors.celoGreen
        backgroundColor = 'transparent'
        borderColor = disabled ? colors.celoGreenInactive : colors.celoGreen
        break
      case BtnTypes.TERTIARY:
        textColor = disabled ? colors.inactiveDark : colors.dark
        backgroundColor = 'transparent'
        borderColor = 'transparent'
        break
      default:
        if (__DEV__) {
          throw new Error('No Button Type Specified')
        }
        textColor = colors.white
        backgroundColor = disabled ? colors.celoGreenInactive : colors.celoGreen
    }

    return (
      <View
        style={[
          style.row,
          (isPrimary || isSecondary || isTertiary) && standard ? { marginVertical: 10 } : null,
          standard ? { marginBottom: 10 } : null,
          this.props.style,
          { backgroundColor },
        ]}
      >
        <Touchable
          onPress={this.debouncedOnPress}
          disabled={disabled}
          style={[
            style.button,
            { backgroundColor },
            lineHeight !== undefined ? { height: lineHeight } : { height: 50 },
            standard && (isPrimary || isSecondary || isTertiary)
              ? { borderColor, borderRadius: 3, borderWidth: 2 }
              : { borderWidth: 0 },
          ]}
          testID={this.props.testID}
        >
          <View style={style.containerButton}>
            {children}
            <Text
              accessibilityLabel={accessibilityLabel}
              style={[fontStyles.buttonText, { color: textColor }, style.text]}
            >
              {text}
            </Text>
          </View>
        </Touchable>
      </View>
    )
  }
}

const style = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 3,
  },
  button: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  containerButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    paddingLeft: 5,
    paddingRight: 5,
  },
})
