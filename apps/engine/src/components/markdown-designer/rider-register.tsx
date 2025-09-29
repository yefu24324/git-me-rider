import type { JSX } from "solid-js";

import type { RiderNode } from "./rider-nodes";

export type RiderRenderFn = (props: { rider: RiderNode }) => JSX.Element;

const renders: Array<RiderRenderFn> = [];

export function registerRider(render: RiderRenderFn) {
  renders.push(render);
}

export function RiderRender(props: { rider: RiderNode }) {
  const results = renders.map((render) => render(props)).filter((result) => !!result);
  const last = results[results.length - 1];
  if (!last) {
    return <div>Unknown rider type: {props.rider.type}</div>;
  }
  return last;
}
