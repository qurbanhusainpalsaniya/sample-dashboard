import { usePathname } from "next/navigation";

export function useActiveLink(path, deep = true) {
    var pathname = usePathname();

    pathname = pathname.split("/").filter((item) => item != "");

    const checkPath = path.startsWith("#");

    const currentPath = path === "/" ? "/" : `${path}/`;

    const regex = new RegExp(`\\b${pathname[1]}\\b`, "i");

    const normalActive = !checkPath && regex.test(currentPath);

    const deepActive = !checkPath && pathname.some((term) => currentPath.includes(term));

    return deep ? deepActive : normalActive;
}
