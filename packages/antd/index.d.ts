import { ButtonProps } from 'antd/lib/button';

declare type SumbitProps = {
  status: 'submitting' | string;
} & ButtonProps;

export function Submit(
  props: React.ComponentPropsWithRef<SubmitProps>
): React.ComponentType<SubmitProps>;

declare type ResetProps = {
  reset: (event: React.MouseEvent<any, MouseEvent>) => void;
} & ButtonProps;

export function Reset(props: React.PropsWithChildren<ResetProps>): React.ComponentType<ResetProps>;

declare type FormButtonGroupProps = {
  itemStyle: React.CSSProperties;
};

export function FormButtonGroup(
  props: FormButtonGroupProps
): React.ComponentType<FormButtonGroupProps>;

declare type RowProps = {
  prefix?: string;
  pure?: boolean;
  fixed?: boolean;
  gutter?: number;
  wrap?: boolean;
  component?: string;
  fixedWidth?: number;
  align?: string;
  justify?: string;
  hidden?: boolean;
  className?: string;
  [x: string]: any;
};

export class Row extends React.Component<RowProps> {
  static defaultProps: {
    prefix: string;
    pure: boolean;
    fixed: boolean;
    gutter: number;
    wrap: boolean;
    component: string;
  };

  render(): JSX.Element;
}

type PointType =
  | {
      span?: string | number;
      offset?: string | number;
    }
  | string
  | number;

declare type ColProps = {
  prefix?: string;
  pure?: boolean;
  component?: string;
  span?: string | number;
  offset?: string | number;
  fixedSpan?: string | number;
  align?: string | number;
  hidden?: boolean;
  xxs?: PointType;
  xs?: PointType;
  s?: PointType;
  m?: PointType;
  l?: PointType;
  xl?: PointType;
};

export class Col extends React.Component<ColProps> {
  static isNextCol: boolean;
  static defaultProps: {
    prefix: string;
    pure: boolean;
    component: string;
  };

  render(): JSX.Element;
}
