export default function Loading() {
  return (
    <div
      role="status"
      className="h-screen w-full animate-pulse cursor-progress flex-col items-center justify-between space-y-8 pb-12 md:px-12 lg:flex-row"
    >
      <div className="flex h-16 w-full flex-col items-center justify-center gap-8 bg-zinc-600 md:flex-row md:gap-0">
        <div className="h-16 bg-zinc-600"></div>
        <div className="h-16 bg-zinc-600"></div>
      </div>
      <div className="mt-12 h-40 ">
        <div className="h-16 bg-zinc-600" />
        <div className="mt-2 h-16 bg-zinc-600" />
      </div>
      <div className="container mx-auto grid h-screen grid-cols-1 md:gap-8 lg:grid-cols-2 lg:p-6 xl:grid-cols-3 2xl:grid-cols-5">
        {[...Array(10)].map((_, index) => (
          <div key={index} className="h-[500px] bg-zinc-600" />
        ))}
      </div>
    </div>
  )
}

export function LoadingDossier() {
  return (
    <div
      role="status"
      className="h-screen w-full animate-pulse cursor-progress flex-col items-center justify-between space-y-8 pb-12 md:px-12 md:pb-24 lg:flex-row"
    >
      <div className="mt-2 flex h-40 w-full flex-col items-center justify-center text-center ">
        <div className="h-12 w-1/3 bg-zinc-600" />
        <div className="mt-2 h-12 w-1/3 bg-zinc-600" />
      </div>
      <div className="container mx-auto grid h-screen grid-cols-1 md:gap-8 lg:grid-cols-2 lg:p-6 xl:grid-cols-3 2xl:grid-cols-5">
        {[...Array(20)].map((_, index) => (
          <div key={index} className="h-[500px] bg-zinc-600" />
        ))}
      </div>
    </div>
  )
}
