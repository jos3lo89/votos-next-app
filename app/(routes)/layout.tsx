import NavBarPublic from "./components/NavBarPublic";

const HomeLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <main>
      <NavBarPublic />
      {children}
    </main>
  );
};
export default HomeLayout;
