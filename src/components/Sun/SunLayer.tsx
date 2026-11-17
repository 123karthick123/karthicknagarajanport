/**
 * Light-mode counterpart to the lamp: a warm sunlit wash over the page.
 * The sun disc and its rotating rays were removed — the wash alone carries
 * the light theme, with no darkness layer.
 */
export function SunLayer() {
  return <div aria-hidden className="sun-wash" />
}
