import React from "react";
import { View, Text, Image, Linking } from "react-native";
import { HtmlNode, parseHtml } from "../utils/htmlParser";

interface Props {
  htmlContent:string;
}

const RenderHtmlContent: React.FC<Props> = ({ htmlContent }) => {

    const nodes = parseHtml(htmlContent);

  const renderNode = (node: HtmlNode, key: number): React.ReactNode => {
    if (node.type === "text") {
      return (
        <Text key={key} className=" text-black dark:text-white text-base leading-6">
          {node.content}
        </Text>
      );
    }

    const { tag, children, attribs } = node;

    switch (tag) {
      case "p":
        return (
          <View key={key} className="mb-4 text-black dark:text-white">
            {children.map(renderNode)}
          </View>
        );

      case "h1":
        return (
          <Text key={key} className="text-black dark:text-white text-3xl font-semibold mb-4">
            {children.map(renderNode)}
          </Text>
        );

      case "h2":
        return (
          <Text key={key} className="text-black dark:text-white text-2xl font-semibold mb-4">
            {children.map(renderNode)}
          </Text>
        );
      case "h3":
        return (
          <Text key={key} className="text-black dark:text-white text-xl font-semibold mb-4">
            {children.map(renderNode)}
          </Text>
        );
      case "h4":
        return (
          <Text key={key} className="text-black dark:text-white text-lg font-semibold mb-4">
            {children.map(renderNode)}
          </Text>
        );

      case "strong":
      case "b":
        return (
          <Text key={key} className="font-bold text-black dark:text-white">
            {children.map(renderNode)}
          </Text>
        );

      case "em":
        return (
          <Text key={key} className="italic text-black dark:text-white">
            {children.map(renderNode)}
          </Text>
        );

      case "ul":
        return (
          <View key={key} className="mb-4 pl-4  text-black dark:text-white">
            {children.map(renderNode)}
          </View>
        );

      case "li":
        return (
          <View key={key} className="flex-row mb-2">
            <Text className="text-orange-500 mr-2">•</Text>
            <View className="flex-1">
              {children.map(renderNode)}
            </View>
          </View>
        );

      case "img":
        return (
          <Image
            key={key}
            source={{ uri: attribs?.src }}
            className="w-full h-52 rounded-2xl my-4"
            resizeMode="cover"
          />
        );

      case "a":
        return (
          <Text
            key={key}
            className="text-orange-500 underline"
            onPress={() => {
              if (attribs?.href) {
                Linking.openURL(attribs.href);
              }
            }}
          >
            {children.map(renderNode)}
          </Text>
        );

      default:
        return (
          <View key={key} className="mb-4 text-black dark:text-white">
            {children.map(renderNode)}
          </View>
        );
    }
  };

  return <View>{nodes.map(renderNode)}</View>;
};

export default RenderHtmlContent;