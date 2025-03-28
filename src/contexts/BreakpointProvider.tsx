"use client";

import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  ReactNode,
} from "react";

// Define types for your media query map
type BreakpointMap = Record<string, string>;
type BreakpointMatches = Record<string, boolean>;

const defaultValue: BreakpointMatches = {};

const BreakpointContext = createContext<BreakpointMatches | undefined>(
  undefined
);

type BreakpointProviderProps = {
  children: ReactNode;
  queries: BreakpointMap;
};

export const BreakpointProvider: React.FC<BreakpointProviderProps> = ({
  children,
  queries,
}) => {
  const defaultMatches = Object.keys(queries).reduce<BreakpointMatches>(
    (acc, key, index) => {
      acc[key] = index === 0;
      return acc;
    },
    {}
  );

  const [queryMatch, setQueryMatch] =
    useState<BreakpointMatches>(defaultMatches);

  useEffect(() => {
    const mediaQueryLists: Record<string, MediaQueryList> = {};
    const keys = Object.keys(queries);
    let isAttached = false;

    const handleQueryListener = () => {
      const updated = keys.reduce<BreakpointMatches>((acc, media) => {
        acc[media] = !!mediaQueryLists[media]?.matches;
        return acc;
      }, {});
      setQueryMatch(updated);
    };

    if (typeof window !== "undefined" && window.matchMedia) {
      const matches: BreakpointMatches = {};
      keys.forEach((media) => {
        const query = queries[media];
        if (typeof query === "string") {
          const mql = window.matchMedia(query);
          mediaQueryLists[media] = mql;
          matches[media] = mql.matches;
        } else {
          matches[media] = false;
        }
      });
      setQueryMatch(matches);

      isAttached = true;
      keys.forEach((media) => {
        if (mediaQueryLists[media]) {
          mediaQueryLists[media].addEventListener?.(
            "change",
            handleQueryListener
          );
        }
      });
    }

    return () => {
      if (isAttached) {
        keys.forEach((media) => {
          if (mediaQueryLists[media]) {
            mediaQueryLists[media].removeEventListener?.(
              "change",
              handleQueryListener
            );
          }
        });
      }
    };
  }, [queries]);

  return (
    <BreakpointContext.Provider value={queryMatch}>
      {children}
    </BreakpointContext.Provider>
  );
};

export const useBreakpoint = () => {
  const context = useContext(BreakpointContext);
  if (context === defaultValue) {
    throw new Error("useBreakpoint must be used within a BreakpointProvider");
  }
  return context;
};
