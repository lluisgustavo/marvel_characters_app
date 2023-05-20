interface ReturnButtonProps {
  onClick: () => void
}

export function ReturnButton({ onClick }: ReturnButtonProps) {
  return (
    <div className="flex w-full items-center justify-center">
      <button
        className="mb-12 text-center text-3xl text-zinc-300"
        onClick={onClick}
      >
        Encrypt Database
      </button>
    </div>
  )
}
