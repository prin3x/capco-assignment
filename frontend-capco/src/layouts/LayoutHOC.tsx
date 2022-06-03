import { ReactComponentElement, ReactNode } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

type Props = {
  children: ReactNode;
};

function LayoutHOC({ children }: Props) {
  return (
    <div className='h-full bg-slate-100'>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}

export default LayoutHOC;
