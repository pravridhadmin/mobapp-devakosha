import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator, Linking } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import HeroImage from '../components/HeroImage';
import Badge from '../components/Badge';
import DetailsTabs, { TabItem } from '../components/DetailsTabs';
import AddressRow from '../components/AddressRow';
import IconButton from '../components/IconButton';
import { getTempleDetailUrl } from '../api/cms';
import RenderHtmlContent from '../components/RenderHtmlContent';
import { TemplePage } from '../types/models';
import { isTempleOpen } from '../utils/timeHelper';
import ImageGallery from '../components/ImageGallery';
import InfoRow from '../components/InfoRow';
import { SafeAreaView } from 'react-native-safe-area-context';

type Props = NativeStackScreenProps<RootStackParamList, 'Details'>;

export default function DetailsScreen({ route, navigation }: Props) {
  const { itemId } = route.params;
  const [temple, setTemple] = useState<TemplePage>(null);
  const [loading, setLoading] = useState(true);
  
  
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const url = getTempleDetailUrl(itemId);
        const response = await fetch(url);
        const data = await response.json();
        setTemple(data);
      } catch (error) {
        console.error('Error fetching details:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchDetails();
  }, [itemId]);

  const carouselBlock = temple?.images?.find(block => block.type === 'carousel');
  const galleryImages = carouselBlock ? carouselBlock.value : [];

      const handleCall = () => {
        if (temple?.contact_number) {
            Linking.openURL(`tel:${temple?.contact_number}`);
        }
    };

    const handleEmail = () => {
        if (temple?.contact_email) {
            Linking.openURL(`mailto:${temple?.contact_email}`);
        }
    };
    const handleMap = () => {
        if (temple?.latitude && temple?.longitude) {
            Linking.openURL(`https://maps.google.com/?q=${temple.latitude},${temple.longitude}`);
        }
    };

  const tabs: TabItem[] = [
    {
      key: "about",
      label: "About",
      content: (<RenderHtmlContent htmlContent={temple?.description || ""} />),
    },
    {
      key: "gallery",
      label: "Gallery",
      content: (<ImageGallery galleryImages={galleryImages} imageSize={200} />),
    },
    {
      key: "contact",
      label: "Contact",
      content: (<>
        {temple?.address_line1 ? (
          <InfoRow label={"Address"}
            icon={'location-outline'}
            component={<>
              <Text className='text-primary flex-1  text-right' >{temple.address_line1}{'\n'}
                {temple.address_line2 && temple.address_line2}, {temple?.city || ''}{'\n'}
                {temple.postal_code && temple.postal_code + '\n'}
                {temple.district && temple.district?.title}, {temple?.state?.title || ''}</Text>
            </>} />
        ) : null}
        <InfoRow label={'Email'} value={temple?.contact_email || ""} icon={'mail-outline'} isClickable={true} onPress={handleEmail} />
                        <InfoRow label={'Call'} value={temple?.contact_number || ""} icon={'call-outline'} isClickable={true} onPress={handleCall} />
        </>
      )
    }
  ];

  return (
    <SafeAreaView className="flex-1 bg-background dark:bg-background-dark">
      {loading && (
        <View className="absolute inset-0 justify-center items-center bg-black bg-opacity-50 z-10">
          <ActivityIndicator size="large" color="#F97316" />
        </View>
      )}

      <ScrollView>
        <HeroImage
          imageUrl={temple?.featured_image?.[0]?.value || null}
        >
          {/* back button */}
          <View className="absolute top-10 left-6">
            <IconButton
              iconName="arrow-back"
              className="bg-white dark:bg-gray-800"
              onPress={() => navigation.goBack()}
            />
          </View>

          {/* year badge */}
          {temple?.built_year && (
            <View className="absolute bottom-10 left-6">
              <Badge text={temple.built_year} />
            </View>
          )}

          {/* status badge */}
          {temple?.morning_start && temple?.morning_end && temple?.evening_start && temple?.evening_end && (
            <View className="absolute bottom-10 right-6">
              <Badge text={isTempleOpen(temple) ? "Open Now" : "Closed"} color={isTempleOpen(temple) ? "bg-green-500" : "bg-red-500"} />
            </View>
          )}
        </HeroImage>
        <View className="flex-1  bg-background dark:bg-background-dark rounded-t-3xl -mt-6 px-5 pt-6">

          {/* Title */}
          <Text className="text-primary dark:text-primary-dark text-3xl font-semibold">
            {temple?.title || "Temple Name"}
          </Text>

          {/* Address */}
          <AddressRow
            city={temple?.city || temple?.district?.title}
            state={temple?.state?.title}
            onPress={handleMap}
          />

          {/* Tabs */}
          <DetailsTabs tabs={tabs} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}