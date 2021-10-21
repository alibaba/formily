<template>
  <div>
    <p>maxColumns 3 + minColumns 2</p>
    <FormGrid :maxColumns="3" :minColumns="2" :columnGap="4">
      <FormGridColumn :gridSpan="4">
        <Cell>1</Cell>
      </FormGridColumn>
      <FormGridColumn>
        <Cell>2</Cell>
      </FormGridColumn>
      <FormGridColumn>
        <Cell>3</Cell>
      </FormGridColumn>
      <FormGridColumn>
        <Cell>4</Cell>
      </FormGridColumn>
      <FormGridColumn>
        <Cell>5</Cell>
      </FormGridColumn>
      <FormGridColumn>
        <Cell>6</Cell>
      </FormGridColumn>
    </FormGrid>
    <p>maxColumns 3</p>
    <FormGrid :maxColumns="3" :columnGap="4">
      <FormGridColumn :gridSpan="2">
        <Cell>1</Cell>
      </FormGridColumn>
      <FormGridColumn>
        <Cell>2</Cell>
      </FormGridColumn>
      <FormGridColumn>
        <Cell>3</Cell>
      </FormGridColumn>
      <FormGridColumn>
        <Cell>4</Cell>
      </FormGridColumn>
      <FormGridColumn>
        <Cell>5</Cell>
      </FormGridColumn>
      <FormGridColumn>
        <Cell>6</Cell>
      </FormGridColumn>
    </FormGrid>
    <p>minColumns 2</p>
    <FormGrid :minColumns="2" :columnGap="4">
      <FormGridColumn :gridSpan="2">
        <Cell>1</Cell>
      </FormGridColumn>
      <FormGridColumn>
        <Cell>2</Cell>
      </FormGridColumn>
      <FormGridColumn>
        <Cell>3</Cell>
      </FormGridColumn>
      <FormGridColumn>
        <Cell>4</Cell>
      </FormGridColumn>
      <FormGridColumn>
        <Cell>5</Cell>
      </FormGridColumn>
      <FormGridColumn>
        <Cell>6</Cell>
      </FormGridColumn>
    </FormGrid>
    <p>Null</p>
    <FormGrid :columnGap="4">
      <FormGridColumn :gridSpan="2">
        <Cell>1</Cell>
      </FormGridColumn>
      <FormGridColumn>
        <Cell>2</Cell>
      </FormGridColumn>
      <FormGridColumn>
        <Cell>3</Cell>
      </FormGridColumn>
      <FormGridColumn>
        <Cell>4</Cell>
      </FormGridColumn>
      <FormGridColumn>
        <Cell>5</Cell>
      </FormGridColumn>
      <FormGridColumn>
        <Cell>6</Cell>
      </FormGridColumn>
    </FormGrid>
    <p>minWidth 150 +maxColumns 3</p>
    <FormGrid :minWidth="150" :maxColumns="3" :columnGap="4">
      <FormGridColumn :gridSpan="2">
        <Cell>1</Cell>
      </FormGridColumn>
      <FormGridColumn>
        <Cell>2</Cell>
      </FormGridColumn>
      <FormGridColumn>
        <Cell>3</Cell>
      </FormGridColumn>
      <FormGridColumn>
        <Cell>4</Cell>
      </FormGridColumn>
      <FormGridColumn>
        <Cell>5</Cell>
      </FormGridColumn>
      <FormGridColumn>
        <Cell>6</Cell>
      </FormGridColumn>
    </FormGrid>
    <p>maxWidth 120+minColumns 2</p>
    <FormGrid :maxWidth="120" :minColumns="2" :columnGap="4">
      <FormGridColumn :gridSpan="2">
        <Cell>1</Cell>
      </FormGridColumn>
      <FormGridColumn>
        <Cell>2</Cell>
      </FormGridColumn>
      <FormGridColumn>
        <Cell>3</Cell>
      </FormGridColumn>
      <FormGridColumn>
        <Cell>4</Cell>
      </FormGridColumn>
      <FormGridColumn>
        <Cell>5</Cell>
      </FormGridColumn>
      <FormGridColumn>
        <Cell>6</Cell>
      </FormGridColumn>
    </FormGrid>
    <p>maxWidth 120 + gridSpan -1</p>
    <FormGrid :maxWidth="120" :columnGap="4">
      <FormGridColumn :gridSpan="2">
        <Cell>1</Cell>
      </FormGridColumn>
      <FormGridColumn>
        <Cell>2</Cell>
      </FormGridColumn>
      <FormGridColumn :gridSpan="-1">
        <Cell>3</Cell>
      </FormGridColumn>
    </FormGrid>
  </div>
</template>

<script>
import { FormGrid } from '@formily/element'

const Cell = {
  functional: true,
  render(h, context) {
    return h(
      'div',
      {
        style: {
          backgroundColor: '#AAA',
          color: '#FFF',
          height: '30px',
          display: 'flex',
          alignItems: 'center',
          padding: '0 10px',
        },
      },
      context.children
    )
  },
}

export default {
  components: { FormGrid, FormGridColumn: FormGrid.GridColumn, Cell },
}
</script>
