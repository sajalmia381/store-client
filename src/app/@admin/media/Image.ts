export interface Image {
  _id: string;
  name?: string;
  size?: number;
  type?: string;
  dimensions?: string;
  usedCount: number;
  webUrl: string;
}
