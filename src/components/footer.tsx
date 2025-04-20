"use client";
import { Footer, FooterCopyright, FooterIcon, Tooltip } from "flowbite-react";
import Link from "next/link";
import { BsGithub, BsLinkedin } from "react-icons/bs";

export function FooterComponent() {
  return (
    <Footer className="fixed bottom-0 w-full rounded-l-none rounded-r-none animate-fade-in">
      <div className="w-full">
        <div className="w-full border-t dark:border-gray-600 border-gray-200 shadow-sm px-4 py-6 sm:flex sm:items-center sm:justify-between">
          <Tooltip content={"Linkedin"}>
            <Link href="https://www.linkedin.com/in/vinicius-guedes-9b1508208" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-700">
              <FooterCopyright by="Vinicius Guedes" year={new Date().getFullYear()} />
            </Link>
          </Tooltip>
          <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
            <Tooltip content={"GitHub"}>
              <FooterIcon href="https://github.com/ViniciiuuSS" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-700" icon={BsGithub} />
            </Tooltip>
            <Tooltip content={"Linkedin"}>
              <FooterIcon href="https://www.linkedin.com/in/vinicius-guedes-9b1508208" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-700" icon={BsLinkedin} />
            </Tooltip>
          </div>
        </div>
      </div>
    </Footer>
  );
}
