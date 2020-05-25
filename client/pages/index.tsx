import React from 'react'
import Link from 'next/link'

const IndexPage = () => {
  return (
    <div>
      Welcome! Please <Link href='/login'><a>login</a></Link> first...
    </div>
  )
}

export default IndexPage
