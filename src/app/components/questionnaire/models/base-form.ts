export class BaseForm<T> {
  linkId: number;
  value: T | undefined;
  text: string;
  required: string;
  order: number;
  type: string;
  answer: string;
  item: BaseForm<T>[];

  constructor(
    options: {
      linkId?: number;
      value?: T;
      text?: string;
      required?: string;
      type?: string;
      item?: BaseForm<T>[];
    } = {},
  ) {
    this.linkId = options.linkId;
    this.value = options.value;
    this.text = options.text || '';
    this.required = options.required || 'true';
    this.type = options.type || '';
    this.item = options.item;
  }
}
