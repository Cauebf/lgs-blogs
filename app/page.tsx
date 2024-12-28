import Header from "@/components/Header";
import Search from "@/components/Search";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex flex-col justify-between py-7 px-12">
        <Search />
        <h1 className="text-3xl font-bold">Hello world!</h1>
        
      </main>
    </>
  );
}
