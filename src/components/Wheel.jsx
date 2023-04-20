import { Feather } from '@expo/vector-icons'
import * as React from 'react'
import { Animated, Easing } from 'react-native'


export const LoadingSpinner = React.memo(
  ({ color = "#996633", size = 12, fadeInDelay = 1000, ...props }) => {
    const fadeInValue = new Animated.Value(0)
    const spinValue = new Animated.Value(0)

    Animated.sequence([
      Animated.delay(fadeInDelay),
      Animated.timing(fadeInValue, {
        toValue: 1,
        duration: 1500,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ]).start()

    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 360,
        duration: 300000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start()

    return (
      <Animated.View
        style={{
          opacity: fadeInValue,
          transform: [{ rotate: spinValue }],
        }}
      >
        <Feather
          name="loader"
          size={size}
          style={{
            color,
            alignSelf: 'center',
          }}
          {...props.featherProps}
        />
      </Animated.View>
    )
  }
)