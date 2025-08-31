import { lazy } from "react";

interface Route {
  path: RoutesUri;
  title: string;
  Component: React.ComponentType;
}

export enum RoutesUri {
  HOME = "/",
  REACTIONS = "/reactions",
  POST_ANIMAL = "/post",
}

const lazyLoad = (path: string) => {
  return lazy(() => import(`../pages/${path}`));
};

export const routes: Route[] = [
  {
    path: RoutesUri.HOME,
    title: "Home",
    Component: lazyLoad("main-page"),
  },
  {
    path: RoutesUri.REACTIONS,
    title: "Reactions",
    Component: lazyLoad("reactions-page"),
  },
  {
    path: RoutesUri.POST_ANIMAL,
    title: "Post Animal",
    Component: lazyLoad("post-cat-page"),
  },
];
