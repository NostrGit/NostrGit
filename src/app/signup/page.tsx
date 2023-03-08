import Image from "next/image";

export default function Signup() {
  return (
    <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Image
          width={500}
          height={500}
          className="mx-auto h-12 w-auto"
          src="/logo.svg"
          alt="NostrGit"
        />
      </div>
    </div>
  );
}
