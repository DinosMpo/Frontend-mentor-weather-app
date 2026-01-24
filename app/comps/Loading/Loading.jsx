import React from 'react'
import TopNav from '../TopNav/TopNav'
import MainSectionLoading from './MainSectionLoading'
import SideSectionLoading from './SideSectionLoading'

export default function Loading({ searchInput }) {
  return (
    <div id="container">
      <TopNav searchInput={searchInput} />
      <div id="sections">
        <MainSectionLoading />
        <SideSectionLoading />
      </div>
    </div>
  )
}
