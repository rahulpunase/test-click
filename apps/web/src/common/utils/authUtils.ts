const MAIN_KEY = import.meta.env.VITE_CONVEX_SITE_URL;

const JWT_KEY = `__convexAuthJWT_${MAIN_KEY}`;
const AUTH_KEY = `__convexAuthRefreshToken_${MAIN_KEY}`;

const EVENT = "auth-changed";

type CustomEventDetail = {
  key: string;
  oldValue: string | null;
  newValue: string | null;
};

export const addLocalStorageChangeDetection = () => {
  console.log("added");
  console.log({ JWT_KEY, AUTH_KEY });
  window.addEventListener("storage", (event) => {
    console.log("changed", event);
    if (event.key === JWT_KEY || event.key === AUTH_KEY) {
      window.dispatchEvent(
        new CustomEvent<CustomEventDetail>(EVENT, {
          detail: {
            key: event.key,
            oldValue: event.oldValue,
            newValue: event.newValue,
          },
        }),
      );
    }
  });
};

export const detectChange = (
  callback: (event: CustomEvent<CustomEventDetail>) => void,
) => {
  window.addEventListener(EVENT, (event) => {
    callback(event as CustomEvent<CustomEventDetail>);
  });
};
