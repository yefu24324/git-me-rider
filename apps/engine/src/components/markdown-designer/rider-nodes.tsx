import type { Heading, Image, Paragraph, Text } from "mdast";

export interface RiderMap {
  header: HeaderRiderNode;
  paragraph: ParagraphRiderNode;
  image: ImageRiderNode;
  text: TextRiderNode;
}

export type RiderNode = RiderMap[keyof RiderMap];

export interface HeaderRiderNode {
  id: string;
  type: "header";
  node: Heading;
  children: RiderNode[];
}

export interface ParagraphRiderNode {
  id: string;
  type: "paragraph";
  node: Paragraph;
  children: RiderNode[];
}

export interface ImageRiderNode {
  id: string;
  type: "image";
  node: Image;
}

export interface TextRiderNode {
  id: string;
  type: "text";
  node: Text;
}
