export function VerticalSpacer({ height }) {
  const style = `bg-gray-400 w-[1px] h-[${height}px]`;
  return <div class={style} />;
}
