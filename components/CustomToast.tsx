import { View, Text, Dimensions } from 'react-native'
import React from 'react'
import { Toast, useToastState } from '@tamagui/toast'
import { XStack } from 'tamagui'
import { scaleHorizontal, scaleVertical } from '@/utils/responsive'
import DangerIcon from '@/assets/svg/danger.svg'
type Props = {}

const CustomToast = (props: Props) => {
  const currentToast = useToastState()
  const { width, height } = Dimensions.get('window');

  if (!currentToast || currentToast.isHandledNatively) {
    return null
  }
  return (
    <Toast
      key={currentToast?.id}
      duration={currentToast?.duration}
      enterStyle={{ opacity: 0, scale: 0.4, y: height }}
      exitStyle={{ opacity: 0, scale: 1, y: height }}
      y={height-scaleVertical(120)}
      x={Math.round(width/2) - scaleHorizontal(110)}
      opacity={1}
      scale={1}
      animation="100ms" 
      viewportName={currentToast?.viewportName} 
      height={scaleVertical(45)}
      borderRadius={12}
      backgroundColor={"#FFEBEB"}
      width={scaleHorizontal(220)}
    >
      <XStack justifyContent='center' alignItems='center' columnGap={scaleHorizontal(5)}>
        <DangerIcon color={"#F65151"} height={scaleVertical(30)} width={scaleHorizontal(30)} />
        <Toast.Title fontSize={scaleVertical(14)}>{currentToast?.title}!!!</Toast.Title>
        {!!currentToast?.message && (
          <Toast.Description>{currentToast.message}</Toast.Description>
        )}
      </XStack>
    </Toast>
  )
}

export default CustomToast