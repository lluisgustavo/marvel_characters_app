export default function Loading() {
  return (
    <div
      role="status"
      className="mt-8 min-h-screen animate-pulse overflow-x-hidden overflow-y-scroll pb-8"
    >
      <div className="h-12 w-36 bg-zinc-600" />
      <div className="grid grid-cols-1 lg:grid-cols-5">
        <div className="lg:col-span-2 lg:pe-8">
          <div className="flex w-full flex-col items-center justify-center overflow-hidden rounded-md">
            <h2 className="mt-12"></h2>
            <div className="h-[650px] w-full bg-zinc-600"></div>
            <div className="my-8 lg:my-0 lg:p-8" />
          </div>
        </div>
        <div className="bg-zinc-600 lg:col-span-3">
          <div className="">
            <nav className="md:hidden">
              <select id="tabs" className="block h-16 w-full p-2.5"></select>
            </nav>
          </div>
          <div className="mt-4"></div>
        </div>
      </div>
    </div>
  )
}
