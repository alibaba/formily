import React from 'react'
import { isFn, getIn, camelCase, isEqual } from '../utils'
import { IFieldProps } from '../type'

export interface ICircleButtonProps {
  onClick: React.MouseEvent
  hasText: boolean
}

export interface IArrayFieldOptions {
  TextButton: React.ComponentType
  CircleButton: React.ComponentType<ICircleButtonProps>
  AddIcon: React.ComponentType
  RemoveIcon: React.ComponentType
  MoveDownIcon: React.ComponentType
  MoveUpIcon: React.ComponentType
}

export interface IArrayFieldProps extends IFieldProps {
  className?: string
}

export class ArrayFieldComponent<P> extends React.Component<P> {
  public isActive: (key: string, value: any) => boolean
  public onClearErrorHandler: () => () => void
  public renderRemove: (index: number, item: any) => React.ReactElement
  public renderMoveDown: (index: number, item: any) => React.ReactElement
  public renderMoveUp: (index: number) => React.ReactElement
  public renderExtraOperations: (index: number) => React.ReactElement
  public renderEmpty: (title?: string) => React.ReactElement
  public renderAddition: () => React.ReactElement
  public getProps: (path?: string) => any
}

export type TypeArrayField<P> = new (props: P, context) => ArrayFieldComponent<
  P
>

