import {
  Elements,
  MiddlewareArguments,
} from "@floating-ui/react-dom-interactions";

interface PApplyFloatingHeight {
  args: Omit<MiddlewareArguments, "elements"> & {
    elements: Elements;
  } & {
    availableWidth: number;
    availableHeight: number;
  };
  enable?: boolean;
  heightANavbarTotal: number;
  spaceToScreenEdges: number;
}
export const applyFloatingHeight = ({
  args,
  enable = true,
  heightANavbarTotal,
  spaceToScreenEdges,
}: PApplyFloatingHeight) => {
  if (!enable) return;
  const { availableHeight, elements, placement } = args;
  const isPhone = document.body.dataset.device === "phone";

  let maxHeight: string | number = 0;

  if (!isPhone) {
    if (placement === "top") {
      maxHeight = availableHeight - spaceToScreenEdges - heightANavbarTotal;
    }
    if (placement === "bottom") {
      maxHeight = availableHeight - spaceToScreenEdges;
    }
  }

  if (isPhone) {
    if (placement === "top") {
      maxHeight = availableHeight - spaceToScreenEdges;
    }
    if (placement === "bottom") {
      // console.log("floatingY", floatingY);

      maxHeight = availableHeight - spaceToScreenEdges - heightANavbarTotal;
    }
  }

  Object.assign(elements.floating.style, {
    maxHeight: `max(20vh, ${maxHeight + 1}px)`,
  });
};
