import React, { useCallback } from 'react'
import InfoRow from './InfoRow'
import { TemplePage } from '../types/models'
import { handleCall, handleEmail, handleMap } from '../utils/helperFunctions';
import { i18n } from 'i18next';
import { Text, View } from 'react-native';
import { formatTime } from '../utils/timeHelper';

interface Props {
    temple: TemplePage,
    t: any
}


const DetailConnect = ({ temple, t }: Props) => {
    const handleEmailPress = useCallback(() => {
        if (temple?.contact_email) {
            handleEmail(temple.contact_email);
        }
    }, [temple]);

    const handleCallPress = useCallback(() => {
        if (temple?.contact_number) {
            handleCall(temple.contact_number);
        }
    }, [temple]);
    const handleMapPress = useCallback(() => {
        if (temple?.latitude && temple?.longitude) {
            handleMap(temple?.latitude, temple?.longitude)
        }
    }, [temple]);
    return (
        <>
            {temple?.address_line1 ? (
                <InfoRow label={t('details.address')}
                    icon={'location-outline'}
                    isClickable={!!temple?.latitude && !!temple?.longitude}
                    onPress={handleMapPress}
                    value={[
                        temple?.address_line1,
                        temple?.address_line2,
                        temple?.address_line3,
                        temple?.city,
                        temple?.district?.title,
                        temple?.state?.title,
                        temple?.postal_code
                    ]
                        .filter(Boolean)
                        .join(", ")} />
            ) : null}
            <InfoRow label={t('details.email')} value={temple?.contact_email || ""} icon={'mail-outline'} isClickable={true} onPress={handleEmailPress} />
            <InfoRow label={t('details.call')} value={temple?.contact_number || ""} icon={'call-outline'} isClickable={true} onPress={handleCallPress} />
            <InfoRow label={t('details.timings')} icon={'time-outline'} component={
                <View>
                <View className="flex-row justify-between mb-2">
                    <Text className="text-text-primary dark:text-text-primary-dark">{t("details.morning")}: </Text>
                    <Text className="font-medium text-text-primary dark:text-text-primary-dark">{formatTime(temple.morning_start)} - {formatTime(temple.morning_end) || t("details.not_available")}</Text>
                </View>

                {/* Evening */}
                <View className="flex-row justify-between">
                    <Text className="text-text-primary dark:text-text-primary-dark">{t("details.evening")}: </Text>
                    <Text className="font-medium text-text-primary dark:text-text-primary-dark">{formatTime(temple.evening_start)} - {formatTime(temple.evening_end) || t("details.not_available")}</Text>
                </View>
                </View>
            }  />
           
        </>
    )
}

export default DetailConnect
