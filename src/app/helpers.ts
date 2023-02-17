import { ControlType, GroupType } from './models';

export function color(level: number) {
  const color = ['#0D47A1', '#1E88E5', '#64B5F6', '#BBDEFB'];
  return color[level % color.length];
}

export function asControl(element: any): ControlType {
  return element as ControlType;
}

export function asGroup(element: any): GroupType {
  return element as GroupType;
}
