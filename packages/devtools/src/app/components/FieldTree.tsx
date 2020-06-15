import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { FormPath } from '@formily/shared'
import { Treebeard, decorators } from 'react-treebeard'
import * as filters from './filter'
import SerachBox from './SearchBox'

const createTree = (dataSource: any, cursor?: any) => {
  const tree: any = {}
  const findParent = (key: string): any => {
    const parentPath = FormPath.parse(key).parent()
    let node = tree
    for (let i = 0; i < parentPath.segments.length; i++) {
      const segment = parentPath.segments[i]
      if (node && node.children) {
        node.children.forEach(({ path }, index) => {
          const parsed = FormPath.parse(path)
          if (parsed.segments[parsed.segments.length - 1] === segment) {
            node = node.children[index]
          }
        })
      }
    }
    return node
  }
  Object.keys(dataSource || {}).forEach(key => {
    if (key == '') {
      tree.name = 'Form'
      tree.path = key
      tree.toggled = true
      tree.data = dataSource[key]
      if (cursor && cursor.current && cursor.current.path === key) {
        tree.active = true
        cursor.current = tree
      }
    } else {
      const node: any = {
        name: key,
        path: key,
        toggled: true,
        data: dataSource[key]
      }
      if (cursor && cursor.current && cursor.current.path === key) {
        node.active = true
        cursor.current = node
      }
      const parent = findParent(key)
      node.name = (node.path || '').slice(
        parent && parent.path ? parent.path.length + 1 : 0
      )
      parent.children = parent.children || []
      parent.children.push(node)
    }
  })

  return tree
}

const theme = {
  tree: {
    base: {
      listStyle: 'none',
      margin: 0,
      padding: 0,
      color: '#9DA5AB',
      fontFamily: 'lucida grande ,tahoma,verdana,arial,sans-serif',
      fontSize: '8px',
      background: 'none',
      marginBottom: '50px'
    },
    node: {
      base: {
        position: 'relative',
        background: 'none'
      },
      link: {
        cursor: 'pointer',
        position: 'relative',
        padding: '0px 5px',
        display: 'block'
      },
      activeLink: {
        background: '#3D424A'
      },
      toggle: {
        base: {
          position: 'relative',
          display: 'inline-block',
          verticalAlign: 'top',
          marginLeft: '-5px',
          height: '22px',
          width: '20px',
          zIndex: 2
        },
        wrapper: {
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%,-50%)',
          width: 4,
          height: 6,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        },
        height: 6,
        width: 4,
        arrow: {
          fill: '#9DA5AB',
          strokeWidth: 0
        }
      },
      header: {
        base: {
          display: 'inline-block',
          verticalAlign: 'top',
          color: '#9DA5AB'
        },
        connector: {
          width: '2px',
          height: '12px',
          borderLeft: 'solid 2px black',
          borderBottom: 'solid 2px black',
          position: 'absolute',
          top: '0px',
          left: '-21px'
        },
        title: {
          lineHeight: '24px',
          verticalAlign: 'middle'
        }
      },
      subtree: {
        listStyle: 'none',
        paddingLeft: '19px'
      },
      loading: {
        color: '#E2C089'
      }
    }
  }
}

const Header = props => {
  const { node, style, customStyles } = props
  return (
    <div
      className="node-header"
      style={style.base}
      onClick={() => {
        node.toggled = false
      }}
    >
      <div
        style={
          node.selected
            ? { ...style.title, ...customStyles.header.title }
            : style.title
        }
      >
        <span style={{ zIndex: 1, position: 'relative' }}>{node.name}</span>
        <div className={`highlight ${node.active ? 'active' : ''}`}></div>
      </div>
    </div>
  )
}

const ToolBar = styled.div`
  border-bottom: 1px solid #3d424a;
  height: 30px;
  padding: 10px 10;
  padding: 5px;
  overflow: scroll;
  position: sticky;
  top: 0;
  background: #282c34;
  z-index: 100;
`

export const FieldTree = styled(({ className, dataSource, onSelect }) => {
  const allDataRef = useRef(createTree(dataSource))
  const cursor = useRef(allDataRef.current)

  const [data, setData] = useState(allDataRef.current)

  const onToggle = (node: any, toggled: boolean) => {
    cursor.current.active = false
    node.active = true
    if (node.children && node.children.length) {
      node.toggled = toggled
    }
    cursor.current = node
    setData(data)
    if (onSelect) {
      onSelect(node)
    }
  }

  const onFilterMouseUp = ({ target: { value } }) => {
    const filter = value.trim();
    if (!filter) {
        return setData(allDataRef.current)
    }
    let filtered = filters.filterTree(data, filter);
    filtered = filters.expandFilteredNodes(filtered, filter);
    setData(filtered);
  }

  useEffect(() => {
    allDataRef.current = createTree(dataSource, cursor)
    setData(allDataRef.current)
  }, [dataSource])

  return (
    <div className={className}>
      <ToolBar >
        <SerachBox onKeyUp={onFilterMouseUp} />
      </ToolBar>
      
      <Treebeard
        data={data}
        onToggle={onToggle}
        decorators={{
          ...decorators,
          Header
        }}
        style={theme}
      />
    </div>
  )
})`
  position: relative;
  overflow: scroll;
  height: calc(100% - 40px);
  user-select: none;
  .highlight {
    position: absolute;
    top: 0;
    right: 0;
    left: -100%;
    height: 100%;
    z-index: 0;
    &.active {
      background: #3d424a;
    }
  }
  .node-header:hover .highlight {
    background: #3d424a;
  }
`
