import React from 'react'

const RightSidebar = () => {
  return (
    <section className='rightsidebar custom-scrollbar'>
      <div className='flex flex-1 flex-col justify-start'>
        <h3>Suggested Communities</h3>
      </div>
      <div className='flex flex-1 flex-col justify-start'>
        <h3>Suggested Users</h3>
      </div>
    </section>
  )
}

export default RightSidebar