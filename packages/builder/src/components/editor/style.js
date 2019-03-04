import styled from 'styled-components'

export default styled.div`
  position: absolute;
  min-width: 500px;
  top: 64px;
  right: 0;
  bottom: 0;
  overflow-y: scroll;
  box-shadow: 0 -1px 3px 0 rgba(0, 0, 0, 0.2);
  transition: transform 0.2s ease-in;
  transform: translate3d(500px, 0, 0);
  &.active {
    transform: translate3d(0, 0, 0);
  }
  z-index: 2000;
  .editor {
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
  }
  .editor-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    padding: 4px;
    background: rgba(90, 96, 255, 0.95);
    color: #fff;
    border-radius: 3px;
  }
`
