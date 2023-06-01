export default function ProfileHero({ title }: { title: string }) {
    return (
      <h1 className="border-b mt-4 border-lightgray w-full block pb-4 text-xl mb-4">
        {title}
      </h1>
    );
  }
  