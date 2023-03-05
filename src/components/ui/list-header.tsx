export const ListHeader = ({
  icon,
  title,
  actionArea,
}: {
  icon: React.ReactNode;
  title: React.ReactNode;
  actionArea?: React.ReactNode;
}) => {
  return (
    <div className="flex h-14 w-full rounded-md rounded-bl-none rounded-br-none border bg-[#171B21] py-2 px-4 text-sm font-medium dark:border-[#383B42] dark:text-slate-100">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center space-x-2">
          {icon}
          {title}
        </div>
        <div className="text-right">{actionArea}</div>
      </div>
    </div>
  );
};
