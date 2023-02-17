export enum ElementTypes {
  'control',
  'group',
  'array',
}

interface Element {
  key: string;
  level: number;
}

export interface ControlType extends Element {
  value: any;
  elementType: ElementTypes.control;
  inputType?: any;
  text: string;
}

export interface GroupType extends Element {
  children: any[];
  elementType: ElementTypes.group;
}

export interface ArrayType extends Element {
  children: object[];
  elementType: ElementTypes.array;
}

export type FormElements = GroupType | ControlType | ArrayType;
