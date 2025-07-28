import Link from "next/link";
import { forwardRef } from "react";

// ----------------------------------------------------------------------

const RouterLink = forwardRef(function RouterLink(props, ref) {
  return <Link ref={ref} {...props} />;
});

export default RouterLink;
