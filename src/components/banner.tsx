export default function Banner({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <>
      <div className="pointer-events-none fixed inset-x-0 bottom-0 sm:flex sm:justify-center sm:px-6 sm:pb-5 lg:px-8">
        <div className="pointer-events-auto flex items-center justify-between gap-x-6 bg-purple-900 py-2.5 px-6 sm:rounded-xl sm:py-3 sm:pr-3.5 sm:pl-4">
          <p className="text-sm leading-6 text-white">
            <a href="https://github.com/nostrgit/nostrgit">
              <strong className="font-semibold">{title}</strong>
              <svg
                viewBox="0 0 2 2"
                className="mx-2 inline h-0.5 w-0.5 fill-current"
                aria-hidden="true"
              >
                <circle cx={1} cy={1} r={1} />
              </svg>
              {description} <span aria-hidden="true">&rarr;</span>
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
