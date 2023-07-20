import { createContext, useMemo, useState } from "react";
import { PropTypes } from "prop-types";

const articleContext = createContext();

export function ArticleProvider({ children }) {
  const [carts, setCarts] = useState([]);
  const values = useMemo(() => ({ carts, setCarts }), [carts]);

  return (
    <articleContext.Provider value={values}>{children}</articleContext.Provider>
  );
}
ArticleProvider.propTypes = {
  children: PropTypes.shape().isRequired,
};

export default articleContext;
