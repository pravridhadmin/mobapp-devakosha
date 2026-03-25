import { parseDocument } from "htmlparser2";
import { Element, Text as DomText } from "domhandler";

export type HtmlNode =
  | {
      type: "text";
      content: string;
    }
  | {
      type: "element";
      tag: string;
      children: HtmlNode[];
      attribs?: Record<string, string>;
    };

export const parseHtml = (html: string): HtmlNode[] => {
  const document = parseDocument(html);

  const mapNode = (node: any): HtmlNode | null => {
    if (node.type === "text") {
      const trimmed = node.data.trim();
      if (!trimmed) return null;

      return {
        type: "text",
        content: trimmed,
      };
    }

    if (node.type === "tag") {
      return {
        type: "element",
        tag: node.name,
        attribs: node.attribs,
        children:
          node.children
            ?.map(mapNode)
            .filter(Boolean) as HtmlNode[],
      };
    }

    return null;
  };

  return document.children
    .map(mapNode)
    .filter(Boolean) as HtmlNode[];
};