import { ModeToggle } from "@/components/theme/ModeToggle";

const AuthNavBar = () => {
  return (
    <header className="bg-secondary py-2 px-6 flex justify-end">
      <ModeToggle />
    </header>
  );
};
export default AuthNavBar;
