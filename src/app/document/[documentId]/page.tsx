import React from 'react'
import Editor from './Editor';
import Toolbar from './Toolbar';
import Navbar from './Navbar';

interface pageProps {
  params: Promise<{ documentId: string }>
}

export default async function page({ params }: pageProps) {
  const { documentId } = await params;
  return (
    <div className="min-h-screen bg-[#FAFBFD]">
        <div className="flex flex-col px-4 pt-2 gap-y-2 fixed top-0 left-0 right-0 z-10 bg-[#FAFBFD] print:hidden">
        <Navbar />
        <Toolbar />
      </div>
      <div className='pt-[144px] print:pt-0'>
      <Editor />
      </div>
    </div>
  )
}
