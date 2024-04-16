interface ButtonProps {
  children: React.ReactNode;
}

export const Button = (props: ButtonProps) => {
  const { children, ...rest } = props;
  return (
    <div className="w-[100px] h-[50px] rounded bg-black text-white" {...rest}>
      {children}
    </div>
  );
};
