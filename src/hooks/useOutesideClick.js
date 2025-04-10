import { useEffect, useRef } from "react";

export function useOutsideClick(handler, listenCapturing = true) {
  const ref = useRef(null);
  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        handler("");
      }
    }
    // این ترویی که این پایین گذاشتی بخاطر اینه که از کریت پورتال استفاده کردی و خب توی ریاکت وقتی استیت اوپن نیم تغییر کنه سریعن رندر میشه دام و اضافه میکنه مودالو به بادی و وقتی این ایونت داره بابل میکنه یهو میبینه که عه من اینجا یه ایونت دارم که باید اجرا کنم و اون ایونت حالا بر خلاق قبلن مقدار شرط بالا براش صدق میکنه و شروع میکنه به اجرا کردن فانکشن ایونت پس باید ترو کنیم که ببره تو فاز کپچر.
    document.addEventListener("click", handleClick, listenCapturing);

    return () => {
      document.removeEventListener("click", handleClick, listenCapturing);
    };
  }, [handler, listenCapturing]);
  return { ref };
}
