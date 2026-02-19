export const Header1 = ({ children }: { children: React.ReactNode }) => {
  return (
    <h1 className="text-4xl lg:text-8xl font-bold  text-center capitalize">
      {children}
    </h1>
  );
};
