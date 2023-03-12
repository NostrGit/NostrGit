export const ListHeader = ({
  icon,
  title,
  actionArea,
  description,
}: {
  icon: React.ReactNode;
  title: React.ReactNode;
  actionArea?: React.ReactNode;
  description: string;
}) => {
  return (
    <div className="flex w-full  rounded-md rounded-bl-none rounded-br-none border bg-[#171B21] py-2 px-4 text-sm font-medium dark:border-[#383B42] dark:text-zinc-100">
      <div className="flex w-full flex-col items-start justify-between lg:flex-row lg:items-center">
        <div className="flex items-center space-x-2 lg:flex-row">
          {icon}
          {title}
        </div>
        <div className="mt-2 flex text-gray-400 lg:mt-0">{description}</div>
        <div className="hidden text-right lg:flex">{actionArea}</div>
      </div>
    </div>
  );
};
