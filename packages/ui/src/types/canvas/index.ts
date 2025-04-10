export interface ICanvasImage {
  imageId: number;
}

export interface ICanvasForm {
  name: string;
  width: number;
  height: number;
  direction: 'Horizontal' | 'Vertical';
  objects: string;
  canvasImageId: number;
  mediaIds: string[];
  templateId?: number;
  templateMediaIds?: string[];
}

export interface ICanvasList {
  object: string;
  canvasId: string;
  name: string;
  imageUrl: string;
  createdDate: string;
}

export interface ICanvasDetail extends ICanvasForm {
  canvasId: string;
  createdDate: string;
}
