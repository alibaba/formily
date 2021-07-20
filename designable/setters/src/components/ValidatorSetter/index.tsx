import { usePrefix } from '@designable/react'
import { FoldItem } from '@designable/react-settings-form/esm/components/FoldItem'
import { useField } from '@formily/react'
import { observer } from '@formily/reactive-react'
import cls from 'classnames'
import React, { Fragment, useMemo, useState } from 'react'
import './styles.less'
import { IValidatorInfo } from './types'
import { ValidatorList } from './ValidatorList'
import { ValidatorModal } from './ValidatorModal'

export interface IValidatorSetterProps {
  className?: string
  style?: React.CSSProperties
  onChange: (v) => void
  value: any
}

export const ValidatorSetter: React.FC<IValidatorSetterProps> = observer(
  (props) => {
    const { onChange, value, className, style } = props

    const validatorInfo = useMemo<IValidatorInfo>(
      () => ({
        validators: value || [],
        selectedValidator: undefined,
        selectedValidatorChangeHandler() {},
      }),
      [value]
    )

    const [modalVisible, setModalVisible] = useState(false)

    const openModal = () => setModalVisible(true)
    const closeModal = () => setModalVisible(false)

    const field = useField()
    const prefix = usePrefix('validator-setter')

    return (
      <Fragment>
        <FoldItem
          className={cls(prefix, className)}
          style={style}
          label={field.title}
        >
          <FoldItem.Base>
            {/* Add a ValidatorInput here may be more convenient */}
          </FoldItem.Base>
          <FoldItem.Extra>
            <ValidatorList
              onChange={onChange}
              validatorInfo={validatorInfo}
              onEditRuleClick={(v, selectedValidatorChangeHandler) => {
                validatorInfo.selectedValidator = v
                validatorInfo.selectedValidatorChangeHandler =
                  selectedValidatorChangeHandler
                openModal()
              }}
            ></ValidatorList>
          </FoldItem.Extra>
        </FoldItem>

        <ValidatorModal
          onChange={(v) => {
            validatorInfo.selectedValidatorChangeHandler(v)
          }}
          validatorInfo={validatorInfo}
          visible={modalVisible}
          closeModal={closeModal}
        ></ValidatorModal>
      </Fragment>
    )
  }
)
