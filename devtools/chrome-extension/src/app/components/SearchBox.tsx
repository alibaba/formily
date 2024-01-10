import React from 'react'
import styled from 'styled-components'

const SerachBox = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  .input-addon {
    padding: 0 5px;
  }
  .form-control {
    width: 50%;
    border: none;
    background: transparent;
    color: white;
    outline: none;
  }
`

const SearchIcon = () => {
  return (
    <svg
      t="1592193216787"
      className="icon"
      viewBox="0 0 1024 1024"
      version="1.1"
      p-id="3365"
      width="12"
      height="12"
    >
      <defs>
        <style type="text/css"></style>
      </defs>
      <path
        d="M976.738462 892.061538L712.861538 630.153846c53.169231-74.830769 80.738462-169.353846 66.953847-269.784615-23.630769-169.353846-161.476923-303.261538-332.8-319.015385C214.646154 17.723077 17.723077 214.646154 41.353846 448.984615c15.753846 169.353846 149.661538 309.169231 319.015385 332.8 100.430769 13.784615 194.953846-13.784615 269.784615-66.953846l261.907692 261.907693c11.815385 11.815385 29.538462 11.815385 41.353847 0l41.353846-41.353847c11.815385-11.815385 11.815385-31.507692 1.969231-43.323077zM157.538462 411.569231C157.538462 271.753846 271.753846 157.538462 411.569231 157.538462s254.030769 114.215385 254.030769 254.030769S551.384615 665.6 411.569231 665.6 157.538462 553.353846 157.538462 411.569231z"
        p-id="3366"
        fill="#9da5ab"
      ></path>
    </svg>
  )
}

export default ({ onSearch }) => {
  return (
    <SerachBox>
      <div className="input-addon">
        <SearchIcon />
      </div>
      <input
        className="form-control"
        onChange={onSearch}
        placeholder="Search the field..."
        type="text"
      />
    </SerachBox>
  )
}