export const createArrayField = (
  options: IArrayFieldOptions
): TypeArrayField<IArrayFieldProps> => {
  const {
    TextButton,
    CircleButton,
    AddIcon,
    RemoveIcon,
    MoveDownIcon,
    MoveUpIcon
  } = {
    TextButton: () => <div>You Should Pass The TextButton.</div>,
    CircleButton: () => <div>You Should Pass The CircleButton.</div>,
    AddIcon: () => <div>You Should Pass The AddIcon.</div>,
    RemoveIcon: () => <div>You Should Pass The RemoveIcon.</div>,
    MoveDownIcon: () => <div>You Should Pass The MoveDownIcon.</div>,
    MoveUpIcon: () => <div>You Should Pass The MoveUpIcon.</div>,
    ...options
  }

  return class ArrayFieldComponent extends React.Component<IFieldProps> {
    public isActive = (key: string, value: any): boolean => {
      const readOnly:
        | boolean
        | ((key: string, value: any) => boolean) = this.getProps('readOnly')
      const disabled = this.getDisabled()
      if (isFn(disabled)) {
        return disabled(key, value)
      } else if (isFn(readOnly)) {
        return readOnly(key, value)
      } else {
        return !readOnly && !disabled
      }
    }

    public getApi(index: number) {
      const { value } = this.props
      return {
        index,
        isActive: this.isActive,
        dataSource: value,
        record: value[index],
        add: this.onAddHandler(),
        remove: this.onRemoveHandler(index),
        moveDown: e => {
          return this.onMoveHandler(
            index,
            index + 1 > value.length - 1 ? 0 : index + 1
          )(e)
        },
        moveUp: e => {
          return this.onMoveHandler(
            index,
            index - 1 < 0 ? value.length - 1 : index - 1
          )(e)
        }
      }
    }

    public getProps(path?: string): any {
      return getIn(this.props.schema, `x-props${path ? '.' + path : ''}`)
    }

    public renderWith(name: string, index, defaultRender?) {
      const render = this.getProps(camelCase(`render-${name}`))
      if (isFn(index)) {
        defaultRender = index
        index = 0
      }
      if (isFn(render)) {
        return render(this.getApi(index))
      } else if (defaultRender) {
        return isFn(defaultRender)
          ? defaultRender(this.getApi(index), render)
          : defaultRender
      }
    }

    public renderAddition() {
      const { locale } = this.props
      const { value } = this.props
      return (
        this.isActive('addition', value) &&
        this.renderWith(
          'addition',
          (
            {
              add
            }: { add?: (event: React.MouseEvent<HTMLDivElement>) => void } = {},
            text: string
          ) => {
            return (
              <div className={'array-item-addition'} onClick={add}>
                <TextButton>
                  <AddIcon />
                  {text || locale.addItem || '添加'}
                </TextButton>
              </div>
            )
          }
        )
      )
    }

    public renderEmpty() {
      const { locale, value } = this.props
      return (
        value.length === 0 &&
        this.renderWith('empty', ({ add, isActive }, text) => {
          const active = isActive('empty', value)
          return (
            <div
              className={`array-empty-wrapper ${!active ? 'disabled' : ''}`}
              onClick={active ? add : undefined}
            >
              <div className={'array-empty'}>
                <img
                  style={{ backgroundColor: 'transparent' }}
                  src={
                    '//img.alicdn.com/tfs/TB1cVncKAzoK1RjSZFlXXai4VXa-184-152.svg'
                  }
                />
                {active && (
                  <TextButton>
                    <AddIcon />
                    {text || locale.addItem || '添加'}
                  </TextButton>
                )}
              </div>
            </div>
          )
        })
      )
    }

    public renderRemove(index: number, item: any): React.ReactElement {
      return (
        this.isActive(`${index}.remove`, item) &&
        this.renderWith('remove', index, ({ remove }, text) => {
          return (
            <CircleButton onClick={remove} hasText={!!text}>
              <RemoveIcon />
              {text && <span className={'op-name'}>{text}</span>}
            </CircleButton>
          )
        })
      )
    }

    public renderMoveDown(index: number, item: any) {
      const { value } = this.props
      return (
        value.length > 1 &&
        this.isActive(`${index}.moveDown`, item) &&
        this.renderWith('moveDown', index, ({ moveDown }, text) => {
          return (
            <CircleButton onClick={moveDown} hasText={!!text}>
              <MoveDownIcon />
              <span className={'op-name'}>{text}</span>
            </CircleButton>
          )
        })
      )
    }

    public renderMoveUp(index: number) {
      const { value } = this.props
      return (
        value.length > 1 &&
        this.isActive(`${index}.moveUp`, value) &&
        this.renderWith('moveUp', index, ({ moveUp }, text) => {
          return (
            <CircleButton onClick={moveUp} hasText={!!text}>
              <MoveUpIcon />
              <span className={'op-name'}>{text}</span>
            </CircleButton>
          )
        })
      )
    }

    public renderExtraOperations(index: number) {
      return this.renderWith('extraOperations', index)
    }

    public getDisabled(): boolean | ((key: string, value: any) => boolean) {
      const { editable, name } = this.props
      const disabled = this.getProps('disabled')
      if (editable !== undefined) {
        if (isFn(editable)) {
          if (!editable(name)) {
            return true
          }
        } else if (editable === false) {
          return true
        }
      }
      return disabled
    }

    // TODO e 类型
    public onRemoveHandler(index: number): (e: any) => void {
      const { value, mutators, schema, locale } = this.props
      const { minItems } = schema
      return e => {
        e.stopPropagation()
        if (minItems >= 0 && value.length - 1 < minItems) {
          mutators.errors(locale.array_invalid_minItems, minItems)
        } else {
          mutators.remove(index)
        }
      }
    }

    public onMoveHandler(from: number, to: number): (e: any) => void {
      const { mutators } = this.props
      return e => {
        e.stopPropagation()
        mutators.move(from, to)
      }
    }

    public onAddHandler() {
      const { value, mutators, schema, locale } = this.props
      const { maxItems } = schema
      return e => {
        e.stopPropagation()
        if (maxItems >= 0 && value.length + 1 > maxItems) {
          mutators.errors(locale.array_invalid_maxItems, maxItems)
        } else {
          mutators.push()
        }
      }
    }

    public onClearErrorHandler() {
      return () => {
        const { value, mutators, schema } = this.props
        const { maxItems, minItems } = schema
        if (
          (maxItems >= 0 && value.length <= maxItems) ||
          (minItems >= 0 && value.length >= minItems)
        ) {
          mutators.errors()
        }
      }
    }

    public validate() {
      const { value, mutators, schema, locale } = this.props
      const { maxItems, minItems } = schema
      if (value.length > maxItems) {
        mutators.errors(locale.array_invalid_maxItems, maxItems)
      } else if (value.length < minItems) {
        mutators.errors(locale.array_invalid_minItems, minItems)
      } else {
        mutators.errors()
      }
    }

    public componentDidUpdate(prevProps) {
      if (!isEqual(prevProps.value, this.props.value)) {
        this.validate()
      }
    }

    public componentDidMount() {
      this.validate()
    }
  }
}
