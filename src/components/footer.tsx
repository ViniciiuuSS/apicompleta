"use client";
import { Footer, FooterCopyright, FooterIcon } from "flowbite-react";
import { BsGithub } from "react-icons/bs";

export function FooterComponent() {
  return (
    <Footer className="fixed bottom-0 w-full rounded-l-none rounded-r-none">
      <div className="w-full">
        <div className="w-full border-t dark:border-gray-600 border-gray-200 shadow-sm px-4 py-6 sm:flex sm:items-center sm:justify-between">
          <FooterCopyright href="#" by="Vinicius Guedes" year={new Date().getFullYear()} />
          <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
            <FooterIcon href="#" icon={BsGithub} />
          </div>
        </div>
      </div>
    </Footer>
  );
}
