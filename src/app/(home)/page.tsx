'use client';
import { useSearchParam } from "@/hooks/use-search-params";
import DocumentTable from "./DocumentTable";
import Navbar from "./Navbar";
import TemplateGallary from "./TemplateGallary";
import { usePaginatedQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

export default function Home() {
  const [search] = useSearchParam();
  const { 
    results, 
    status, 
    loadMore
  } = usePaginatedQuery(api.document.get, { search }, { initialNumItems: 5 });

  return (
    <div className="min-h-screen flex flex-col">
      <div className="fixed top-0 left-0 right-0 z-10 h-16 bg-white p-4">
        <Navbar />
      </div>
      <div className="mt-16">
        <TemplateGallary/>
       <DocumentTable
        documents={results}
        loadMore={loadMore}
        status={status}
       />
      </div>
   </div>
  );
}

// http://localhost:3000/
