import { connect } from '@formily/react-schema-renderer'
import MeetRadioDrawer from '@alife/meet-radio-drawer';
import { mapStyledProps, mapTextComponent } from '../shared'
import React, { useState, useMemo } from 'react';
import View from 'rax-view';

export const RadioDrawer =
  connect({
    getProps: mapStyledProps,
    getComponent: mapTextComponent
  })(({ value, onChange, data, ...props }) => {
    const [visible, setVisible] = useState(false);
    const onConfirm = (data) => {
      setVisible(false);
      onChange(data && data[0] && data[0].value);
    }
    const text = useMemo(() => {
      const selected = data.find((item) => item.value === value) || {};
      return selected.label || '请选择';
    }, [visible, data]);

    return visible ? (
      <MeetRadioDrawer
        visible={visible}
        data={data}
        onConfirm={onConfirm}
        onCancel={() => setVisible(false)}
        {...props} />
    ) : (
        <View {...props} onClick={() => setVisible(true)}>{text}</View>
      )
  })

