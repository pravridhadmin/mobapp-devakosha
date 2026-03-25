import { Ionicons } from '@expo/vector-icons'
import React, { Children } from 'react'
import { Platform } from 'react-native'
import { KeyboardAvoidingView, Modal, Pressable, Text, TouchableWithoutFeedback, View } from 'react-native'

interface Props {
    onClose: () => void
    visible: boolean
    modelTitle: string,
    children: React.ReactNode
}

const BottomModel = ({ onClose, visible, modelTitle, children }: Props) => {
  return (
   <Modal
            visible={visible}
            transparent
            animationType="slide"
            statusBarTranslucent
        >
            {/* Background Overlay */}
            <TouchableWithoutFeedback onPress={onClose}>
                <View className="flex-1 bg-black/60 justify-end">
                    {/* Stop closing when pressing inside modal */}
                    <TouchableWithoutFeedback>
                        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                            <View className="bg-background dark:bg-background-dark rounded-t-3xl px-5 pt-4 pb-24">

                                {/* Drag Indicator */}
                                <View className="items-center mb-4">
                                    <View className="w-12 h-1.5  bg-zinc-400 dark:bg-zinc-600 rounded-full" />
                                </View>

                                {/* Header */}
                                <View className="flex-row items-center justify-between mb-6">
                                    <Text className="flex-1 text-text-primary dark:text-text-primary-dark text-2xl font-semibold">
                                        {modelTitle}
                                    </Text>

                                    <Pressable onPress={onClose}>
                                        <Ionicons name="close" size={24} color="#A1A1AA" />
                                    </Pressable>
                                </View>

                                {/* SEARCH */}
                               {children}
                            </View>
                        </KeyboardAvoidingView>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
  )
}

export default BottomModel
