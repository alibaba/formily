# Ant Design

## Introduction

@formily/antd is a professional component library for form scenarios based on Ant Design encapsulation. It has the following characteristics:

- Only Formily 2.x is supported
  - Most components are not backward compatible
  - Unfortunately, many components of 1.x have inherent flaws in the API design. This is also because the form scheme has been explored, so there will be version breaks.
- Richer component system
  - Layout components
    - FormLayout
    - FormItem
    - FormGrid
    - FormButtonGroup
    - Space
    - Submit
    - Reset
  - Input controls
    - Input
    - Password
    - Select
    - TreeSelect
    - DatePicker
    - TimePicker
    - NumberPicker
    - Transfer
    - Cascader
    - Radio
    - Checkbox
    - Upload
    - Switch
  - Scene components
    - ArrayCards
    - ArrayItems
    - ArrayTable
    - ArrayTabs
    - FormCollapse
    - FormStep
    - FormTab
    - FormDialog
    - FormDrawer
    - Editable
  - Reading state component
    - PreviewText
- Theme customization ability
  - Completely abandon the 1.x styled-components solution, follow the style system of the component library, it is more convenient to customize the theme
- Support secondary packaging
  - All components can be repackaged, and the 1.x component system cannot be repackaged, so providing this capability makes it more convenient for users to do business customization
- Support reading mode
  - Although 1.x also supports reading mode, 2.x provides a separate PreviewText component, users can make reading mode encapsulation based on it, which is more flexible
- Type is more friendly
  - Each component has an extremely complete type definition, and users can feel an unprecedented intelligent reminder experience during the actual development process
- More complete layout control capabilities
  - 1.x's layout capabilities have basically converged to FormMegaLayout. This time, we directly removed Mega. Mega is a standard component and is completely internalized into FormLayout and FormItem components. At the same time, MegaLayout's grid layout capabilities are placed in FormGrid components. In, it also provides smarter layout capabilities.
- More elegant and easy-to-use APIs, such as:
  - FormStep in the past has many problems. First, the type is not friendly. Second, the API is too hidden. To control the forward and backwards, you need to understand a bunch of private events. In the new version of FormStep, users only need to pay attention to the FormStep Reactive Model. You can create a Reactive Model through createFormStep and pass it to the FormStep component to quickly communicate. Similarly, FormTab/FormCollapse is the same communication mode.
  - Pop-up forms, drawer forms, presumably in the past, users had to write a lot of code on these two scenarios almost every time. This time, an extremely simple API is directly provided for users to use, which maximizes development efficiency.

## Installation

```bash
$ npm install --save antd moment
$ npm install --save @formily/core @formily/react @formily/antd

```

## Q/A

Q: I want to package a set of component libraries by myself, what should I do?

Answer: If it is an open source component library, you can directly participate in the project co-construction and provide PR. If it is a private component library in the enterprise, you can refer to the source code. The source code does not have too much complicated logic.

Question: Why do components such as ArrayCards/ArrayTable/FormStep only support Schema mode and not pure JSX mode?

Answer: This is the core advantage of Schema mode. With the help of protocols, we can do scene-based abstraction. On the contrary, pure JSX mode is limited by the unparseability of JSX. It is difficult for us to achieve UI-level scene-based abstraction. It's just an abstract hook.
