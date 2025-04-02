import clsx from "clsx";
import css from "./Loader.module.css";

import { ClipLoader } from "react-spinners";

export const Loader = ({ absolute }) => {
  return (
    <div className={clsx(css.container, { [css.LoaderAbsolute]: absolute })}>
      <ClipLoader color="#3470FF" height={150} width={150} />
    </div>
  );
};
