import { lazy } from "react";

interface Route {
  path: RoutesUri;
  title: string;
  Component: React.ComponentType;
}

export enum RoutesUri {
  ANIMALS = "/",
  TOP = "/top",
  REACTIONS = "/reactions",
  POST_ANIMAL = "/post",
}

const lazyLoad = (path: string) => {
  return lazy(() => import(`../pages/${path}.tsx`));
};

export const routes: Route[] = [
  {
    path: RoutesUri.ANIMALS,
    title: "Animals",
    Component: lazyLoad("main-page"),
  },
  {
    path: RoutesUri.TOP,
    title: "Top Animals",
    Component: lazyLoad("post-animal-page"),
  },
  {
    path: RoutesUri.REACTIONS,
    title: "Reactions",
    Component: lazyLoad("reactions-page"),
  },
  {
    path: RoutesUri.POST_ANIMAL,
    title: "Post Animal",
    Component: lazyLoad("post-animal-page"),
  },
];
