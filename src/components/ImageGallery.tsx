import React, { useState, useMemo } from "react";
import { View, ScrollView, Image, Pressable } from "react-native";
import ImageViewing from "react-native-image-viewing";

type GalleryImage = {
  id?: string | number;
  value?: string;
  uri?: string;
};

type ImageGalleryProps = {
  galleryImages?:  any[];
  imageSize?: number;
};

const ImageGallery: React.FC<ImageGalleryProps> = ({
  galleryImages = [],
  imageSize = 140,
}) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // Format images for viewer
  const formattedImages = useMemo(() => {
    return galleryImages.map((img) => ({
      uri: img.value || img.uri || "",
    }));
  }, [galleryImages]);

  if (!galleryImages.length) return null;

  return (
    <View className="mt-4">
      {/* Horizontal Thumbnails */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerClassName="pr-4"
      >
        {galleryImages.map((img, index) => {
          const imageUri = img.value || img.uri;

          if (!imageUri) return null;

          return (
            <Pressable
              key={img.id ?? index}
              onPress={() => {
                setCurrentIndex(index);
                setVisible(true);
              }}
              className="mr-3"
            >
              <Image
                source={{ uri: imageUri }}
                resizeMode="cover"
                style={{
                  width: imageSize,
                  height: imageSize * 0.75,
                }}
                className="rounded-2xl bg-gray-200 border border-gray-100"
              />
            </Pressable>
          );
        })}
      </ScrollView>

      {/* Fullscreen Viewer */}
      <ImageViewing
        images={formattedImages}
        imageIndex={currentIndex}
        visible={visible}
        onRequestClose={() => setVisible(false)}
      />
    </View>
  );
};

export default ImageGallery;