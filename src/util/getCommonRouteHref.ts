/**
 * Retrieves a route  with the current tab prefix appended to it.
 * @param currentPathname
 * @param targetUrl
 */
export function getTabAwareHref(currentPathname: string, targetUrl: string): string {
    const paths = currentPathname.split("/");
    const tab = paths[1];
    return `/${tab}${targetUrl}`;
}
