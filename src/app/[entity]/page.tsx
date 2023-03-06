export default function EntityPage({ params }: { params: { entity: string } }) {
  return (
    <>
      <h1>{params.entity}</h1>
    </>
  );
}
