import React, { useEffect, useState } from 'react'

export const Contributors: React.FC = () => {
  const [contributors, setContributors] = useState<any[]>()
  useEffect(() => {
    fetch('./.netlify/functions/contributors')
      .then((res) => res.json())
      .then(({ data }) => {
        setContributors(data)
      })
  }, [])
  return (
    <div>
      {contributors.map((user, key) => (
        <div key={key}></div>
      ))}
    </div>
  )
}
