'use client'

export default function NotFound() {
  return (
    <div className="flex h-80 flex-col items-center justify-center space-y-12">
      <h1 className="text-4xl font-semibold text-white">
        ERROR 404: Access Denied, Agent!
      </h1>
      <p className="text-xl text-gray-300">
        The top secret S.H.I.E.L.D. database page you are looking for has been
        compromised by Hydra.
      </p>
      <p className="mt-4 text-xl text-gray-300">
        Please report this incident to your superior immediately and stay alert.
      </p>
    </div>
  )
}
