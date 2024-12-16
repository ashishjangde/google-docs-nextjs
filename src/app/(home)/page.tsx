import DocumentTable from "./DocumentTable";
import Navbar from "./Navbar";
import TemplateGallary from "./TemplateGallary";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="fixed top-0 left-0 right-0 z-10 h-16 bg-white p-4">
        <Navbar />
      </div>
      <div className="mt-16">
        <TemplateGallary/>
       <DocumentTable/>
      </div>
   </div>
  );
}

// http://localhost:3000/
