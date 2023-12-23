"use client";
import React from "react";
import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { callsToAction, solutions } from "@/constants/navbar";
import { AuthContext } from "@/context/Authentication";
import Link from "next/link";

export default function index() {
  const [entered, setEntered] = React.useState(false);
  const { isAuthenticated } = AuthContext();
  return (
    <Popover className="relative bg-black py-4 flex justify-center">
      <Popover.Button
        className="inline-flex items-center gap-x-1 text-xl w-fit leading-6 text-white outline-none"
        onMouseEnter={() => setEntered(true)}
        onMouseLeave={() => setEntered(false)}
      >
        <span>The House of Wisdom</span>
        <ChevronDownIcon
          className={`h-5 w-5 transition ${
            entered ? "translate-y-1" : "translate-y-0"
          }`}
          aria-hidden="true"
        />
      </Popover.Button>

      <Popover.Overlay className="fixed w-full h-full top-0 left-0 z-10"></Popover.Overlay>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel className="absolute left-1/2 z-10 mt-10 flex w-screen max-w-max -translate-x-1/2 px-4">
          <div className="w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-purple-dark-2 text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
            <div className="p-4">
              {solutions.map((item) => (
                <div
                  key={item.name}
                  className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-purple-dark-3"
                >
                  <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-purple-dark-2">
                    <item.icon
                      className="h-6 w-6 text-gray-1 group-hover:text-primary"
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <a href={item.href} className="font-semibold text-white">
                      {item.name}
                      <span className="absolute inset-0" />
                    </a>

                    <p className="mt-1 text-gray-1">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-purple-dark-2">
              {callsToAction.map((item) => {
                if (isAuthenticated && item.name !== "sign in")
                  return <CallToActionButton item={item} />;

                if (isAuthenticated === false && item.name !== "profile")
                  return <CallToActionButton item={item} />;
              })}
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}

function CallToActionButton({ item }: { item: (typeof callsToAction)[0] }) {
  return (
    <Link
      key={item.name}
      href={item.href}
      className="flex items-center justify-center gap-x-2.5 p-3 font-semibold text-white hover:bg-purple-dark-3 capitalize"
    >
      <item.icon
        className={`h-5 w-5 flex-none ${
          item.name === "donate" ? "text-red-600" : "text-gray-1"
        }`}
        aria-hidden="true"
      />
      {item.name}
    </Link>
  );
}
