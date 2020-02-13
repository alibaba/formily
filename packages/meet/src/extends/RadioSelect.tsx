import React, { createElement } from 'react';
import { Select } from '@alifd/meet'
import RadioPicker from './RadioPicker';
import WithStyles from '@alifd/meet/lib/utils/with-styles';
import DrawerStylesProvider from '@alifd/meet/lib/drawer/styles';
import TextFieldStylesProvider from '@alifd/meet/lib/text-field/styles';
import ButtonStylesProvider from '@alifd/meet/lib/button/styles';
import SelectStylesProvider from '@alifd/meet/lib/select/styles';
const { Base } = Select;
const getLabel = (value, data, delimiter) => {
  const pickerValue = value ? Array.isArray(value) ? value : [value] : [];
  if (!pickerValue || pickerValue.length === 0) {
    return '';
  }
  const treeChildren = pickerValue.map((v) => data.find((d) => d.value === v));
  return treeChildren.map((v) => v ? v.label : '').join(delimiter);
}

const RadioSelect = React.forwardRef((props, ref) => {
  const {
    type = 'single',
    delimiter = ',',
    title,
    locale,
    styles = {},
    ...others
  } = props;
  const renderPicker = (_ref) => {
    const {
      data,
      value,
      visible,
      onHide,
      onChange,
      valueLabel,
      setValueLabel
    } = _ref;
    const label = getLabel(value, data, delimiter);

    if (label !== valueLabel) {
      setValueLabel(label);
    }
    // const onChange = (v) => {
    //     console.log(v);
    //     return _onChange(type === SelectType.SINGLE ? v[0] : v);
    // }

    return (
      <RadioPicker
        {...others}
        type={type}
        data={data}
        visible={visible}
        onHide={onHide}
        title={title}
        styles={styles}
        onChange={onChange}
        value={value} />
    )
  }

  return (
    <Base
      {...others}
      styles={styles}
      renderPicker={renderPicker}
      ref={ref}
    />)
})

const StyledSelect = WithStyles(RadioSelect, [
  DrawerStylesProvider,
  TextFieldStylesProvider,
  ButtonStylesProvider,
  SelectStylesProvider,
]);

export default StyledSelect;
