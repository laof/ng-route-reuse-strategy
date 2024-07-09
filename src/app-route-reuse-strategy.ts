import {
  ActivatedRouteSnapshot,
  DetachedRouteHandle,
  RouteReuseStrategy,
} from '@angular/router';

type CachedRoute = {
  [key: string | symbol]: any;
};

// 此策略 緩存to page
const aaa = [{ from: 'page2', to: 'page1' }];

const ___data = '___data';

export class AppRouteReuseStrategy implements RouteReuseStrategy {
  private cachedRoutes: CachedRoute = {};

  // 第一次不執行，所有都要true?
  // 离开当前路由之前是否缓存当前路由 如果true=>call this.store
  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    const ok = aaa.find((item) => {
      return item.to === route.routeConfig?.path;
    });

    if (ok) {
      console.log(ok.from + ': 離開了，要緩存' + ok.from);
    }

    return Boolean(ok);
  }

  store(
    route: ActivatedRouteSnapshot,
    handle: DetachedRouteHandle | null
  ): void {
    console.log(
      `AppRouteReuseStrategy#store(${route.routeConfig?.path}) called.`
    );
    if (route.routeConfig?.path && handle) {
      console.log(`Caching route: ${route.routeConfig?.path}`);
      this.cachedRoutes[route.routeConfig.path] = handle;
    }
  }

  // 是否应从缓存中检索路由或创建新路由
  // 返回 true，Angular 将通过调用该方法shouldAttach检索缓存的路由。如果返回 false，它将从头开始创建新路由
  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    const ddd = route as any;

    const p2top1 = 'page2topage1';

    const ok = aaa.find((item) => {
      return (
        item.from === ddd.___data?.from && item.to === route.routeConfig?.path
      );
    });

    if (ok) {
      return this.cachedRoutes[ok.to];
    }
    return false;

    // const shouldAttach =
    //   !!route.routeConfig?.path && !!this.cachedRoutes[route.routeConfig.path];
    // console.log(
    //   `AppRouteReuseStrategy#shouldAttach(${route.routeConfig?.path}) called. Return: ${shouldAttach}`
    // );
    // return shouldAttach;
  }

  // 当shouldAttach返回 true 时，Angular 会调用此方法从缓存中获取路由，而不是从头开始创建
  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
    let cachedRoute = null;
    if (route.routeConfig?.path) {
      cachedRoute = this.cachedRoutes[route.routeConfig.path];
    }
    console.log(
      `AppRouteReuseStrategy#retrieve(${route.routeConfig?.path}) called. Return: ${cachedRoute}`
    );
    return cachedRoute;
  }

  // 如果 shouldReuseRoute 返回 true，那么 angular 不会离开页面，也不会发生任何变化
  // 是否重用当前路由
  shouldReuseRoute(
    future: ActivatedRouteSnapshot,
    curr: ActivatedRouteSnapshot
  ): boolean {
    const aaa = future as any;
    if (aaa) {
      if (aaa[___data]) {
        aaa[___data].from = curr.routeConfig?.path;
      } else {
        aaa[___data] = { from: curr.routeConfig?.path };
      }
    }

    const shouldReuseRoute = future.routeConfig === curr.routeConfig;
    console.log(
      `AppRouteReuseStrategy#shouldReuseRoute(future:${future.routeConfig?.path}, current: ${curr.routeConfig?.path}) called. Return: ${shouldReuseRoute}`
    );
    return shouldReuseRoute;
  }
}
