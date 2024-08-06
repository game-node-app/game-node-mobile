/**
 * Retrieves a common route that's shared among all tabs, with the current tab prefix appended to it.
 * @param currentPathname
 * @param targetUrl
 */
export function getCommonRouteHref(currentPathname: string, targetUrl: string): string {
    const paths = currentPathname.split("/");
    const tab = paths[1];
    return `/${tab}${targetUrl}`;
}
