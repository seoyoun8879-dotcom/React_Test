import style from "./Content.module.scss";

type Props = {
  secondClass: string;
  children?: React.ReactNode;
};

function Content({ secondClass, children }: Props) {
  return (
    <div className={`${style.content} ${style[secondClass]}`}>{children}</div>
  );
}

export default Content;
