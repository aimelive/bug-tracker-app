const init = { x: "80vw", opacity: 0 };

export const routeVariants = {
  initial: init,
  animate: {
    x: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 80 },
  },
  exit: init,
};
