import { FormPath, isObj } from '@formily/shared'
import React, { useEffect, useRef, useState } from 'react'
import { decorators, Treebeard } from 'react-treebeard'

import * as filters from './filter'
import SearchBox from './SearchBox'

const createTree = (dataSource: any, cursor?: any) => {
  const tree: any = {}
  const getParentPath = (key: string) => {
    let parentPath: FormPath = FormPath.parse(key)
    let i = 0
    while (true) {
      parentPath = parentPath.parent()
      if (dataSource[parentPath.toString()]) {
        return parentPath
      }
      if (i > parentPath.segments.length) return parentPath
      i++
    }
  }
  const findParent = (key: string): any => {
    const parentPath = getParentPath(key)
    const _findParent = (node: any) => {
      if (FormPath.parse(node.path).match(parentPath)) {
        return node
      } else {
        for (let i = 0; i < node?.children?.length; i++) {
          const parent = _findParent(node.children[i])
          if (parent) {
            return parent
          }
        }
      }
    }
    return _findParent(tree)
  }
  Object.keys(dataSource || {}).forEach((key) => {
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
        data: dataSource[key],
      }
      if (cursor && cursor.current && cursor.current.path === key) {
        node.active = true
        cursor.current = node
      }
      const parent = findParent(key)
      if (parent) {
        node.name = (node.path || '').slice(
          parent && parent.path ? parent.path.length + 1 : 0
        )
        parent.children = parent.children || []
        parent.children.push(node)
      }
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
      marginBottom: '50px',
    },
    node: {
      base: {
        position: 'relative',
        background: 'none',
      },
      link: {
        cursor: 'pointer',
        position: 'relative',
        padding: '0px 5px',
        display: 'block',
      },
      activeLink: {
        background: '#3D424A',
      },
      toggle: {
        base: {
          position: 'relative',
          display: 'inline-block',
          verticalAlign: 'top',
          marginLeft: '-5px',
          height: '22px',
          width: '20px',
          zIndex: 2,
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
          justifyContent: 'center',
        },
        height: 6,
        width: 4,
        arrow: {
          fill: '#9DA5AB',
          strokeWidth: 0,
        },
      },
      header: {
        base: {
          display: 'inline-block',
          verticalAlign: 'top',
          color: '#9DA5AB',
        },
        connector: {
          width: '2px',
          height: '12px',
          borderLeft: 'solid 2px black',
          borderBottom: 'solid 2px black',
          position: 'absolute',
          top: '0px',
          left: '-21px',
        },
        title: {
          lineHeight: '24px',
          verticalAlign: 'middle',
        },
      },
      subtree: {
        listStyle: 'none',
        paddingLeft: '19px',
      },
      loading: {
        color: '#E2C089',
      },
    },
  },
}

const Header = (props) => {
  const { node, style, customStyles } = props
  const title = node.data?.title ? node.data.title : ''
  return (
    <div
      className="fieldTreeNodeHeader"
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
        <span
          style={{
            zIndex: 1,
            position: 'relative',
            fontSize: 12,
          }}
        >
          {node.name}
        </span>
        <span style={{ zIndex: 1, position: 'absolute', right: 12 }}>
          {isObj(title) ? (title as any).title ?? '' : title}
        </span>
        <div
          className={`fieldTreeHighlight ${node.active ? 'active' : ''}`}
          style={{ transition: '.15s all ease-in' }}
        ></div>
      </div>
    </div>
  )
}

const ToolBar = ({ children }) => {
  return <div className="fieldTreeToolBar">{children}</div>
}

export const FieldTree = ({ dataSource, onSelect }) => {
  const allDataRef = useRef(createTree(dataSource))
  const cursor = useRef(allDataRef.current)
  const [keyword, setKeyword] = useState('')
  const searchTimer = useRef(null)
  const [data, setData] = useState(allDataRef.current)

  const filterData = () => {
    if (!keyword) return data
    const finded = filters.filterTree(data, keyword)
    return filters.expandFilteredNodes(finded, keyword)
  }

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

  const onSearch = ({ target: { value } }) => {
    clearTimeout(searchTimer.current)
    searchTimer.current = setTimeout(() => {
      setKeyword(value.trim())
    }, 100)
  }

  useEffect(() => {
    allDataRef.current = createTree(dataSource, cursor)
    setData(allDataRef.current)
  }, [dataSource])

  return (
    <div className="fieldTree">
      <ToolBar>
        <SearchBox onSearch={onSearch} />
      </ToolBar>

      <Treebeard
        data={filterData()}
        onToggle={onToggle}
        decorators={{
          ...decorators,
          Header,
        }}
        style={theme}
      />
    </div>
  )
}
