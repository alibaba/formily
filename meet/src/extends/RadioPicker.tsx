import React, { useState, forwardRef } from 'react';
import RaxView from 'rax-view';
import { useLocale } from "@rax-ui/locale"
import _styles, { useStyles } from '@rax-ui/styles'
import { Drawer, Checkbox, Radio, Button } from '@alifd/meet'
import { SelectType } from '@rax-ui/select/lib/select';

const { Group: RadioGroup } = Radio;
const { Group: CheckboxGroup } = Checkbox;

const RadioPicker = (props, ref) => {
    const {
        type = SelectType.SINGLE,
        data = [],
        visible,
        onHide,
        title,
        styles: stylesProp,
        onChange,
        value: valueProp,
        view = false,
        ...others
    } = props;
    const [ preValue, setPreValue ] = useState(null);
    const [ value, setValue ] = useState(null);
    const local = useLocale('Select', others, {
        ok: '确定',
        cancel: '取消'
    })

    if (preValue !== valueProp) {
        setPreValue(valueProp);
        setValue(valueProp);
    }

    const styles = useStyles({}, {
        styles: stylesProp
    }, (classNames) => ({
        picker: classNames('select__picker'),
        toolbar: classNames('select__picker__toolbar'),
        title: classNames('select__picker__title'),
        titleText: classNames('select__picker__title__text'),
        content: classNames('select__picker__content')
    }));

    const handleChange = (v) => {
        // console.log(v)
        setValue(v);
    }
    
    const handleSure = () => {
        onHide();
        onChange(value);
    };

    const Group = type === SelectType.SINGLE ? RadioGroup : CheckboxGroup;
    let pickerValue = value;
    if(type === SelectType.MULTIPLE) {
        pickerValue = value ? Array.isArray(value) ? value : [value] : []
    }

    return (
        <Drawer
        placement="bottom"
        view={view}
        styles={stylesProp}
        visible={visible}
        onMaskClick={onHide}>
        <RaxView ref={ref}>
            <Group
            data={data}
            value={pickerValue}
            styles={styles}
            onChange={handleChange}/>
            <Button
            styles={stylesProp}
            onClick={handleSure}
            type="primary">
                {local.ok}
            </Button>
        </RaxView>
        </Drawer>
    )
}

export default forwardRef(RadioPicker)