import { ModeToggle } from "@/components/theme/ModeToggle";

const HomeLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <main>
      <header className="bg-secondary py-2 px-6 flex justify-end">
        <ModeToggle />
      </header>
      {children}
    </main>
  );
};
export default HomeLayout;
