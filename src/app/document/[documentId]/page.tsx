import { Edit } from 'lucide-react';
import React from 'react'
import Editor from './Editor';
import Toolbar from './Toolbar';

interface pageProps {
  params : Promise<{documentId : string}>   
}

export default async function page({params} : pageProps) {
    const {documentId } = await params;
  return (
    <div className='min-h-screen bg-[#FAFBFD]'>
        <Toolbar/>
        <Editor/>
    </div>
  )
}
